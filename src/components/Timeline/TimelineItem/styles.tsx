// src/components/Timeline/TimelineItem/styles.tsx
import styled, { css, keyframes } from "styled-components";
import { Stage } from "../../../types";

import { getColorByKey } from "../../../styles";

export const Item = styled.div`
  display: flex;
  padding: 0 20px;
`;

export const TimelineDataContainerStyled = styled.div`
  background: #fff;
  border: 2px solid #d1d5db;
  border-radius: 10px;
  padding: 14px 16px;
  margin: 12px 0 12px 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);   
  width: 500px;
  &[$data-highlighted="true"] {
    border-color: ${getColorByKey("pending")};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
`;

export const TimelineContentStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
`;

export const Title = styled.h4`
  margin: 0;
  font-family: "Caveat", ui-serif, Georgia, serif;
  font-weight: 700;
  font-size: 1.2rem;
`;

export const MetaRight = styled.div`
  text-align: right;
  min-width: 130px;
  color: #374151;
  font-style: italic;
`;

export const Desc = styled.p`
  margin: 6px 0 0;
  color: #6b7280;
  font-style: italic;
`;

export const Extra = styled.div<{ $status: Stage["status"] }>`
  margin-top: 10px;
  padding: 10px 12px;
  background: ${({ $status }) => getColorByKey($status || "neutral")}1A;
  color: ${({ $status }) => getColorByKey($status || "neutral")};
  border-radius: 8px;
  line-height: 1.4;
`;

export const Toggle = styled.button`
  margin-top: 8px;
  border: 1px solid #cbd5e1;
  background: #eef2ff;
  padding: 6px 10px;
  border-radius: 8px;
  color: #334155;
  cursor: pointer;
`;
