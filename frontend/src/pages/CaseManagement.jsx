import React, { useState } from "react";

const cases = [
  { id: "CASE-2024-001", title: "Mass UPI Fraud Ring — Surat Region", status: "investigating", priority: "high", assigned: "Officer R. Mehta", amount: "₹8,40,000", date: "May 1, 2024", victims: 12, desc: "Coordinated UPI fraud affecting 12 BOB account holders. Same beneficiary account across all transactions. Cybercrime cell notified." },
  { id: "CASE-2024-002", title: "ATM Skimming — Ahmedabad Branch", status: "open", priority: "high", assigned: "Officer S. Patel", amount: "₹2,15,000", date: "Apr 30, 2024", victims: 5, desc: "Skimming device found on ATM #AHM-0042. 5 cards compromised. FIR registered. Device sent for forensic analysis." },
  { id: "CASE-2024-003", title: "Fake Loan Application — Income Proof Forgery", status: "investigating", priority: "medium", assigned: "Officer P. Sharma", amount: "₹12,00,000", date: "Apr 28, 2024", victims: 1, desc: "Loan applicant submitted forged ITR documents. AI verification flagged 3 inconsistencies. Application suspended pending verification." },
  { id: "CASE-2024-004", title: "Phishing Attack on Net Banking Users", status: "closed", priority: "low", assigned: "Officer M. Joshi", amount: "₹67,500", date: "Apr 22, 2024", victims: 3, desc: "3 customers received phishing SMS. Amounts recovered. Customers educated. Source IP traced and blocked." },
];

const statusLabel = {
  open: { label: "Open", cls: "status-open" },
  investigating: { label: "Investigating", cls: "status-investigating" },
  closed: { label: "Closed", cls: "status-closed" },
};

export default function CaseManagement() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="page-header fade-in">
        <div>
          <div className="page-title">Case Management</div>
          <div className="page-subtitle">Active fraud investigations tracker</div>
        </div>
        <button className="btn btn-primary">+ New Case</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: 20 }}>
        <div className="fade-in">
          {cases.map((c) => (
            <div key={c.id} className="case-card" onClick={() => setSelected(c)} style={{ cursor: "pointer", borderColor: selected?.id === c.id ? "#1a8cff" : "" }}>
              <div className="case-header">
                <div>
                  <div className="case-id">{c.id}</div>
                  <div className="case-title">{c.title}</div>
                </div>
                <span className={`status-badge ${statusLabel[c.status].cls}`}>{statusLabel[c.status].label}</span>
              </div>
              <div className="case-meta">
                👤 {c.assigned} &nbsp;|&nbsp; 💰 {c.amount} &nbsp;|&nbsp; 🗓 {c.date} &nbsp;|&nbsp; 👥 {c.victims} victim{c.victims > 1 ? "s" : ""}
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="chart-card fade-in" style={{ height: "fit-content" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div className="chart-title">Case Details</div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕ Close</button>
            </div>
            <div className="case-id" style={{ marginBottom: 8 }}>{selected.id}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#e8edf5", marginBottom: 12 }}>{selected.title}</div>
            <div style={{ fontSize: 13, color: "#7a8fa8", lineHeight: 1.7, marginBottom: 16 }}>{selected.desc}</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                ["Amount at Risk", selected.amount],
                ["Victims", selected.victims],
                ["Assigned To", selected.assigned],
                ["Opened On", selected.date],
              ].map(([k, v]) => (
                <div key={k} style={{ background: "#080c14", borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ fontSize: 10, color: "#4a5f78", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "DM Mono", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#e8edf5" }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-primary" style={{ flex: 1 }}>Update Status</button>
              <button className="btn btn-ghost">📎 Attach Doc</button>
              <button className="btn btn-danger btn-sm">⚠ Escalate</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
