import hashlib
import hmac
import os
import logging
import uuid
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from lib.sheets import append_event, sheets_configured
from lib.email import send_delivery_email, email_configured

logger = logging.getLogger(__name__)

PRICE_INR = int(os.environ.get("PRICE_INR", "599"))
AMOUNT_PAISE = PRICE_INR * 100
CURRENCY = "INR"

RAZORPAY_KEY_ID = os.environ.get("RAZORPAY_KEY_ID", "").strip()
RAZORPAY_KEY_SECRET = os.environ.get("RAZORPAY_KEY_SECRET", "").strip()
RAZORPAY_WEBHOOK_SECRET = os.environ.get("RAZORPAY_WEBHOOK_SECRET", "").strip()

MOCK_MODE = not (RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET)

razorpay_client = None
if not MOCK_MODE:
    import razorpay
    razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

ASSETS = [
    {"name": "Notion Writing Dashboard", "format": "NOTION", "url": "#notion-template", "note": "The full hub-and-spoke system, all 4 frameworks"},
    {"name": "Printable Workbooks", "format": "PDF", "url": "#workbook-pdf", "note": "Pen-friendly, beat by beat"},
    {"name": "Excel-Sheet Version", "format": "XLSX", "url": "#excel-version", "note": "Plan your draft without Notion"},
    {"name": "Explainer Videos", "format": "VIDEO", "url": "#walkthroughs", "note": "Walkthroughs for every template"},
]

# No database: orders live in memory for the running process (enough for signature
# verification + idempotent success screens); the Google Sheet is the durable record.
ORDERS: dict = {}

app = FastAPI()
api_router = APIRouter(prefix="/api")


def utcnow() -> str:
    return datetime.now(timezone.utc).isoformat()


class CreateOrderRequest(BaseModel):
    email: EmailStr


class VerifyRequest(BaseModel):
    order_id: str
    payment_id: str
    signature: str
    email: EmailStr


class LeadRequest(BaseModel):
    email: EmailStr
    source: str = "landing"


async def deliver_order(order: dict) -> None:
    """Send the delivery email via Brevo. Never raises — outcome is recorded on the
    order and in the sheet so a paid buyer is never silently unfulfilled."""
    if order.get("email_status") == "sent":
        return
    if not email_configured():
        order["email_status"] = "mocked"
        order["delivery_log"].append({
            "channel": "email",
            "status": "mocked",
            "timestamp": utcnow(),
            "detail": f"Delivery email to {order['email']} is logged only — email provider not configured.",
        })
        return
    try:
        message_id = await send_delivery_email(order, ASSETS)
        order["email_status"] = "sent"
        order["delivery_log"].append({
            "channel": "email",
            "status": "sent",
            "timestamp": utcnow(),
            "detail": f"Delivery email sent to {order['email']} via Brevo (message {message_id}).",
        })
        await append_event("orders", [utcnow(), "email_sent", order["order_id"], order.get("payment_id", ""), order["email"], order["amount_paise"]])
    except Exception as exc:
        logger.exception("Delivery email failed for %s", order["order_id"])
        order["email_status"] = "failed"
        order["delivery_log"].append({
            "channel": "email",
            "status": "failed",
            "timestamp": utcnow(),
            "detail": f"Delivery email to {order['email']} failed: {exc}",
        })
        await append_event("orders", [utcnow(), "email_failed", order["order_id"], order.get("payment_id", ""), order["email"], order["amount_paise"]])


@api_router.get("/")
async def root():
    return {
        "message": "WriteQuest API",
        "payments": "mock" if MOCK_MODE else "razorpay",
        "order_log": "google-sheets" if sheets_configured() else "server-logs-only",
        "email": "brevo" if email_configured() else "mocked",
    }


@api_router.get("/checkout/config")
async def checkout_config():
    return {
        "key_id": None if MOCK_MODE else RAZORPAY_KEY_ID,
        "amount_paise": AMOUNT_PAISE,
        "currency": CURRENCY,
        "mock": MOCK_MODE,
        "product": "Writer's Quest — Complete Blueprint Kit",
    }


