from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import transactions, predict, alerts, cases

app = FastAPI(
    title="FraudShield AI API",
    description="AI-Powered Fraud Detection System for Bank of Baroda",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transactions.router, prefix="/api/transactions", tags=["Transactions"])
app.include_router(predict.router, prefix="/api/predict", tags=["Fraud Prediction"])
app.include_router(alerts.router, prefix="/api/alerts", tags=["Alerts"])
app.include_router(cases.router, prefix="/api/cases", tags=["Cases"])

@app.get("/")
def root():
    return {"message": "FraudShield AI is running 🛡️", "version": "1.0.0"}
