// components/Timeline/index.tsx
import { useMemo } from "react";
import { Stage } from "../../types";
import TimelineItem, { TimelineItemProps } from "./TimelineItem";
import { TimelineContainer } from "./styles";

export default function Timeline({ stages }: { stages: Stage[] }) {
  // Ensure first & last flags and at least first is green (created)
  const normalized = useMemo(() => {
    if (!stages.length) return stages;
    const copy: TimelineItemProps[] = stages.map((s) => ({ ...s }));
    copy[0].isFirstElement = true;
    copy[0].status = copy[0].status || "success";
    // if (copy.length > 1) {
      copy[copy.length - 1].isLastElement = true;
    // }
    return copy;
  }, [stages]);

  console.log("Normalized Stages:", normalized);
  return (
    <TimelineContainer>
      {normalized.map((s, i) => (
        <TimelineItem key={`${s.title}-${i}`} {...s} data-testid={`timeline-item-${i}`} />
      ))}
    </TimelineContainer>
  );
}