@api_router.post("/checkout/create-order")
async def create_order(payload: CreateOrderRequest):
    receipt = f"wq_{uuid.uuid4().hex[:12]}"
    if MOCK_MODE:
        order_id = f"order_mock_{uuid.uuid4().hex[:14]}"
    else:
        rp_order = razorpay_client.order.create({
            "amount": AMOUNT_PAISE,
            "currency": CURRENCY,
            "receipt": receipt,
            "payment_capture": 1,
        })
        order_id = rp_order["id"]
    ORDERS[order_id] = {
        "order_id": order_id,
        "receipt": receipt,
        "email": payload.email,
        "amount_paise": AMOUNT_PAISE,
        "currency": CURRENCY,
        "status": "created",
        "mock": MOCK_MODE,
        "email_status": "not_sent",
        "delivery_log": [],
        "created_at": utcnow(),
        "updated_at": utcnow(),
    }
    await append_event("orders", [utcnow(), "created", order_id, "", payload.email, AMOUNT_PAISE])
    return {
        "order_id": order_id,
        "amount_paise": AMOUNT_PAISE,
        "currency": CURRENCY,
        "mock": MOCK_MODE,
        "key_id": None if MOCK_MODE else RAZORPAY_KEY_ID,
    }


@api_router.post("/checkout/verify")
async def verify_payment(payload: VerifyRequest):
    order = ORDERS.get(payload.order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order["status"] == "paid":
        return {**order, "assets": ASSETS}
    if MOCK_MODE:
        verified = True
    else:
        body = f"{payload.order_id}|{payload.payment_id}"
        expected = hmac.new(RAZORPAY_KEY_SECRET.encode(), body.encode(), hashlib.sha256).hexdigest()
        verified = hmac.compare_digest(expected, payload.signature)
    if not verified:
        order["status"] = "signature_failed"
        order["updated_at"] = utcnow()
        await append_event("orders", [utcnow(), "failed", payload.order_id, payload.payment_id, payload.email, AMOUNT_PAISE])
        raise HTTPException(status_code=400, detail="Payment signature verification failed")
    order["status"] = "paid"
    order["payment_id"] = payload.payment_id
    order["updated_at"] = utcnow()
    await append_event("orders", [utcnow(), "paid", payload.order_id, payload.payment_id, payload.email, AMOUNT_PAISE])
    await deliver_order(order)
    return {**order, "assets": ASSETS}


@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    order = ORDERS.get(order_id)
    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found on this server — the Google Sheet order log is the durable record",
        )
    result = dict(order)
    if result.get("status") == "paid":
        result["assets"] = ASSETS
    return result


@api_router.post("/webhooks/razorpay")
async def razorpay_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("X-Razorpay-Signature", "")
    if RAZORPAY_WEBHOOK_SECRET:
        expected = hmac.new(RAZORPAY_WEBHOOK_SECRET.encode(), body, hashlib.sha256).hexdigest()
        if not hmac.compare_digest(expected, signature):
            await append_event("webhook_logs", [utcnow(), "unverified", "", "bad_signature — retryable"])
            raise HTTPException(status_code=400, detail="Invalid webhook signature")
    payload = await request.json()
    event = payload.get("event", "unknown")
    payment_entity = payload.get("payload", {}).get("payment", {}).get("entity", {})
    order_id = payment_entity.get("order_id", "")
    await append_event("webhook_logs", [utcnow(), event, order_id, "processed"])
    if event == "payment.captured" and order_id:
        order = ORDERS.get(order_id)
        if order and order["status"] != "paid":
            order["status"] = "paid"
            order["payment_id"] = payment_entity.get("id", "")
            order["updated_at"] = utcnow()
            await append_event("orders", [utcnow(), "paid (webhook)", order_id, order["payment_id"], order["email"], order["amount_paise"]])
            await deliver_order(order)
    return {"status": "processed"}


@api_router.post("/leads")
async def capture_lead(payload: LeadRequest):
    await append_event("leads", [utcnow(), payload.email, payload.source])
    return {"status": "captured"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
