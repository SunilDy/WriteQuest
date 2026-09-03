"""Google Sheets event log — appends rows via a service account.

No database anywhere: until GOOGLE_SERVICE_ACCOUNT_JSON and
GOOGLE_SHEETS_SPREADSHEET_ID are set in .env, events fall back to server logs
so the checkout flow never breaks.
"""

import asyncio
import json
import logging
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")

logger = logging.getLogger(__name__)

SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

_service = None
_configured = False


def _build_service():
    global _service, _configured
    raw = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON", "").strip()
    spreadsheet_id = os.environ.get("GOOGLE_SHEETS_SPREADSHEET_ID", "").strip()
    if not raw or not spreadsheet_id:
        logger.warning("Google Sheets not configured — events will be written to server logs only")
        return
    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build

        info = json.loads(raw)
        creds = service_account.Credentials.from_service_account_info(info, scopes=SCOPES)
        _service = build("sheets", "v4", credentials=creds, cache_discovery=False)
        _configured = True
        logger.info("Google Sheets order log connected (spreadsheet %s)", spreadsheet_id[:8] + "…")
    except Exception:
        logger.exception("Failed to initialise Google Sheets client — falling back to server logs")


_build_service()


def sheets_configured() -> bool:
    return _configured


async def append_event(tab: str, row: list) -> None:
    """Append one event row to a tab. Never raises — logging must not break checkout."""
    if not _configured:
        logger.info("[sheet:%s] %s", tab, row)
        return

    body = {"values": [[str(c) for c in row]]}
    spreadsheet_id = os.environ["GOOGLE_SHEETS_SPREADSHEET_ID"].strip()

    def _append():
        _service.spreadsheets().values().append(
            spreadsheetId=spreadsheet_id,
            range=f"{tab}!A1",
            valueInputOption="RAW",
            insertDataOption="INSERT_ROWS",
            body=body,
        ).execute()

    try:
        await asyncio.to_thread(_append)
    except Exception:
        logger.exception("Failed to append row to sheet tab '%s' — event: %s", tab, row)
