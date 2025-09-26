import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { expect, userEvent, waitFor, within } from "storybook/test";

import App from "./App";


const meta: Meta<typeof App> = {
  title: "PRJ_Marina/App",
  component: App,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpenFirstOrder: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const grid = await canvas.findByLabelText(/orders grid/i);
    const gridScope = within(grid);

    const cardButtons = await gridScope.findAllByRole("button", {
      name: /open order/i,
    });
    await userEvent.click(cardButtons[0]);

    await waitFor(() => {
      expect(canvas.getByText(/status timeline/i)).toBeInTheDocument();
    });
  },
};