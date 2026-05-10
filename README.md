# 🛡️ FraudShield AI
### AI-Powered Fraud Intelligence System for Bank of Baroda
> Built for **IBM × BOB Hackathon 2024**

---

## 📌 Problem Statement
Banking fraud causes massive financial losses every year. Traditional rule-based systems fail to catch sophisticated fraud patterns in real-time. FraudShield AI uses **Machine Learning + Real-Time Monitoring** to detect and prevent fraud before it happens.

---

## 🚀 Key Features

| Feature | Description |
|---|---|
| 📊 **Live Dashboard** | Real-time transaction monitoring with charts |
| 🤖 **AI Fraud Engine** | XGBoost model with 9 behavioral features |
| 🚨 **Smart Alerts** | Auto-generated alerts with severity levels |
| 📁 **Case Management** | Track fraud investigations end-to-end |
| 🔍 **Transaction Monitor** | Filter and search all transactions |
| ⚡ **Risk Scoring** | 0–100 risk score per transaction in <2 seconds |

---

## 🧠 AI Model — How it Works

The fraud detection model analyzes **9 behavioral signals**:
1. **Transaction Amount** — unusually high amounts flagged
2. **Hour of Day** — off-hours transactions (midnight–5AM) suspicious
3. **New Device** — login from unrecognized device
4. **New Location** — transaction from unusual location
5. **Transaction Frequency** — too many transactions per hour
6. **Account Age** — newer accounts are higher risk
7. **Failed Login Attempts** — brute force indicators
8. **Transaction Type** — UPI, NEFT, RTGS, ATM, Net Banking
9. **Distance from Last TX** — impossible travel detection

**Model:** XGBoost Classifier | **Accuracy:** ~94% | **ROC-AUC:** ~0.97

---

## 🗂️ Project Structure

```
fraudshield/
├── frontend/               # React.js Dashboard
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── RiskMeter.jsx
│   │   │   └── RecentTransactions.jsx
│   │   └── pages/
│   │       ├── Dashboard.jsx
│   │       ├── Transactions.jsx
│   │       ├── Alerts.jsx
│   │       └── CaseManagement.jsx
│   └── package.json
│
├── backend/                # Python FastAPI
│   ├── main.py
│   ├── requirements.txt
│   ├── model/
│   │   ├── train.py        ← Run this first!
│   │   └── fraud_detector.py
│   └── routes/
│       ├── transactions.py
│       ├── predict.py
│       ├── alerts.py
│       └── cases.py
│
└── README.md
```

---

## ⚙️ Setup & Run

### Backend
```bash
cd backend
pip install -r requirements.txt

# Train the ML model first
python model/train.py

# Start the API server
uvicorn main:app --reload --port 8000
```

API Docs available at: `http://localhost:8000/docs`

### Frontend
```bash
cd frontend
npm install
npm start
```

App runs at: `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/transactions/` | List all transactions |
| GET | `/api/transactions/stats` | Dashboard stats |
| POST | `/api/predict/` | AI fraud prediction |
| GET | `/api/alerts/` | Get all alerts |
| POST | `/api/alerts/{id}/block` | Block a transaction |
| GET | `/api/cases/` | Get all cases |
| PATCH | `/api/cases/{id}/status` | Update case status |

### Example — Predict Fraud
```bash
curl -X POST http://localhost:8000/api/predict/ \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 75000,
    "hour": 2,
    "is_new_device": 1,
    "is_new_location": 1,
    "tx_per_hour": 6,
    "account_age_days": 90,
    "prev_failed_attempts": 4,
    "tx_type": "UPI",
    "distance_km": 620
  }'
```

Response:
```json
{
  "is_fraud": true,
  "risk_score": 87.4,
  "risk_level": "HIGH",
  "confidence": 0.874,
  "flags": [
    "New device detected",
    "Unusual location",
    "High amount transaction",
    "Off-hours activity (12 AM – 5 AM)",
    "Multiple failed login attempts",
    "High transaction frequency",
    "Impossible travel detected"
  ]
}
```

---

## 👥 Team
Built with ❤️ for IBM × Bank of Baroda Hackathon 2024

---

## 🏆 Tech Stack
- **Frontend:** React.js, Recharts, React Router
- **Backend:** Python, FastAPI, Uvicorn
- **ML Model:** XGBoost, Scikit-learn, NumPy, Pandas
- **Deployment:** Vercel (Frontend) + Render (Backend)
