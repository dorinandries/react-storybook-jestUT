// components/Timeline/TimelineItem/index.tsx
import React, { useState } from "react";
import { TimelineStatusEnum,  Stage } from "../../../types";
import {
  Item,
  TimelineDataContainerStyled,
  TimelineContentStyled,
  Title,
  Desc,
  MetaRight,
  Extra,
  Toggle,
} from "./styles";
import { Indicator } from "./Indicator";
import { TwoRows } from "../../../styles";
import { InfoButton } from "../../OrderTimelineButtons/styles";

export interface TimelineItemProps extends Stage {
  isFirstElement?: boolean;
  isLastElement?: boolean;
  "data-testid"?: string;
  onEditStage: () => void;
};

export default function TimelineItem({
  title,
  description,
  date,
  time,
  extraDescription,
  status = TimelineStatusEnum.Neutral,
  isFirstElement = false,
  isLastElement = false,
  onEditStage = () => {},
  ...props
}: TimelineItemProps) {

  const [open, setOpen] = useState(false);
  const hasExtra = Boolean(extraDescription);
  const { ["data-testid"]: testId } = props;

  return (
    <Item data-testid={testId}>
      <Indicator status={status} isFirstElement={isFirstElement} isLastElement={isLastElement} />
      <TimelineDataContainerStyled
        $data-highlighted={
          status === TimelineStatusEnum.Pending ? "true" : undefined
        }
        aria-label="Timeline Item Data Container"
      >
        <TimelineContentStyled>
          <TwoRows>
            <Title data-testid="timeline-item-title">{title}</Title>
            <Desc data-testid="timeline-item-description">{description}</Desc>
          </TwoRows>
          <MetaRight>
            <Desc data-testid="timeline-item-date">{date}</Desc>
            <Desc data-testid="timeline-item-time">{time}</Desc>
          </MetaRight>
          <MetaRight>
             <InfoButton onClick={onEditStage} data-testid="button-edit-stage">Edit</InfoButton>
          </MetaRight>
        </TimelineContentStyled>

        {hasExtra && open && (
          <Extra $status={status}>
        
            {typeof extraDescription === "string" ? (
              <p>{extraDescription}</p>
            ) : (
              extraDescription
            )}
          </Extra>
        )}
        {hasExtra && (
          <Toggle onClick={() => setOpen((v) => !v)}>
            {open ? "See less" : "See more"}
          </Toggle>
        )}
      </TimelineDataContainerStyled>
    </Item>
  );
}
