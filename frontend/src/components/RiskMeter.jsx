import React from "react";

export default function RiskMeter({ score }) {
  const color = score >= 70 ? "#ff3d57" : score >= 40 ? "#ff8c42" : "#00e676";
  const label = score >= 70 ? "HIGH RISK" : score >= 40 ? "MEDIUM" : "LOW RISK";

  return (
    <div className="risk-meter-wrap" style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11, color: "#4a5f78", fontFamily: "DM Mono", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
        System Risk Score
      </div>
      <div style={{
        width: 90, height: 90, borderRadius: "50%", margin: "0 auto",
        background: `conic-gradient(${color} ${score * 3.6}deg, #1e2d45 0deg)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 0 20px ${color}40`
      }}>
        <div style={{
          width: 66, height: 66, borderRadius: "50%", background: "#111827",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 800, color, lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: 9, color: "#4a5f78", fontFamily: "DM Mono", letterSpacing: 1 }}>/100</div>
        </div>
      </div>
      <div style={{ color, fontFamily: "DM Mono", fontSize: 11, letterSpacing: 2, marginTop: 8 }}>{label}</div>
    </div>
  );
}
