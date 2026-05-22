import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Mascot } from "@/components/wrapped/Mascot";
import { wrappedConfig } from "@/config/stats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tal Boss · Snabbit Wrapped" },
      {
        name: "description",
        content:
          "A personalized year-in-review for your team, powered by Tal Boss.",
      },
      { property: "og:title", content: "Tal Boss · Snabbit Wrapped" },
      {
        property: "og:description",
        content: "Tap through your team's year. Meet Tal Boss.",
      },
    ],
  }),
  component: Index,
});

function Index() {
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
        textAlign: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Mascot size={160} rounded={false} />
      <h1
        style={{
          fontWeight: 900,
          fontSize: 44,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          margin: "20px 0 8px",
        }}
      >
        {wrappedConfig.companyName} Wrapped
      </h1>
      <p
        style={{
          fontWeight: 500,
          fontSize: 16,
          opacity: 0.85,
          maxWidth: 320,
          margin: 0,
        }}
      >
        Your team's {wrappedConfig.year} in a story.
        Tap through. Meet Tal Boss.
      </p>
      <Link
        to="/start"
        style={{
          marginTop: 32,
          display: "inline-block",
          padding: "18px 36px",
          borderRadius: 999,
          background: "#FFF4E6",
          color: "#0A0A0A",
          fontWeight: 900,
          fontSize: 18,
          textDecoration: "none",
          boxShadow: "0 8px 0 #CC3D0E",
        }}
      >
        Start →
      </Link>
      <p
        style={{
          marginTop: 24,
          fontSize: 12,
          opacity: 0.6,
          maxWidth: 280,
        }}
      >
        Tip: add{" "}
        <code style={{ background: "rgba(255,244,230,0.1)", padding: "2px 6px", borderRadius: 4 }}>
          ?name=Yash
        </code>{" "}
        to personalize.
      </p>
    </div>
  );
}
