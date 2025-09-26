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

export interface TimelineItemProps extends Stage {
  isFirstElement?: boolean;
  isLastElement?: boolean;
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
}: TimelineItemProps) {

  const [open, setOpen] = useState(false);
  const hasExtra = Boolean(extraDescription);

  return (
    <Item>
      <Indicator status={status} isFirstElement={isFirstElement} isLastElement={isLastElement} />
      <TimelineDataContainerStyled
        $data-highlighted={
          status === TimelineStatusEnum.Pending ? "true" : undefined
        }
        aria-label="Timeline Item Data Container"
      >
        <TimelineContentStyled>
          <TwoRows>
            <Title>{title}</Title>
            <Desc>{description}</Desc>
          </TwoRows>
          <MetaRight>
            <Desc>{date}</Desc>
            <Desc>{time}</Desc>
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
