// src/components/Timeline/TimelineItem/Indicator/styles.tsx
import styled from "styled-components";
import { Stage } from "../../../../types";
import { getColorByKey } from "../../../../styles";


export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* anchors the lines */
  width: 120px;
`;

export const Circle = styled.div<{ $status: string}>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index:2;
  background: ${({ $status }) => getColorByKey($status || "neutral")};
`;

export const Line = styled.div`
  position: absolute;
  left: 50%;
  width: 4px;
  background: black;
  transform: translateX(-50%);
`;

export const TopLine = styled(Line)<{ $isFirstElement: boolean }>`
  top: 0;
  height: 50%; /* from top edge to circle center */
  display: ${({ $isFirstElement }) => ($isFirstElement ? "none" : "block")};
`;

export const BottomLine = styled(Line)<{ $isLastElement: boolean }>`
  bottom: 0;
  height: 50%; /* from bottom edge to circle center */
  display: ${({ $isLastElement }) => ($isLastElement ? "none" : "block")};
`;