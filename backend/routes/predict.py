from fastapi import APIRouter
from model.fraud_detector import TransactionInput, PredictionResult, predict

router = APIRouter()

@router.post("/", response_model=PredictionResult)
def predict_fraud(tx: TransactionInput):
    """
    Submit a transaction and get an AI fraud risk score.
    
    Example payload:
    {
        "amount": 75000,
        "hour": 2,
        "is_new_device": 1,
        "is_new_location": 1,
        "tx_per_hour": 6,
        "account_age_days": 90,
        "prev_failed_attempts": 4,
        "tx_type": "UPI",
        "distance_km": 620
    }
    """
    return predict(tx)
