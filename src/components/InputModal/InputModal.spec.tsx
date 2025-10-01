import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputModal from "./index";
import { TimelineStatusEnum } from "../../types";
import { FieldProps } from "./types";

const mockOnClose = jest.fn();
const mockOnSave = jest.fn();
const mockOnChange = jest.fn();

const mockFields: FieldProps[] = [
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
    placeholder: "Enter any extra description",
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
];

function TestHost({ isOpen = false }: { isOpen?: boolean }) {
  const [values, setValues] = useState<Record<string, unknown>>({
    title: "",
    description: "",
    extraDescription: "",
    status: "",
  });
  return (
    <InputModal
      isOpen={isOpen}
      title="Add new stage"
      primaryLabel="Save"
      secondaryLabel="Cancel"
      fields={mockFields}
      values={values}
      onChange={(name, value) => {
        mockOnChange(name, value);
        setValues((prev) => ({ ...prev, [name as string]: value }));
      }}
      onClose={mockOnClose}
      onSave={mockOnSave}
    />
  );
}
describe("InputModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders correctly when open", () => {
    render(<TestHost isOpen />);
    expect(screen.getByText("Add new stage")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByLabelText("Title*")).toBeInTheDocument();
    expect(screen.getByLabelText("Description*")).toBeInTheDocument();
    expect(screen.getByLabelText("Extra Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Status*")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<TestHost />);
    expect(screen.queryByText("Add new stage")).not.toBeInTheDocument();
  });
  it("calls onClose when Cancel button is clicked", async () => {
    render(<TestHost isOpen />);
    const user = userEvent;
    const cancelButton = screen.getByText("Cancel");
    user.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onSave only when required fields are completed", async () => {
    render(<TestHost isOpen />);
    const user = userEvent;
    const saveButton = screen.getByText("Save");

    user.click(saveButton);
    expect(mockOnSave).not.toHaveBeenCalled();

    user.type(screen.getByLabelText("Title*"), "Test Title");
    user.type(screen.getByLabelText("Description*"), "Test Description");
    user.selectOptions(
      screen.getByLabelText("Status*"),
      TimelineStatusEnum.Info
    );

    user.click(saveButton);
    expect(mockOnSave).toHaveBeenCalledTimes(1);
  });
  it("calls onChange when input fields are changed", async () => {
    render(<TestHost isOpen />);
    const user = userEvent;
    const titleInput = screen.getByLabelText("Title*") as HTMLInputElement;
    user.type(titleInput, "New Title");
    expect(titleInput.value).toBe("New Title");
    const descriptionInput = screen.getByLabelText(
      "Description*"
    ) as HTMLTextAreaElement;
    user.type(descriptionInput, "New Description");
    expect(descriptionInput.value).toBe("New Description");
    const extraDescriptionInput = screen.getByLabelText(
      "Extra Description"
    ) as HTMLTextAreaElement;
    user.type(extraDescriptionInput, "Some extra info");
    expect(extraDescriptionInput.value).toBe("Some extra info");
    const statusSelect = screen.getByLabelText("Status*") as HTMLSelectElement;
    user.selectOptions(statusSelect, TimelineStatusEnum.Info);
    expect(statusSelect.value).toBe(TimelineStatusEnum.Info);
  });
});
