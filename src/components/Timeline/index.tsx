// components/Timeline/index.tsx
import { useMemo } from "react";
import { Stage } from "../../types";
import TimelineItem, { TimelineItemProps } from "./TimelineItem";
import { TimelineContainer } from "./styles";

export default function Timeline({
  stages,
  handleEditStageButton,
  ...props
}: {
  stages: Stage[];
  handleEditStageButton: (index: number) => void;
  "data-testid"?: string;
}) {
  const { ["data-testid"]: testId } = props;

  const onEditStage = (index: number) => () => {
    handleEditStageButton(index);
  };

  //console.log("Normalized Stages:", normalized);
  return (
    <TimelineContainer data-testid={testId}>
      {stages.map((s, i) => (
        <TimelineItem
          key={`${s.title}-${i}`}
          {...s}
          isFirstElement={i === 0}
          isLastElement={i === stages.length - 1}
          data-testid={`timeline-item-${i}`}
          onEditStage={onEditStage(i)}
        />
      ))}
    </TimelineContainer>
  );
}
