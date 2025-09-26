// src/components/OrderStatusActions/styles.tsx
import { styled } from "styled-components";


export const ContainerButtons = styled.div`
    display: flex;
    gap: 8px;
    margin: 24px 0;
`;

export const DangerButton = styled.button`
  appearance: none;
  border: 1px solid #d61803;
  background: #fff5f5;
  color: #b31300;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background: #ffc8c8;
  }
`;

export const SuccessButton = styled.button`
  appearance: none;
  border: 1px solid #2ecc71;
  background: #e6ffef;
  color: #1a8f4a;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background: #c9fcdc;
  }
`;

export const InfoButton = styled.button`
  appearance: none;
  border: 1px solid #1f99ebff;
  background: #e6edffff;
  color: #0d5c91;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background: #c3cdfa;
  }
`;