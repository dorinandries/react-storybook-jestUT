// src/components/OrderCard/index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { expect, userEvent, waitFor, within } from "storybook/test";

import OrderCard from "./index";

import { OrderStatusEnum, TimelineStatusEnum } from "../../types";

const meta: Meta<typeof OrderCard> = {
  title: "PRJ_Marina/OrderCard",
  component: OrderCard,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
const type = OrderStatusEnum.Canceled;

Default.args = {
  order: {
    idOrder: "1",
    user: {
      name: "John Doe",
      email: "test@test.com",
      address: "123 Main St, City, Country",
      phone: "123-456-7890",
    },
    createdAt: new Date(2024, 8, 19, 9, 36).toISOString(),
    stages: [
      {
        title: "Order created",
        description: "Order successfully created by customer",
        date: "Fri Sep 19",
        time: "09:36",
        status: TimelineStatusEnum.Completed,
      },
      {
        title: "Order validated",
        description: "Order validated by the merchant",
        date: "Fri Sep 22",
        time: "10:22",
        status: TimelineStatusEnum.Completed,
      },
    ],
    orderStatus: OrderStatusEnum.Preparing,
  },
};
