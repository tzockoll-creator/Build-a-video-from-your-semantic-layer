import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const riskData = [
  { geo: "Medium", exec: "Low", wells: 6, irr: 46 },
  { geo: "High", exec: "High", wells: 9, irr: 46 },
  { geo: "Medium", exec: "High", wells: 10, irr: 45 },
  { geo: "Medium", exec: "Medium", wells: 13, irr: 43 },
  { geo: "Low", exec: "Medium", wells: 6, irr: 38 },
  { geo: "Low", exec: "Low", wells: 3, irr: 38 },
  { geo: "High", exec: "Medium", wells: 12, irr: 37 },
  { geo: "Low", exec: "High", wells: 11, irr: 34 },
  { geo: "High", exec: "Low", wells: 5, irr: 30 },
];

const getRiskColor = (irr: number) => {
  if (irr >= 45) return "#10b981";
  if (irr >= 40) return "#06b6d4";
  if (irr >= 35) return "#f59e0b";
  return "#ef4444";
};

export const RiskAndOutlook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [120, 150], [1, 0], { extrapolateRight: "clamp" });

  // Risk matrix: 3x3 grid
  const geoLevels = ["Low", "Medium", "High"];
  const execLevels = ["Low", "Medium", "High"];

  const getCell = (geo: string, exec: string) => riskData.find((d) => d.geo === geo && d.exec === exec);

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
        Risk Assessment
      </div>
      <div style={{
        fontSize: 48, fontWeight: 700, color: "#ffffff",
        fontFamily: "SF Pro Display, system-ui, sans-serif", marginBottom: 50,
      }}>
        Risk vs. Return Matrix
      </div>

      <div style={{ display: "flex", gap: 60, flex: 1 }}>
        {/* Risk matrix */}
        <div style={{ flex: 1 }}>
          {/* Exec risk label */}
          <div style={{ display: "flex", marginLeft: 120, marginBottom: 10 }}>
            {execLevels.map((lvl) => (
              <div key={lvl} style={{
                flex: 1, textAlign: "center", fontSize: 14, color: "#64748b",
                textTransform: "uppercase", letterSpacing: 2, fontFamily: "SF Pro Display, system-ui, sans-serif",
              }}>
                {lvl}
              </div>
            ))}
          </div>

          {geoLevels.map((geo, gi) => (
            <div key={geo} style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
              <div style={{
                width: 110, fontSize: 14, color: "#64748b", textAlign: "right", paddingRight: 16,
                textTransform: "uppercase", letterSpacing: 2, fontFamily: "SF Pro Display, system-ui, sans-serif",
              }}>
                {geo}
              </div>
              {execLevels.map((exec, ei) => {
                const cell = getCell(geo, exec);
                const delay = (gi * 3 + ei) * 8;
                const cellScale = spring({ frame: frame - 25 - delay, fps, from: 0, to: 1, durationInFrames: 25 });
                const color = cell ? getRiskColor(cell.irr) : "#1e293b";

                return (
                  <div key={exec} style={{
                    flex: 1, aspectRatio: "1.6", margin: 6, borderRadius: 12,
                    background: cell ? `${color}22` : "rgba(255,255,255,0.02)",
                    border: `2px solid ${cell ? `${color}66` : "rgba(255,255,255,0.05)"}`,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    transform: `scale(${cellScale})`,
                  }}>
                    {cell && (
                      <>
                        <div style={{ fontSize: 28, fontWeight: 700, color, fontFamily: "SF Mono, monospace" }}>
                          {cell.irr}%
                        </div>
                        <div style={{ fontSize: 13, color: "#94a3b8", fontFamily: "SF Mono, monospace" }}>
                          {cell.wells} wells
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
            <div style={{ fontSize: 13, color: "#475569", fontFamily: "SF Pro Display, system-ui, sans-serif" }}>
              Execution Risk →
            </div>
          </div>
          <div style={{
            position: "absolute", left: 40, top: "50%", transform: "rotate(-90deg)",
            fontSize: 13, color: "#475569", fontFamily: "SF Pro Display, system-ui, sans-serif",
          }}>
            Geological Risk →
          </div>
        </div>

        {/* Key insight */}
        <div style={{ width: 420, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{
            fontSize: 16, color: "#64748b", letterSpacing: 2, textTransform: "uppercase",
            fontFamily: "SF Pro Display, system-ui, sans-serif", marginBottom: 8,
          }}>
            Key Insight
          </div>

          {[
            { title: "High risk ≠ low return", desc: "High/High wells avg 46% IRR — the best in portfolio", color: "#10b981" },
            { title: "Lowest returns in High Geo / Low Exec", desc: "Only 30% IRR — geological risk is the dominant factor", color: "#ef4444" },
            { title: "All NPV10 negative at $75", desc: "Portfolio under pressure at current price assumptions", color: "#f59e0b" },
          ].map((item, i) => {
            const delay = i * 15;
            const insightOpacity = interpolate(frame - 60 - delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 24,
                borderLeft: `4px solid ${item.color}`, opacity: insightOpacity,
              }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#ffffff", fontFamily: "SF Pro Display, system-ui, sans-serif", marginBottom: 6 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 15, color: "#94a3b8", fontFamily: "SF Pro Display, system-ui, sans-serif", lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
