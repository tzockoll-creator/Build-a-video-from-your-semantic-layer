import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { keyStats } from "../data";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({ frame, fps, from: -60, to: 0, durationInFrames: 40 });
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateRight: "clamp" });
  const statsOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [25, 60], [0, 600], { extrapolateRight: "clamp" });

  const exitOpacity = interpolate(frame, [120, 150], [1, 0], { extrapolateRight: "clamp" });

  const stats = [
    { label: "Total Wells", value: keyStats.totalWells.toString() },
    { label: "Avg CAPEX", value: `$${keyStats.avgCapex}M` },
    { label: "Avg IRR", value: `${keyStats.avgIrr}%` },
    { label: "Avg Payout", value: `${keyStats.avgPayout} mo` },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0e1a 0%, #1a1e3a 50%, #0d1225 100%)",
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
      }}
    >
      {/* Decorative grid lines */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{ textAlign: "center", transform: `translateY(${titleY}px)` }}>
        <div style={{
          fontSize: 22, fontWeight: 500, letterSpacing: 6, color: "#3b82f6",
          opacity: subtitleOpacity, marginBottom: 20, fontFamily: "SF Pro Display, system-ui, sans-serif",
          textTransform: "uppercase",
        }}>
          Portfolio Analytics Report
        </div>

        <div style={{
          fontSize: 72, fontWeight: 700, color: "#ffffff",
          opacity: titleOpacity, fontFamily: "SF Pro Display, system-ui, sans-serif",
          lineHeight: 1.1,
        }}>
          Well Performance
        </div>
        <div style={{
          fontSize: 72, fontWeight: 700,
          background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          opacity: titleOpacity, fontFamily: "SF Pro Display, system-ui, sans-serif",
          lineHeight: 1.1, marginTop: 4,
        }}>
          Overview
        </div>

        {/* Animated line */}
        <div style={{
          width: lineWidth, height: 2, margin: "30px auto",
          background: "linear-gradient(90deg, transparent, #3b82f6, transparent)",
        }} />

        {/* Key stats row */}
        <div style={{
          display: "flex", gap: 60, justifyContent: "center",
          opacity: statsOpacity, marginTop: 10,
        }}>
          {stats.map((stat, i) => {
            const delay = i * 8;
            const statScale = spring({ frame: frame - 55 - delay, fps, from: 0.7, to: 1, durationInFrames: 20 });
            return (
              <div key={i} style={{ textAlign: "center", transform: `scale(${statScale})` }}>
                <div style={{
                  fontSize: 42, fontWeight: 700, color: "#ffffff",
                  fontFamily: "SF Mono, monospace",
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 14, color: "#64748b", marginTop: 6,
                  letterSpacing: 2, textTransform: "uppercase",
                  fontFamily: "SF Pro Display, system-ui, sans-serif",
                }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
