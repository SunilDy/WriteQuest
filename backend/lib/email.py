"""Brevo delivery email — the user's own Brevo account (manual credentials).

Until BREVO_API_KEY + BREVO_SENDER_EMAIL are set in .env, delivery stays in
'mocked' mode: the checkout flow never breaks and the delivery log says so.
"""

import logging
import os
from html import escape
from pathlib import Path

import httpx
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")

logger = logging.getLogger(__name__)

BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"


def email_configured() -> bool:
    return bool(
        os.environ.get("BREVO_API_KEY", "").strip()
        and os.environ.get("BREVO_SENDER_EMAIL", "").strip()
    )


def build_delivery_html(order: dict, assets: list) -> str:
    app_url = os.environ.get("APP_URL", "").rstrip("/")
    rows = "".join(
        f"""
        <tr>
          <td style="padding:14px 18px;border-bottom:1px solid #E5DFD3;">
            <div style="font-family:Georgia,serif;font-size:16px;font-weight:bold;color:#1F2022;">{escape(a['name'])}</div>
            <div style="font-family:Arial,sans-serif;font-size:12px;color:#52504C;margin-top:2px;">{escape(a['note'])}</div>
          </td>
          <td style="padding:14px 18px;border-bottom:1px solid #E5DFD3;text-align:right;">
            <a href="{escape(app_url)}/#preview" style="display:inline-block;background:#F2E29F;color:#1F2022;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;text-decoration:none;padding:9px 16px;border-radius:999px;">{escape(a['format'])} &rarr;</a>
          </td>
        </tr>"""
        for a in assets
    )
    amount = f"₹{int(order['amount_paise']) // 100:,}"
    return f"""<!doctype html>
<html>
<body style="margin:0;padding:0;background:#F9F7F1;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F9F7F1;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #E5DFD3;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#1F2022;padding:20px 28px;">
          <span style="font-family:Georgia,serif;font-size:20px;font-weight:bold;color:#F9F7F1;">WriteQuest</span>
        </td></tr>
        <tr><td style="padding:28px;">
          <p style="font-family:Georgia,serif;font-size:24px;font-weight:bold;color:#1F2022;margin:0;">The kit is yours.</p>
          <p style="font-family:Arial,sans-serif;font-size:14px;color:#52504C;line-height:1.6;margin:12px 0 0;">
            Thanks for your purchase — your Complete Blueprint Kit is ready. Your order
            <strong style="color:#1F2022;">{escape(order['order_id'])}</strong> ({amount}, one-time) is confirmed.
          </p>
        </td></tr>
        <tr><td style="padding:0 28px 8px;">
          <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8C6D4F;margin:0 0 6px;">Your assets</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5DFD3;border-radius:8px;">{rows}
          </table>
          <p style="font-family:Arial,sans-serif;font-size:12px;color:#8C6D4F;margin:12px 0 0;">
            Note: download links activate as soon as the final kit files are connected to this page.
          </p>
        </td></tr>
        <tr><td style="padding:20px 28px 28px;">
          <p style="font-family:Georgia,serif;font-style:italic;font-size:15px;color:#C83B2D;margin:0;">— now go write the scene.</p>
          <p style="font-family:Arial,sans-serif;font-size:11px;color:#52504C;margin:16px 0 0;">
            Sent by WriteQuest · This is a transactional delivery email for your purchase.
            We never ask for passwords or payment details by email.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>"""


async def send_delivery_email(order: dict, assets: list) -> str:
    """Send the post-purchase delivery email via Brevo. Returns the Brevo messageId.
    Raises on failure — callers catch and record 'failed' in the delivery log."""
    payload = {
        "sender": {
            "name": os.environ.get("BREVO_SENDER_NAME", "WriteQuest").strip(),
            "email": os.environ["BREVO_SENDER_EMAIL"].strip(),
        },
        "to": [{"email": order["email"]}],
        "subject": "Your Writer's Quest Blueprint Kit is here",
        "htmlContent": build_delivery_html(order, assets),
        "textContent": (
            f"Your Writer's Quest Blueprint Kit is ready. Order {order['order_id']} confirmed. "
            "Assets: " + ", ".join(a["name"] for a in assets)
        ),
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": os.environ["BREVO_API_KEY"].strip(),
    }
    async with httpx.AsyncClient(timeout=20.0) as client:
        resp = await client.post(BREVO_API_URL, json=payload, headers=headers)
    if resp.is_error:
        raise RuntimeError(f"Brevo HTTP {resp.status_code}: {resp.text[:300]}")
    return resp.json()["messageId"]
