// src/components/OrderDetails/OrderDetails.spec.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OrderDetails from "./index";
import { OrderStatusEnum, TimelineStatusEnum, type Order } from "../../types";
import { formatDateTime } from "../../utilities";

import { getOrders } from "../../api/getOrders";
import { mockOrders } from "../../mock/mockOrders";

jest.mock("../api/getOrders", () => ({
  __esModule: true,
  getOrders: jest.fn(), // named export
}));

const mockedGetOrders = getOrders as unknown as jest.MockedFunction<
  () => Promise<Order[]>
>;

mockedGetOrders.mockResolvedValue([
  ...mockOrders,
  {
    idOrder: "ORD-2010-0125-001",
    user: {
      name: "Alexander Smith",
      email: "alexander.smith@example.com",
      address: "310 Regent Street, London W1B 3HH",
      phone: "+44 20 7946 0958",
    },
    createdAt: new Date(2010, 0, 25, 19, 21).toISOString(),
    stages: [
      {
        title: "Order created",
        description: "Order successfully created by customer",
        date: "Mon Jan 6",
        time: "19:21",
        status: TimelineStatusEnum.Completed,
      },
    ],
    orderStatus: OrderStatusEnum.Preparing,
  } as Order,
]);

