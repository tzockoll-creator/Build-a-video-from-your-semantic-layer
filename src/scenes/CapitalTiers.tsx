import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { tierData } from "../data";

const COLORS = ["#3b82f6", "#06b6d4", "#f59e0b", "#64748b"];

export const CapitalTiers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [120, 150], [1, 0], { extrapolateRight: "clamp" });

  const maxIrr = 50;
  const maxCapex = 15;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0e1a 0%, #1a1e3a 50%, #0d1225 100%)",
        padding: 80,
        opacity: enterOpacity * exitOpacity,
      }}
    >
      <div style={{
        fontSize: 14, letterSpacing: 4, color: "#3b82f6", textTransform: "uppercase",
        fontFamily: "SF Pro Display, system-ui, sans-serif", fontWeight: 600, marginBottom: 8,
      }}>
        Capital Allocation
      </div>
      <div style={{
        fontSize: 48, fontWeight: 700, color: "#ffffff",
        fontFamily: "SF Pro Display, system-ui, sans-serif", marginBottom: 60,
      }}>
        Performance by Capital Tier
      </div>

      <div style={{ display: "flex", gap: 30, flex: 1 }}>
        {tierData.map((d, i) => {
          const delay = i * 15;
          const cardScale = spring({ frame: frame - 20 - delay, fps, from: 0.85, to: 1, durationInFrames: 30 });
          const cardOpacity = interpolate(frame - 20 - delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          const irrHeight = spring({ frame: frame - 40 - delay, fps, from: 0, to: (d.irr / maxIrr) * 280, durationInFrames: 40 });
          const capexHeight = spring({ frame: frame - 50 - delay, fps, from: 0, to: (d.capex / maxCapex) * 280, durationInFrames: 40 });

          return (
            <div key={i} style={{
              flex: 1, background: "rgba(255,255,255,0.03)", borderRadius: 16,
              border: `1px solid ${COLORS[i]}33`, padding: 30,
              opacity: cardOpacity, transform: `scale(${cardScale})`,
              display: "flex", flexDirection: "column",
            }}>
              <div style={{
                fontSize: 12, color: COLORS[i], letterSpacing: 3, textTransform: "uppercase",
                fontFamily: "SF Pro Display, system-ui, sans-serif", fontWeight: 600, marginBottom: 4,
              }}>
                {d.tier}
              </div>
              <div style={{
                fontSize: 16, color: "#94a3b8", fontFamily: "SF Pro Display, system-ui, sans-serif",
                marginBottom: 24,
              }}>
                {d.wells} wells
              </div>

              {/* Mini bar chart */}
              <div style={{ display: "flex", gap: 16, alignItems: "flex-end", flex: 1, marginBottom: 20 }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: COLORS[i], fontFamily: "SF Mono, monospace", marginBottom: 8 }}>
                    {d.irr}%
                  </div>
                  <div style={{
                    width: "100%", height: irrHeight, borderRadius: 8,
                    background: `linear-gradient(180deg, ${COLORS[i]}, ${COLORS[i]}66)`,
                  }} />
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 8, textTransform: "uppercase", letterSpacing: 1 }}>IRR</div>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#e2e8f0", fontFamily: "SF Mono, monospace", marginBottom: 8 }}>
                    ${d.capex}M
                  </div>
                  <div style={{
                    width: "100%", height: capexHeight, borderRadius: 8,
                    background: "linear-gradient(180deg, #475569, #47556966)",
                  }} />
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 8, textTransform: "uppercase", letterSpacing: 1 }}>CAPEX</div>
                </div>
              </div>

              {/* EUR */}
              <div style={{
                borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16,
                display: "flex", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>EUR Oil</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0", fontFamily: "SF Mono, monospace" }}>{d.eurOil} MBO</span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
