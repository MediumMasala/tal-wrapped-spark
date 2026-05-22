import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mascot } from "@/components/wrapped/Mascot";
import { wrappedConfig } from "@/config/stats";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Start · Snabbit Wrapped" },
      {
        name: "description",
        content: "Tell us about you before your Wrapped begins.",
      },
    ],
  }),
  component: StartPage,
});

function StartPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [bestManager, setBestManager] = useState("");

  const canSubmit = name.trim().length > 0;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate({
      to: "/wrapped",
      search: {
        name: name.trim(),
        company: wrappedConfig.companyName,
        department: department.trim() || undefined,
        bestManager: bestManager.trim() || undefined,
      },
    });
  };

  const label: React.CSSProperties = {
    display: "block",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    marginBottom: 8,
    color: "#FFF4E6",
    opacity: 0.85,
  };

  const input: React.CSSProperties = {
    width: "100%",
    padding: "16px 18px",
    borderRadius: 14,
    border: "2px solid rgba(255,244,230,0.25)",
    background: "rgba(0,0,0,0.35)",
    color: "#FFF4E6",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "Inter, sans-serif",
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        background:
          "radial-gradient(circle at 30% 20%, #CC3D0E 0%, #1a0a04 70%)",
        color: "#FFF4E6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420, textAlign: "center" }}>
        <Mascot size={96} rounded={false} />
        <h1
          style={{
            fontWeight: 900,
            fontSize: 36,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            margin: "16px 0 6px",
          }}
        >
          Before we begin…
        </h1>
        <p style={{ fontSize: 14, opacity: 0.8, margin: "0 0 24px" }}>
          A few quick details to personalize your Wrapped.
        </p>

        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            textAlign: "left",
          }}
        >
          <div>
            <label style={label} htmlFor="name">Your name</label>
            <input
              id="name"
              style={input}
              placeholder="e.g. Yash"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div>
            <label style={label} htmlFor="dept">Department</label>
            <input
              id="dept"
              style={input}
              placeholder="e.g. Operations, Engineering"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div>
            <label style={label} htmlFor="mgr">
              Who's the best manager at {wrappedConfig.companyName}?
            </label>
            <input
              id="mgr"
              style={input}
              placeholder="Drop a name 👀"
              value={bestManager}
              onChange={(e) => setBestManager(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            style={{
              marginTop: 8,
              padding: "18px 36px",
              borderRadius: 999,
              background: canSubmit ? "#FFF4E6" : "rgba(255,244,230,0.4)",
              color: "#0A0A0A",
              fontWeight: 900,
              fontSize: 18,
              border: "none",
              cursor: canSubmit ? "pointer" : "not-allowed",
              boxShadow: canSubmit ? "0 8px 0 #CC3D0E" : "none",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Start my Wrapped →
          </button>
        </form>
      </div>
    </div>
  );
}