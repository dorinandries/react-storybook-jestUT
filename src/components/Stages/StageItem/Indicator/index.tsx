// src/components/Timeline/TimelineItem/Indicator/index.tsx
import { Stage } from "../../../../types";
import { BottomLine, Circle, TopLine, Wrapper } from "./styles";

type IndicatorProps = {
  status: string;
  isFirstElement?: boolean;
  isLastElement?: boolean;
};

export const Indicator: React.FC<IndicatorProps> = ({
  status,
  isFirstElement,
  isLastElement,
}) => {
  return (
    <Wrapper aria-label="Timeline Indicator">
      <TopLine $isFirstElement={!!isFirstElement} />
      <Circle $status={status} />
      <BottomLine $isLastElement={!!isLastElement} />
    </Wrapper>
  );
};
