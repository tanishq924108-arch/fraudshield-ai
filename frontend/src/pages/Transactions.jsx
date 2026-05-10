import React, { useState } from "react";

const allTransactions = [
  { id: "TXN9821", user: "Rahul Sharma", amount: 48000, type: "UPI Transfer", risk: "high", location: "Mumbai → Delhi", time: "2m ago", device: "New Device", status: "Blocked" },
  { id: "TXN9820", user: "Priya Patel", amount: 2500, type: "ATM Withdrawal", risk: "low", location: "Surat", time: "5m ago", device: "Known", status: "Approved" },
  { id: "TXN9819", user: "Amit Verma", amount: 15800, type: "Net Banking", risk: "medium", location: "Bangalore", time: "8m ago", device: "Known", status: "Under Review" },
  { id: "TXN9818", user: "Sunita Devi", amount: 120000, type: "RTGS Transfer", risk: "high", location: "Unknown IP", time: "11m ago", device: "New Device", status: "Blocked" },
  { id: "TXN9817", user: "Kiran Joshi", amount: 3200, type: "UPI Transfer", risk: "low", location: "Pune", time: "14m ago", device: "Known", status: "Approved" },
  { id: "TXN9816", user: "Deepak Singh", amount: 67500, type: "Loan Disbursement", risk: "medium", location: "Jaipur", time: "18m ago", device: "Known", status: "Under Review" },
  { id: "TXN9815", user: "Meena Kumari", amount: 8900, type: "UPI Transfer", risk: "low", location: "Chennai", time: "22m ago", device: "Known", status: "Approved" },
  { id: "TXN9814", user: "Vijay Rao", amount: 95000, type: "Net Banking", risk: "high", location: "Multiple Locations", time: "30m ago", device: "New Device", status: "Blocked" },
];

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");

  const filtered = allTransactions.filter((tx) => {
    const matchSearch = tx.user.toLowerCase().includes(search.toLowerCase()) || tx.id.toLowerCase().includes(search.toLowerCase());
    const matchRisk = riskFilter === "all" || tx.risk === riskFilter;
    return matchSearch && matchRisk;
  });

  return (
    <div>
      <div className="page-header fade-in">
        <div>
          <div className="page-title">Transaction Monitor</div>
          <div className="page-subtitle">All transactions with AI risk scoring</div>
        </div>
        <button className="btn btn-primary">⬇ Export CSV</button>
      </div>

      <div className="filter-bar fade-in">
        <input
          className="search-input"
          placeholder="🔍 Search by name or TX ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="select-input" value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
          <option value="all">All Risk Levels</option>
          <option value="high">🔴 High Risk</option>
          <option value="medium">🟠 Medium Risk</option>
          <option value="low">🟢 Low Risk</option>
        </select>
      </div>

      <div className="table-card fade-in">
        <div className="table-header">
          <div className="chart-title">Transactions ({filtered.length})</div>
          <div className="live-badge"><span className="live-dot" />LIVE</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>TX ID</th>
              <th>Customer</th>
              <th>Amount (₹)</th>
              <th>Type</th>
              <th>Location</th>
              <th>Device</th>
              <th>Risk</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx) => (
              <tr key={tx.id}>
                <td><span className="tx-id">{tx.id}</span></td>
                <td>{tx.user}</td>
                <td><span className="amount">₹{tx.amount.toLocaleString()}</span></td>
                <td style={{ fontSize: 12 }}>{tx.type}</td>
                <td style={{ fontSize: 12 }}>{tx.location}</td>
                <td style={{ fontSize: 12, color: tx.device === "New Device" ? "#ff8c42" : "#00e676" }}>{tx.device}</td>
                <td><span className={`risk-badge risk-${tx.risk}`}>{tx.risk.toUpperCase()}</span></td>
                <td>
                  <span style={{
                    fontSize: 11, fontWeight: 600, fontFamily: "DM Mono",
                    color: tx.status === "Blocked" ? "#ff3d57" : tx.status === "Approved" ? "#00e676" : "#ffd740"
                  }}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
