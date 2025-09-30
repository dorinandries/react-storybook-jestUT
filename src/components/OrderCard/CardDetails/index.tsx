// src/components/OrderCard/CardDetails/index.tsx

import React from "react";
import { CardDetailsStatusStyled } from "../styles";

type CardDetailsProps = {
  title: React.ReactNode;
  prop1?: React.ReactNode;
  prop2?: React.ReactNode;
  separator?: React.ReactNode;
  $space_between?: boolean;
};

const CardDetails = ({
  title,
  prop1,
  prop2,
  separator,
  $space_between = true,
}: CardDetailsProps) => {
  return (
    <CardDetailsStatus $space_between={$space_between}>
      <h4>
        <strong>
          {title} {separator || null}
        </strong>
      </h4>
      <div>{prop1 !== undefined && <>{prop1}</>}</div>
      <div>{prop2 !== undefined && <>{prop2}</>}</div>
    </CardDetailsStatus>
  );
};

export default CardDetails;

export const CardDetailsStatus = ({
  $space_between,
  children,
}: {
  $space_between?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <CardDetailsStatusStyled $space_between={$space_between}>
      {children}
    </CardDetailsStatusStyled>
  );
};
