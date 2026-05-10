"""
FraudShield AI — Fraud Detection ML Model
Trains an XGBoost classifier on synthetic banking transaction data.
Run: python train.py
"""

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, roc_auc_score
import xgboost as xgb
import joblib
import os

# ── Generate Synthetic Data ──────────────────────────────────────────────────
np.random.seed(42)
N = 10000

def generate_data(n):
    data = {
        "amount":          np.random.exponential(scale=10000, size=n),
        "hour":            np.random.randint(0, 24, n),
        "is_new_device":   np.random.choice([0, 1], n, p=[0.85, 0.15]),
        "is_new_location": np.random.choice([0, 1], n, p=[0.88, 0.12]),
        "tx_per_hour":     np.random.poisson(lam=2, size=n),
        "account_age_days":np.random.randint(30, 3650, n),
        "prev_failed_attempts": np.random.choice([0, 1, 2, 3, 5, 7], n, p=[0.7, 0.12, 0.08, 0.05, 0.03, 0.02]),
        "tx_type":         np.random.choice(["UPI", "NEFT", "RTGS", "ATM", "NET_BANKING"], n),
        "distance_km":     np.random.exponential(scale=50, size=n),
    }

    df = pd.DataFrame(data)

    # Rule-based fraud labeling (realistic)
    fraud_score = (
        (df["amount"] > 50000).astype(int) * 2 +
        (df["is_new_device"] == 1).astype(int) * 2 +
        (df["is_new_location"] == 1).astype(int) * 2 +
        (df["hour"].isin([0, 1, 2, 3, 4])).astype(int) * 1 +
        (df["prev_failed_attempts"] >= 3).astype(int) * 3 +
        (df["tx_per_hour"] >= 5).astype(int) * 2 +
        (df["distance_km"] > 500).astype(int) * 2
    )

    df["is_fraud"] = (fraud_score >= 5).astype(int)

    # Add some noise
    noise_idx = np.random.choice(df.index, size=int(n * 0.02), replace=False)
    df.loc[noise_idx, "is_fraud"] = 1 - df.loc[noise_idx, "is_fraud"]

    return df

df = generate_data(N)
print(f"Dataset shape: {df.shape}")
print(f"Fraud rate: {df['is_fraud'].mean() * 100:.1f}%")

# ── Encode Categorical ───────────────────────────────────────────────────────
le = LabelEncoder()
df["tx_type_enc"] = le.fit_transform(df["tx_type"])
joblib.dump(le, "label_encoder.pkl")

FEATURES = [
    "amount", "hour", "is_new_device", "is_new_location",
    "tx_per_hour", "account_age_days", "prev_failed_attempts",
    "tx_type_enc", "distance_km"
]

X = df[FEATURES]
y = df["is_fraud"]

# ── Train/Test Split ─────────────────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# ── Train XGBoost ────────────────────────────────────────────────────────────
model = xgb.XGBClassifier(
    n_estimators=200,
    max_depth=5,
    learning_rate=0.1,
    scale_pos_weight=(y_train == 0).sum() / (y_train == 1).sum(),
    use_label_encoder=False,
    eval_metric="logloss",
    random_state=42
)

model.fit(X_train, y_train, eval_set=[(X_test, y_test)], verbose=False)

# ── Evaluate ─────────────────────────────────────────────────────────────────
y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]

print("\n── Classification Report ──")
print(classification_report(y_test, y_pred, target_names=["Legit", "Fraud"]))
print(f"ROC-AUC Score: {roc_auc_score(y_test, y_proba):.4f}")

# ── Save Model ───────────────────────────────────────────────────────────────
os.makedirs("saved", exist_ok=True)
joblib.dump(model, "saved/fraud_model.pkl")
joblib.dump(le, "saved/label_encoder.pkl")
joblib.dump(FEATURES, "saved/features.pkl")
print("\n✅ Model saved to saved/fraud_model.pkl")
