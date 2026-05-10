"""
FraudShield AI — Fraud Detector Inference
Loads trained model and returns risk score + prediction.
"""

import joblib
import numpy as np
import os
from pydantic import BaseModel

MODEL_PATH = os.path.join(os.path.dirname(__file__), "saved/fraud_model.pkl")
LE_PATH = os.path.join(os.path.dirname(__file__), "saved/label_encoder.pkl")
FEATURES_PATH = os.path.join(os.path.dirname(__file__), "saved/features.pkl")

_model = None
_le = None
_features = None

def load_model():
    global _model, _le, _features
    if _model is None:
        _model = joblib.load(MODEL_PATH)
        _le = joblib.load(LE_PATH)
        _features = joblib.load(FEATURES_PATH)

class TransactionInput(BaseModel):
    amount: float
    hour: int                      # 0–23
    is_new_device: int             # 0 or 1
    is_new_location: int           # 0 or 1
    tx_per_hour: int               # transactions in last hour
    account_age_days: int
    prev_failed_attempts: int
    tx_type: str                   # UPI | NEFT | RTGS | ATM | NET_BANKING
    distance_km: float             # distance from last transaction location

class PredictionResult(BaseModel):
    is_fraud: bool
    risk_score: float              # 0–100
    risk_level: str                # LOW | MEDIUM | HIGH
    confidence: float              # 0–1
    flags: list[str]

def predict(tx: TransactionInput) -> PredictionResult:
    load_model()

    tx_type_enc = _le.transform([tx.tx_type])[0]

    row = np.array([[
        tx.amount,
        tx.hour,
        tx.is_new_device,
        tx.is_new_location,
        tx.tx_per_hour,
        tx.account_age_days,
        tx.prev_failed_attempts,
        tx_type_enc,
        tx.distance_km,
    ]])

    proba = _model.predict_proba(row)[0][1]
    risk_score = round(proba * 100, 1)

    if risk_score >= 70:
        risk_level = "HIGH"
    elif risk_score >= 40:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    # Generate human-readable flags
    flags = []
    if tx.is_new_device:
        flags.append("New device detected")
    if tx.is_new_location:
        flags.append("Unusual location")
    if tx.amount > 50000:
        flags.append("High amount transaction")
    if tx.hour in range(0, 5):
        flags.append("Off-hours activity (12 AM – 5 AM)")
    if tx.prev_failed_attempts >= 3:
        flags.append("Multiple failed login attempts")
    if tx.tx_per_hour >= 5:
        flags.append("High transaction frequency")
    if tx.distance_km > 500:
        flags.append("Impossible travel detected")

    return PredictionResult(
        is_fraud=proba >= 0.5,
        risk_score=risk_score,
        risk_level=risk_level,
        confidence=round(float(proba), 4),
        flags=flags
    )
