import React, { useState, useEffect } from "react";
import {
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import RiskMeter from "../components/RiskMeter";
import RecentTransactions from "../components/RecentTransactions";

const fraudTrend = [
  { time: "00:00", fraud: 3, legit: 120 },
  { time: "04:00", fraud: 7, legit: 85 },
  { time: "08:00", fraud: 15, legit: 320 },
  { time: "10:00", fraud: 22, legit: 480 },
  { time: "12:00", fraud: 18, legit: 550 },
  { time: "14:00", fraud: 28, legit: 490 },
  { time: "16:00", fraud: 11, legit: 430 },
  { time: "18:00", fraud: 34, legit: 380 },
  { time: "20:00", fraud: 19, legit: 260 },
  { time: "22:00", fraud: 9, legit: 140 },
];

const fraudTypes = [
  { name: "UPI Fraud", value: 38 },
  { name: "Net Banking", value: 27 },
  { name: "ATM Skimming", value: 18 },
  { name: "Loan Fraud", value: 17 },
];

const COLORS = ["#ff3d57", "#1a8cff", "#ffd740", "#00e676"];

export default function Dashboard() {
  const [riskScore, setRiskScore] = useState(62);
  const [totalTx, setTotalTx] = useState(12847);
  const [fraudCount, setFraudCount] = useState(47);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTx((p) => p + Math.floor(Math.random() * 5));
      setFraudCount((p) => (Math.random() > 0.7 ? p + 1 : p));
      setRiskScore(Math.floor(50 + Math.random() * 30));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="page-header fade-in">
        <div>
          <div className="page-title">Fraud Intelligence Dashboard</div>
          <div className="page-subtitle">Real-time monitoring · Bank of Baroda</div>
        </div>
        <div className="live-badge">
          <span className="live-dot" />
          LIVE MONITORING
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card blue fade-in fade-in-1">
          <span className="stat-icon">💳</span>
          <div className="stat-label">Total Transactions</div>
          <div className="stat-value blue">{totalTx.toLocaleString()}</div>
          <div className="stat-change">↑ 12.4% from yesterday</div>
        </div>
        <div className="stat-card red fade-in fade-in-2">
          <span className="stat-icon">🚨</span>
          <div className="stat-label">Fraud Detected</div>
          <div className="stat-value red">{fraudCount}</div>
          <div className="stat-change">↑ 3 in last hour</div>
        </div>
        <div className="stat-card green fade-in fade-in-3">
          <span className="stat-icon">✅</span>
          <div className="stat-label">Amount Saved (₹)</div>
          <div className="stat-value green">82.4L</div>
          <div className="stat-change">↑ ₹4.2L today</div>
        </div>
        <div className="stat-card orange fade-in fade-in-4">
          <span className="stat-icon">⚡</span>
          <div className="stat-label">Avg. Detection Time</div>
          <div className="stat-value orange">1.2s</div>
          <div className="stat-change">↓ 0.3s improvement</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-card fade-in">
          <div className="chart-title">Transaction vs Fraud Trend</div>
          <div className="chart-sub">24-hour overview · Today</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={fraudTrend}>
              <defs>
                <linearGradient id="colorLegit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a8cff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1a8cff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff3d57" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ff3d57" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="time" stroke="#4a5f78" tick={{ fontSize: 11 }} />
              <YAxis stroke="#4a5f78" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#111827", border: "1px solid #1e2d45", borderRadius: 8 }}
                labelStyle={{ color: "#7a8fa8" }}
              />
              <Area type="monotone" dataKey="legit" stroke="#1a8cff" fill="url(#colorLegit)" name="Legit" strokeWidth={2} />
              <Area type="monotone" dataKey="fraud" stroke="#ff3d57" fill="url(#colorFraud)" name="Fraud" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card fade-in">
          <div className="chart-title">Fraud by Type</div>
          <div className="chart-sub">Distribution · This week</div>
          <RiskMeter score={riskScore} />
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={fraudTypes} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={4} dataKey="value">
                {fraudTypes.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#111827", border: "1px solid #1e2d45", borderRadius: 8 }}
                formatter={(val, name) => [`${val}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: 8 }}>
            {fraudTypes.map((ft, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#7a8fa8" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[i], display: "inline-block" }} />
                {ft.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  );
}
