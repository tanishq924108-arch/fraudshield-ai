import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: "📊", label: "Dashboard", to: "/" },
  { icon: "💳", label: "Transactions", to: "/transactions" },
  { icon: "🚨", label: "Alerts", to: "/alerts" },
  { icon: "📁", label: "Case Management", to: "/cases" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon">🛡️</div>
          <div className="logo-text">Fraud<span>Shield</span></div>
        </div>
      </div>

      <div className="sidebar-label">Navigation</div>

      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}

      <div className="sidebar-bottom">
        <div className="bob-badge">🏦 Bank of Baroda<br />Powered by IBM AI</div>
      </div>
    </aside>
  );
}
