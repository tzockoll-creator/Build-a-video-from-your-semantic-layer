import { Composition } from "remotion";
import { WellPerformanceVideo } from "./WellPerformanceVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="WellPerformance"
      component={WellPerformanceVideo}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
