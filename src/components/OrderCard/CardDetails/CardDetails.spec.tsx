// src/components/OrderCard/CardDetails/CardDetails.spec.tsx
import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import CardDetails from "./index";
import { OrderStatusEnum, TimelineStatusEnum } from "../../../types";

const MOCK_CARD_DETAILS = {
  title: "Order #ORD-2025-0125-001",
  prop1: "Alexander Smith",
  prop2: "310 Regent Street, London W1B 3HH",
  $space_between: true,
};

describe("CardDetails", () => {
  it("renders without crashing", () => {
    render(<CardDetails {...MOCK_CARD_DETAILS} />);
  });
  it("renders the title correctly", () => {
    render(<CardDetails {...MOCK_CARD_DETAILS} />);
    const titleElement = screen.getByText(MOCK_CARD_DETAILS.title);
    expect(titleElement).toBeInTheDocument();
    const headingElement = screen.getByRole("heading", { name: MOCK_CARD_DETAILS.title });
    expect(headingElement).toBeInTheDocument();
  });
  it("renders prop1 and prop2 correctly", () => {
    render(<CardDetails {...MOCK_CARD_DETAILS} />);
    const prop1Element = screen.getByText(MOCK_CARD_DETAILS.prop1 as string);
    const prop2Element = screen.getByText(MOCK_CARD_DETAILS.prop2 as string);
    expect(prop1Element).toBeInTheDocument();
    expect(prop2Element).toBeInTheDocument();
  });
  it("applies space between when $space_between is true", () => {
    render(<CardDetails {...MOCK_CARD_DETAILS} $space_between={true} />);
    const container = screen.getByText(MOCK_CARD_DETAILS.title).parentElement
      ?.parentElement;
    expect(container).toHaveStyle("justify-content: space-between");
  });
  it("does not apply space between when $space_between is false", () => {
    render(<CardDetails {...MOCK_CARD_DETAILS} $space_between={false} />);
    const container = screen.getByText(MOCK_CARD_DETAILS.title).parentElement
      ?.parentElement;
    expect(container).not.toHaveStyle("justify-content: space-between");
  });
});
