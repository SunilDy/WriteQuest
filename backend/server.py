import hashlib
import hmac
import os
import logging
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from lib.db import client, db

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
    {"name": "Notion Master Dashboard", "format": "NOTION", "url": "#notion-template", "note": "Duplicate-link delivered with purchase"},
    {"name": "Printable Plotting Workbook", "format": "PDF", "url": "#workbook-pdf", "note": "120-page A4 / US-Letter printable"},
    {"name": "Excel Beat Tracker", "format": "XLSX", "url": "#beat-tracker", "note": "Auto-calculating 4-structure beat sheet"},
    {"name": "Video Walkthrough Series", "format": "VIDEO", "url": "#walkthroughs", "note": "6 guided setup sessions"},
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    client.close()


app = FastAPI(lifespan=lifespan)
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


def serialize_order(doc: dict) -> dict:
    doc.pop("_id", None)
    return doc


@api_router.get("/")
async def root():
    return {"message": "WriteQuest API", "payments": "mock" if MOCK_MODE else "razorpay"}


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
    doc = {
        "order_id": order_id,
        "receipt": receipt,
        "email": payload.email,
        "amount_paise": AMOUNT_PAISE,
        "currency": CURRENCY,
        "status": "created",
        "mock": MOCK_MODE,
        "delivery_log": [],
        "created_at": utcnow(),
        "updated_at": utcnow(),
    }
    await db.orders.insert_one(doc)
    return {
        "order_id": order_id,
        "amount_paise": AMOUNT_PAISE,
        "currency": CURRENCY,
        "mock": MOCK_MODE,
        "key_id": None if MOCK_MODE else RAZORPAY_KEY_ID,
    }


@api_router.post("/checkout/verify")
async def verify_payment(payload: VerifyRequest):
    order = await db.orders.find_one({"order_id": payload.order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if MOCK_MODE:
        verified = True
    else:
        body = f"{payload.order_id}|{payload.payment_id}"
        expected = hmac.new(RAZORPAY_KEY_SECRET.encode(), body.encode(), hashlib.sha256).hexdigest()
        verified = hmac.compare_digest(expected, payload.signature)
    if not verified:
        await db.orders.update_one(
            {"order_id": payload.order_id},
            {"$set": {"status": "signature_failed", "updated_at": utcnow()}},
        )
        raise HTTPException(status_code=400, detail="Payment signature verification failed")
    delivery_entry = {
        "channel": "email",
        "status": "mocked",
        "timestamp": utcnow(),
        "detail": f"Delivery email to {payload.email} is logged only — no email provider connected yet.",
    }
    await db.orders.update_one(
        {"order_id": payload.order_id},
        {
            "$set": {"status": "paid", "payment_id": payload.payment_id, "updated_at": utcnow()},
            "$push": {"delivery_log": delivery_entry},
        },
    )
    updated = await db.orders.find_one({"order_id": payload.order_id})
    return {**serialize_order(updated), "assets": ASSETS}


@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    order = await db.orders.find_one({"order_id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    result = serialize_order(order)
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
            await db.webhook_logs.insert_one({
                "event": "unverified",
                "reason": "bad_signature",
                "timestamp": utcnow(),
                "retryable": True,
            })
            raise HTTPException(status_code=400, detail="Invalid webhook signature")
    payload = await request.json()
    event = payload.get("event", "unknown")
    payment_entity = payload.get("payload", {}).get("payment", {}).get("entity", {})
    order_id = payment_entity.get("order_id")
    await db.webhook_logs.insert_one({
        "event": event,
        "order_id": order_id,
        "timestamp": utcnow(),
        "retryable": False,
    })
    if event == "payment.captured" and order_id:
        await db.orders.update_one(
            {"order_id": order_id},
            {"$set": {"status": "paid", "payment_id": payment_entity.get("id"), "updated_at": utcnow()}},
        )
    return {"status": "processed"}


@api_router.post("/leads")
async def capture_lead(payload: LeadRequest):
    await db.leads.update_one(
        {"email": payload.email},
        {
            "$set": {"email": payload.email, "source": payload.source, "updated_at": utcnow()},
            "$setOnInsert": {"created_at": utcnow()},
        },
        upsert=True,
    )
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
