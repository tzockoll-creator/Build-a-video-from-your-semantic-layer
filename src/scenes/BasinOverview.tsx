import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { basinData } from "../data";

const COLORS = ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#8b5cf6"];

export const BasinOverview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [150, 180], [1, 0], { extrapolateRight: "clamp" });

  const maxEur = Math.max(...basinData.map((d) => d.eurOil));
  const maxWells = Math.max(...basinData.map((d) => d.wells));

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0e1a 0%, #1a1e3a 50%, #0d1225 100%)",
        padding: 80,
        opacity: enterOpacity * exitOpacity,
      }}
    >
      {/* Section label */}
      <div style={{
        fontSize: 14, letterSpacing: 4, color: "#3b82f6", textTransform: "uppercase",
        fontFamily: "SF Pro Display, system-ui, sans-serif", fontWeight: 600, marginBottom: 8,
      }}>
        Basin Breakdown
      </div>
      <div style={{
        fontSize: 48, fontWeight: 700, color: "#ffffff",
        fontFamily: "SF Pro Display, system-ui, sans-serif", marginBottom: 50,
      }}>
        Performance by Basin
      </div>

      <div style={{ display: "flex", gap: 30, flex: 1 }}>
        {/* Left: Horizontal bar chart - EUR Oil */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 16, color: "#64748b", marginBottom: 24, letterSpacing: 2,
            textTransform: "uppercase", fontFamily: "SF Pro Display, system-ui, sans-serif",
          }}>
            EUR Oil (MBO)
          </div>
          {basinData.map((d, i) => {
            const delay = i * 12;
            const barWidth = spring({ frame: frame - 20 - delay, fps, from: 0, to: (d.eurOil / maxEur) * 100, durationInFrames: 40 });
            return (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "#e2e8f0", fontSize: 18, fontFamily: "SF Pro Display, system-ui, sans-serif" }}>
                    {d.basin}
                  </span>
                  <span style={{ color: COLORS[i], fontSize: 18, fontWeight: 700, fontFamily: "SF Mono, monospace" }}>
                    {d.eurOil}
                  </span>
                </div>
                <div style={{ height: 28, background: "rgba(255,255,255,0.05)", borderRadius: 6, overflow: "hidden" }}>
                  <div style={{
                    width: `${barWidth}%`, height: "100%",
                    background: `linear-gradient(90deg, ${COLORS[i]}cc, ${COLORS[i]})`,
                    borderRadius: 6, transition: "width 0.1s",
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Stats cards */}
        <div style={{ width: 500, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{
            fontSize: 16, color: "#64748b", marginBottom: 8, letterSpacing: 2,
            textTransform: "uppercase", fontFamily: "SF Pro Display, system-ui, sans-serif",
          }}>
            Key Metrics
          </div>
          {basinData.map((d, i) => {
            const delay = i * 10;
            const cardOpacity = interpolate(frame - 30 - delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const cardX = spring({ frame: frame - 30 - delay, fps, from: 40, to: 0, durationInFrames: 25 });
            return (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "16px 20px",
                border: `1px solid ${COLORS[i]}33`, opacity: cardOpacity,
                transform: `translateX(${cardX}px)`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS[i] }} />
                  <span style={{ color: "#e2e8f0", fontSize: 16, fontFamily: "SF Pro Display, system-ui, sans-serif" }}>
                    {d.basin}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 30 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#ffffff", fontFamily: "SF Mono, monospace" }}>
                      {d.wells}
                    </div>
                    <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>Wells</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: COLORS[i], fontFamily: "SF Mono, monospace" }}>
                      {d.irr}%
                    </div>
                    <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>IRR</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#ef4444", fontFamily: "SF Mono, monospace" }}>
                      ${Math.abs(d.npv)}M
                    </div>
                    <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>NPV (neg)</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
