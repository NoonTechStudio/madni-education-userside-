"use client";

import { useState } from "react";

export default function DataModeSwitcher() {
  const [useMockData, setUseMockData] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 999,
        background: "#0F3D35",
        padding: "6px 12px",
        borderRadius: 9999,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 600, fontFamily: "sans-serif" }}>
        Data Source:
      </span>
      <button
        onClick={() => setUseMockData(!useMockData)}
        style={{
          background: useMockData ? "#F5A623" : "#1A6B5A",
          color: "#fff",
          border: "none",
          padding: "4px 10px",
          borderRadius: 9999,
          fontSize: 11,
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        {useMockData ? "Mock Data" : "Real Live Data"}
      </button>
    </div>
  );
}
