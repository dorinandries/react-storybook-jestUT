// components/Timeline/TimelineItem/index.tsx
import React, { useState } from "react";
import { TimelineStatusEnum, Stage } from "../../../types";
import {
  Item,
  TimelineDataContainerStyled,
  TimelineContentStyled,
  Title,
  Desc,
  MetaRight,
  Extra,
  Toggle,
  SecondaryTitle,
  TimelineHeaderStyled,
} from "./styles";
import { Indicator } from "./Indicator";
import { Rows, Cols } from "../../../styles";
import { EditButton, InfoButton } from "../../OrderTimelineButtons/styles";

export interface TimelineItemProps extends Stage {
  isFirstElement?: boolean;
  isLastElement?: boolean;
  "data-testid"?: string;
  onEditStage: () => void;
}

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
      <Indicator
        status={status}
        isFirstElement={isFirstElement}
        isLastElement={isLastElement}
      />
      <TimelineDataContainerStyled
        $data-highlighted={
          status === TimelineStatusEnum.Pending ? "true" : undefined
        }
        aria-label="Timeline Item Data Container"
      >
        <TimelineContentStyled>
          {/* <Rows>
            <Title data-testid="timeline-item-title">{title}</Title>

            <Desc data-testid="timeline-item-description">{description}</Desc>
          </Rows>
          <MetaRight>
            <Desc data-testid="timeline-item-date">{date}</Desc>
            <Desc data-testid="timeline-item-time">{time}</Desc>
          </MetaRight>
          <MetaRight>
            <InfoButton onClick={onEditStage} data-testid="button-edit-stage">
              Edit
            </InfoButton>
          </MetaRight> */}
          <Cols>
            <TimelineHeaderStyled>
              <Title data-testid="timeline-item-title">{title}</Title>

              <MetaRight>
                <SecondaryTitle data-testid="timeline-item-time">
                  Time
                </SecondaryTitle>

                <Desc data-testid="timeline-item-date">{date}</Desc>
                <Desc data-testid="timeline-item-time">{time}</Desc>
              </MetaRight>

              <EditButton onClick={onEditStage} data-testid="button-edit-stage">
                Edit
              </EditButton>
              
            </TimelineHeaderStyled>

            <Rows>
              <Cols>
                <Desc data-testid="timeline-item-description">
                  {description}
                </Desc>
              </Cols>
            </Rows>

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
          </Cols>
        </TimelineContentStyled>
      </TimelineDataContainerStyled>
    </Item>
  );
}
