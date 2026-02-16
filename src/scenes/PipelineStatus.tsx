import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { statusData } from "../data";

const COLORS = ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export const PipelineStatus: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [120, 150], [1, 0], { extrapolateRight: "clamp" });

  const totalWells = statusData.reduce((s, d) => s + d.wells, 0);

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
        Development Pipeline
      </div>
      <div style={{
        fontSize: 48, fontWeight: 700, color: "#ffffff",
        fontFamily: "SF Pro Display, system-ui, sans-serif", marginBottom: 50,
      }}>
        Pipeline by Status
      </div>

      {/* Stacked bar visualization */}
      <div style={{ marginBottom: 50 }}>
        <div style={{ display: "flex", height: 56, borderRadius: 12, overflow: "hidden", gap: 3 }}>
          {statusData.map((d, i) => {
            const barWidth = spring({ frame: frame - 20 - i * 6, fps, from: 0, to: (d.wells / totalWells) * 100, durationInFrames: 35 });
            return (
              <div key={i} style={{
                width: `${barWidth}%`, height: "100%",
                background: `linear-gradient(180deg, ${COLORS[i]}, ${COLORS[i]}99)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700, color: "#ffffff", fontFamily: "SF Mono, monospace",
              }}>
                {d.wells}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 3, marginTop: 8 }}>
          {statusData.map((d, i) => (
            <div key={i} style={{
              flex: d.wells, fontSize: 10, color: "#64748b", textAlign: "center",
              fontFamily: "SF Pro Display, system-ui, sans-serif", letterSpacing: 0.5,
            }}>
              {d.status}
            </div>
          ))}
        </div>
      </div>

      {/* Detail rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {statusData.map((d, i) => {
          const delay = i * 8;
          const rowOpacity = interpolate(frame - 50 - delay, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const rowX = spring({ frame: frame - 50 - delay, fps, from: 30, to: 0, durationInFrames: 20 });

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 20,
              background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "14px 24px",
              border: `1px solid ${COLORS[i]}22`, opacity: rowOpacity,
              transform: `translateX(${rowX}px)`,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[i] }} />
              <div style={{ flex: 1, fontSize: 18, color: "#e2e8f0", fontFamily: "SF Pro Display, system-ui, sans-serif" }}>
                {d.status}
              </div>
              <div style={{ textAlign: "center", width: 80 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", fontFamily: "SF Mono, monospace" }}>{d.wells}</div>
                <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase" }}>Wells</div>
              </div>
              <div style={{ textAlign: "center", width: 80 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: COLORS[i], fontFamily: "SF Mono, monospace" }}>{d.irr}%</div>
                <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase" }}>IRR</div>
              </div>
              <div style={{ textAlign: "center", width: 100 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#94a3b8", fontFamily: "SF Mono, monospace" }}>{d.payout} mo</div>
                <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase" }}>Payout</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
