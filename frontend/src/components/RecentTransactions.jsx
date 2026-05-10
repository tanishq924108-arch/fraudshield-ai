import React from "react";

const transactions = [
  { id: "TXN9821", user: "Rahul Sharma", amount: "₹48,000", type: "UPI Transfer", risk: "high", location: "Mumbai → Delhi", time: "2m ago" },
  { id: "TXN9820", user: "Priya Patel", amount: "₹2,500", type: "ATM Withdrawal", risk: "low", location: "Surat", time: "5m ago" },
  { id: "TXN9819", user: "Amit Verma", amount: "₹15,800", type: "Net Banking", risk: "medium", location: "Bangalore", time: "8m ago" },
  { id: "TXN9818", user: "Sunita Devi", amount: "₹1,20,000", type: "RTGS Transfer", risk: "high", location: "Unknown IP", time: "11m ago" },
  { id: "TXN9817", user: "Kiran Joshi", amount: "₹3,200", type: "UPI Transfer", risk: "low", location: "Pune", time: "14m ago" },
  { id: "TXN9816", user: "Deepak Singh", amount: "₹67,500", type: "Loan Disbursement", risk: "medium", location: "Jaipur", time: "18m ago" },
];

export default function RecentTransactions() {
  return (
    <div className="table-card fade-in">
      <div className="table-header">
        <div className="chart-title">Recent Flagged Transactions</div>
        <button className="btn btn-ghost btn-sm">View All →</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>TX ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Location</th>
            <th>Risk Level</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td><span className="tx-id">{tx.id}</span></td>
              <td>{tx.user}</td>
              <td><span className="amount">{tx.amount}</span></td>
              <td>{tx.type}</td>
              <td style={{ fontSize: 12 }}>{tx.location}</td>
              <td>
                <span className={`risk-badge risk-${tx.risk}`}>
                  {tx.risk === "high" ? "🔴" : tx.risk === "medium" ? "🟠" : "🟢"} {tx.risk.toUpperCase()}
                </span>
              </td>
              <td style={{ color: "#4a5f78", fontSize: 12, fontFamily: "DM Mono" }}>{tx.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
