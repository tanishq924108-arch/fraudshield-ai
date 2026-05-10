from fastapi import APIRouter

router = APIRouter()

ALERTS = [
    {"id": 1, "level": "high", "title": "Unusual Large Transfer Detected", "txId": "TXN9818", "time": "2 min ago"},
    {"id": 2, "level": "high", "title": "Multiple Failed Login Attempts", "txId": "ACC8821", "time": "8 min ago"},
    {"id": 3, "level": "medium", "title": "New Device Login + Transfer", "txId": "TXN9821", "time": "15 min ago"},
    {"id": 4, "level": "medium", "title": "Loan Application — Document Mismatch", "txId": "LOAN4421", "time": "25 min ago"},
]

@router.get("/")
def get_alerts():
    return {"alerts": ALERTS, "total": len(ALERTS)}

@router.post("/{alert_id}/dismiss")
def dismiss_alert(alert_id: int):
    return {"message": f"Alert {alert_id} dismissed", "success": True}

@router.post("/{alert_id}/block")
def block_transaction(alert_id: int):
    return {"message": f"Transaction related to alert {alert_id} blocked", "success": True}
