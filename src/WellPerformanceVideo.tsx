import { AbsoluteFill, Sequence } from "remotion";
import { TitleScene } from "./scenes/TitleScene";
import { BasinOverview } from "./scenes/BasinOverview";
import { CapitalTiers } from "./scenes/CapitalTiers";
import { PipelineStatus } from "./scenes/PipelineStatus";
import { RiskAndOutlook } from "./scenes/RiskAndOutlook";
import { ClosingScene } from "./scenes/ClosingScene";

export const WellPerformanceVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0e1a" }}>
      <Sequence from={0} durationInFrames={150}>
        <TitleScene />
      </Sequence>
      <Sequence from={150} durationInFrames={180}>
        <BasinOverview />
      </Sequence>
      <Sequence from={330} durationInFrames={150}>
        <CapitalTiers />
      </Sequence>
      <Sequence from={480} durationInFrames={150}>
        <PipelineStatus />
      </Sequence>
      <Sequence from={630} durationInFrames={150}>
        <RiskAndOutlook />
      </Sequence>
      <Sequence from={780} durationInFrames={120}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
