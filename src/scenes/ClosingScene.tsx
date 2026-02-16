import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, from: 30, to: 0, durationInFrames: 35 });

  const items = [
    { icon: "▲", label: "Top Performer", value: "Bakken — 45% IRR", color: "#10b981" },
    { icon: "◆", label: "Best Capital Efficiency", value: "Tier 1 Core — 42% IRR", color: "#3b82f6" },
    { icon: "●", label: "Portfolio Avg NPV10", value: "-$8.5M @ $75 base", color: "#ef4444" },
    { icon: "■", label: "Avg Payout", value: "24 months", color: "#f59e0b" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0e1a 0%, #1a1e3a 50%, #0d1225 100%)",
        justifyContent: "center",
        alignItems: "center",
        opacity: enterOpacity,
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 60%)",
      }} />

      <div style={{ textAlign: "center", transform: `translateY(${titleY}px)`, maxWidth: 1200 }}>
        <div style={{
          fontSize: 14, letterSpacing: 4, color: "#3b82f6", textTransform: "uppercase",
          fontFamily: "SF Pro Display, system-ui, sans-serif", fontWeight: 600, marginBottom: 16,
        }}>
          Summary
        </div>
        <div style={{
          fontSize: 56, fontWeight: 700, color: "#ffffff",
          fontFamily: "SF Pro Display, system-ui, sans-serif", marginBottom: 12,
        }}>
          75 Wells. One View.
        </div>
        <div style={{
          fontSize: 22, color: "#94a3b8", fontFamily: "SF Pro Display, system-ui, sans-serif",
          marginBottom: 60, lineHeight: 1.6,
        }}>
          Portfolio shows solid IRR potential but faces NPV headwinds at current pricing.
          <br />Prioritize Tier 1 Core and Bakken assets for near-term capital allocation.
        </div>

        <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
          {items.map((item, i) => {
            const delay = i * 10;
            const cardScale = spring({ frame: frame - 25 - delay, fps, from: 0.8, to: 1, durationInFrames: 25 });
            const cardOpacity = interpolate(frame - 25 - delay, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)", borderRadius: 16,
                border: `1px solid ${item.color}33`, padding: "28px 32px",
                width: 250, opacity: cardOpacity, transform: `scale(${cardScale})`,
              }}>
                <div style={{ fontSize: 28, marginBottom: 8, color: item.color }}>{item.icon}</div>
                <div style={{
                  fontSize: 13, color: "#64748b", textTransform: "uppercase", letterSpacing: 2,
                  fontFamily: "SF Pro Display, system-ui, sans-serif", marginBottom: 10,
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: 20, fontWeight: 700, color: "#ffffff",
                  fontFamily: "SF Pro Display, system-ui, sans-serif",
                }}>
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: 60, fontSize: 14, color: "#475569",
          fontFamily: "SF Pro Display, system-ui, sans-serif", letterSpacing: 2,
        }}>
          WELL PERFORMANCE ANALYTICS — PLAYGROUND DATASET
        </div>
      </div>
    </AbsoluteFill>
  );
};
