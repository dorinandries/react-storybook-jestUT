// src/components/OrderCard/styles.tsx
import { css, keyframes, styled } from "styled-components";
import { OrderStatusEnum } from "../../types";
import { getColorByKey } from "../../styles";

export const Card = styled.button<{ $selected?: boolean }>`
  text-align: left;
  width: 100%;
  background: #fff;
  border: 1px solid ${({ $selected }) => ($selected ? getColorByKey("pending") : "#e5e7eb")};
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: ${({ $selected }) =>
    $selected
      ? `0 0 0 3px ${getColorByKey("pending")}33`
      : "0 4px 14px rgba(0, 0, 0, 0.05)"};
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease;
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ $selected }) =>
      $selected
        ? `0 0 0 4px ${getColorByKey("pending")}44`
        : "0 6px 18px rgba(0, 0, 0, 0.08)"};
  }
`;

export const CardTitle = styled.div`
//   display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 25px;
  font-weight: 600;
`;

export const CardDetailsStatusStyled = styled.div<{ $space_between?: boolean }>`
    display: flex;
    height:100%;
    align-items: center;
    justify-content: ${({ $space_between }) =>  $space_between ? "space-between" : "initial"};
    gap: 8px;
`;

export const Subtle = styled.div`
  color: #6b7280;
  font-size: 0.92rem;
  margin: 0px 0 10px 0;
`;

export const Badge = styled.span<{ $status?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ $status }) => getColorByKey($status || "neutral")}33;
  color: ${({ $status }) => getColorByKey($status || "neutral")};
  border: 1px solid ${({ $status }) => getColorByKey($status || "neutral")}33;
`;
