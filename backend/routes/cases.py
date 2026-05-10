from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

CASES = [
    {"id": "CASE-2024-001", "title": "Mass UPI Fraud Ring — Surat Region", "status": "investigating", "amount": 840000, "victims": 12},
    {"id": "CASE-2024-002", "title": "ATM Skimming — Ahmedabad Branch", "status": "open", "amount": 215000, "victims": 5},
    {"id": "CASE-2024-003", "title": "Fake Loan Application — Income Proof Forgery", "status": "investigating", "amount": 1200000, "victims": 1},
    {"id": "CASE-2024-004", "title": "Phishing Attack on Net Banking Users", "status": "closed", "amount": 67500, "victims": 3},
]

class StatusUpdate(BaseModel):
    status: str
    note: Optional[str] = None

@router.get("/")
def get_cases():
    return {"cases": CASES, "total": len(CASES)}

@router.patch("/{case_id}/status")
def update_case_status(case_id: str, update: StatusUpdate):
    return {"message": f"Case {case_id} updated to {update.status}", "success": True}
