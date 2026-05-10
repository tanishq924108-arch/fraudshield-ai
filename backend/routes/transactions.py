from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import random, time

router = APIRouter()

TRANSACTION_STORE = [
    {"id": "TXN9821", "user": "Rahul Sharma", "amount": 48000, "type": "UPI Transfer", "risk": "high", "location": "Mumbai → Delhi", "status": "Blocked"},
    {"id": "TXN9820", "user": "Priya Patel", "amount": 2500, "type": "ATM Withdrawal", "risk": "low", "location": "Surat", "status": "Approved"},
    {"id": "TXN9819", "user": "Amit Verma", "amount": 15800, "type": "Net Banking", "risk": "medium", "location": "Bangalore", "status": "Under Review"},
    {"id": "TXN9818", "user": "Sunita Devi", "amount": 120000, "type": "RTGS Transfer", "risk": "high", "location": "Unknown IP", "status": "Blocked"},
]

@router.get("/")
def get_transactions(risk: Optional[str] = None, limit: int = 50):
    data = TRANSACTION_STORE
    if risk:
        data = [t for t in data if t["risk"] == risk]
    return {"transactions": data[:limit], "total": len(data)}

@router.get("/stats")
def get_stats():
    return {
        "total_today": random.randint(12000, 13000),
        "fraud_count": random.randint(40, 55),
        "amount_saved": 8240000,
        "avg_detection_ms": round(random.uniform(900, 1500), 1)
    }
