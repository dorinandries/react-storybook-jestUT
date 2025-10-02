// src/components/OrderStatusActions/OrderStatusActions.spec.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OrderTimelineButtons from "./index";
import { OrderStatusEnum, TimelineStatusEnum } from "../../types";
import { getOrders } from "../../api/getOrders";
import { mockOrders } from "../../mock/mockOrders";
import userEvent from "@testing-library/user-event";

function renderOrderDetails(orderProps = {}) {
  return render(
    <OrderTimelineButtons
      canCancel={true}
      canComplete={true}
      canAddStageForm={true}
      onCancel={jest.fn()}
      onComplete={jest.fn()}
      onAddStageForm={jest.fn()}
      {...orderProps}
    />
  );
}

describe("OrderTimelineButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders without crashing with all buttons enabled", () => {
    renderOrderDetails();
    expect(screen.getByTestId("order-timeline-buttons")).toBeInTheDocument();
    expect(screen.getByTestId("button-cancel")).not.toBeDisabled();
    expect(screen.getByTestId("button-complete")).not.toBeDisabled();
    expect(screen.getByTestId("button-add-stage")).not.toBeDisabled();
  });

  it("does not render when all permissions are false", () => {
    const { container } = renderOrderDetails({
      canCancel: false,
      canComplete: false,
      canAddStageForm: false,
    });
    expect(container).toBeEmptyDOMElement();
  });
  it("calls the correct handlers when buttons are clicked", async () => {
    const onCancel = jest.fn();
    const onComplete = jest.fn();
    const onAddStageForm = jest.fn();

    renderOrderDetails({
      onCancel,
      onComplete,
      onAddStageForm,
    });

    userEvent.click(screen.getByTestId("button-cancel"));
    expect(onCancel).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId("button-complete"));
    expect(onComplete).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId("button-add-stage"));
    expect(onAddStageForm).toHaveBeenCalledTimes(1);
  });
});
