// src/mock/mockOrders.ts
import { Order, OrderStatusEnum, TimelineStatusEnum } from "../types";

export const mockOrders: Order[] = [
  {
    idOrder: "ORD-2024-0919-001",
    user: {
      name: "Jane Cooper",
      email: "jane.cooper@example.com",
      address: "221B Baker Street, London NW1 6XE",
      phone: "+44 20 7946 0958",
    },
    createdAt: new Date(2024, 8, 19, 9, 36).toISOString(),
    stages: [
      {
        id: 0,
        title: "Order created",
        description: "Order successfully created by customer",
        date: "Fri Sep 19",
        time: "09:36",
        status: TimelineStatusEnum.Completed,
      },
      {
        id: 1,
        title: "Order validated",
        description: "Merchant validated order",
        date: "Fri Sep 19",
        time: "10:00",
        status: TimelineStatusEnum.Completed,
      },
      {
        id: 2,
        title: "Order waiting to be picked up",
        description:
          "Order has been packed and is ready to be picked up by the delivery team",
        date: "Fri Sep 19",
        time: "10:10",
        status: TimelineStatusEnum.Pending,
        extraDescription:
          "Heads up: we're waiting for the courier to pick up your package. High order volume may extend delivery time. We'll update you once it's collected.",
      },
      {
        id: 3,
        title: "Order picked up by courier",
        description: "Courier collected the package",
        date: "Mon Sep 22",
        time: "22:45",
        status: TimelineStatusEnum.Info,
      },
      // {
      //   title: "Order refused",
      //   description: "Delivery could not be completed",
      //   date: "Fri Sep 26",
      //   time: "18:40",
      //   status: TimelineStatusEnum.Error,
      //   extraDescription: "Order refused by the customer",
      // },
    ],
    orderStatus: OrderStatusEnum.Preparing,
  },
  {
    idOrder: "ORD-2025-0125-001",
    user: {
      name: "Alexander Smith",
      email: "alexander.smith@example.com",
      address: "310 Regent Street, London W1B 3HH",
      phone: "+44 20 8556 3920",
    },
    createdAt: new Date(2025, 0, 25, 19, 21).toISOString(),
    stages: [
      {
        id: 0,
        title: "Order created",
        description: "Order successfully created by customer",
        date: "Mon Jan 25",
        time: "19:21",
        status: TimelineStatusEnum.Completed,
      },
    ],
    orderStatus: OrderStatusEnum.Preparing,
  },
];
