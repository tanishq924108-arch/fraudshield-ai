import React, { useState } from "react";

const alertsData = [
  { id: 1, level: "high", icon: "🚨", title: "Unusual Large Transfer Detected", desc: "₹1,20,000 transferred from Sunita Devi's account to an unknown account from an unrecognized IP. Location: International.", time: "2 min ago", txId: "TXN9818" },
  { id: 2, level: "high", icon: "🔴", title: "Multiple Failed Login Attempts", desc: "7 failed login attempts in 3 minutes for account #BOB8821XX. Possible credential stuffing attack.", time: "8 min ago", txId: "ACC8821" },
  { id: 3, level: "medium", icon: "⚠️", title: "New Device Login + Transfer", desc: "Rahul Sharma logged in from new device (iPhone 15 Pro) and immediately initiated ₹48,000 transfer.", time: "15 min ago", txId: "TXN9821" },
  { id: 4, level: "medium", icon: "🟠", title: "Loan Application — Document Mismatch", desc: "Deepak Singh's ITR and salary slip show inconsistent income figures. Possible document forgery.", time: "25 min ago", txId: "LOAN4421" },
  { id: 5, level: "low", icon: "ℹ️", title: "Off-hours Transaction", desc: "Transaction initiated at 3:42 AM by Meena Kumari. Amount within normal range but timing flagged.", time: "1 hr ago", txId: "TXN9810" },
  { id: 6, level: "low", icon: "📍", title: "Location Anomaly Detected", desc: "Kiran Joshi's last transaction was in Pune; new transaction from Bangalore (45 min apart — impossible travel).", time: "2 hrs ago", txId: "TXN9805" },
];

export default function Alerts() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? alertsData : alertsData.filter((a) => a.level === filter);

  return (
    <div>
      <div className="page-header fade-in">
        <div>
          <div className="page-title">Fraud Alerts</div>
          <div className="page-subtitle">AI-generated alerts · Sorted by severity</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["all", "high", "medium", "low"].map((f) => (
            <button
              key={f}
              className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="alerts-list fade-in">
        {filtered.map((alert) => (
          <div key={alert.id} className={`alert-item ${alert.level}`}>
            <div className="alert-icon">{alert.icon}</div>
            <div style={{ flex: 1 }}>
              <div className="alert-title">{alert.title}</div>
              <div className="alert-desc">{alert.desc}</div>
              <div style={{ display: "flex", gap: 16, marginTop: 8, alignItems: "center" }}>
                <div className="alert-time">🕐 {alert.time}</div>
                <div style={{ fontSize: 11, fontFamily: "DM Mono", color: "#1a8cff" }}>
                  Ref: {alert.txId}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginLeft: 16 }}>
              <button className="btn btn-sm btn-danger">Block</button>
              <button className="btn btn-sm btn-ghost">Dismiss</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
