// src/components/OrderCard/styles.tsx
import { css, keyframes, styled } from "styled-components";
import { OrderStatusEnum } from "../../types";
import { getColorByKey } from "../../styles";

export const Card = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  background: #fff;
  border: 1px solid
    ${({ $selected }) => ($selected ? getColorByKey("pending") : "#e5e7eb")};
  border-radius: 14px;
  padding: 12px 18px;
  box-shadow: ${({ $selected }) =>
    $selected
      ? `0 0 0 3px ${getColorByKey("pending")}33`
      : "0 4px 14px rgba(0, 0, 0, 0.05)"};
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease;

  /* equal-height cards when placed in a grid */

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ $selected }) =>
      $selected
        ? `0 0 0 4px ${getColorByKey("pending")}44`
        : "0 6px 18px rgba(0, 0, 0, 0.08)"};
  }
  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 1rem);
  }

  @media (max-width: 510px) {
    flex: 1 1 100%;
  }
`;

export const CardTitle = styled.div`
  gap: 8px;
  margin-bottom: 12px;
`;

export const CardDetailsStatusStyled = styled.div<{ $space_between?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $space_between }) =>
    $space_between ? "space-between" : "initial"};
  gap: 8px;

  & > * {
    margin: 0;
    padding: 0;
  }

  & > h5 {
    margin: 0;
    font-weight: 800;
  }

  & > div {
    display: contents; /* behaves as if the wrapper isn't there */
  }
`;

export const Subtle = styled.div`
  color: #6b7280;
  font-size: 0.85rem;
`;

export const Badge = styled.span<{ $status?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.65rem;
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ $status }) => getColorByKey($status || "neutral")}33;
  color: ${({ $status }) => getColorByKey($status || "neutral")};
  border: 1px solid ${({ $status }) => getColorByKey($status || "neutral")}33;
`;

export const Prop1Styled = styled.div`
  font-size: 0.75rem;
`;

export const Prop2Styled = styled.div`
  font-size: 0.9rem;
`;
