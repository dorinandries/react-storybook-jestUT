import { expect, userEvent, waitFor, within } from "storybook/test";

import { TimelineStatusEnum } from "../../types";
import InputModal from "./";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";

const meta: Meta<typeof InputModal> = {
  title: "PRJ_Marina/InputModal",
  component: InputModal,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [values, setValues] = useState<Record<string, unknown>>({
      title: "",
      description: "",
      extraDescription: "",
      status: "",
    });
    return (
      <InputModal
        {...args}
        values={values}
        onChange={(name, value) =>
          setValues((prev) => ({ ...prev, [name as string]: value }))
        }
      />
    );
  },
};

Default.args = {
  isOpen: true,
  title: "Add new stage",
  primaryLabel: "Save",
  secondaryLabel: "Cancel",
  onClose: () => {
    alert("Close clicked");
  },
  onSave: () => {
    alert("Save clicked");
  },
  fields: [
    {
      type: "text",
      label: "Title",
      value: "",
      name: "title",
      required: true,
      placeholder: "Title",
    },
    {
      type: "textarea",
      label: "Description",
      value: "",
      name: "description",
      required: true,
      placeholder: "Enter your description",
    },
    {
      type: "textarea",
      label: "Extra Description",
      value: "",
      name: "extraDescription",
      required: false,
    },
    {
      type: "select",
      label: "Status",
      value: "",
      options: [
        { label: "Pending", value: TimelineStatusEnum.Pending },
        { label: "Info", value: TimelineStatusEnum.Info },
        { label: "Completed", value: TimelineStatusEnum.Completed },
        { label: "Error", value: TimelineStatusEnum.Error },
      ],
      name: "status",
      required: true,
    },
  ],
};
