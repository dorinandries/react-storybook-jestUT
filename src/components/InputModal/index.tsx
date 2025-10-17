// src/components/InputModal/index.tsx
import React, { useEffect, useState } from "react";
import { FieldProps, InputModalProps } from "./types";
import {
  InputModalContentStyled,
  InputModalButtonStyled,
  InputModalContainerStyled,
  InputModalBodyStyled,
  InputModalTitleStyled,
  LabelStyled,
} from "./styles";
import { TimelineStatusEnum } from "../../types";

type FormData = Record<string, unknown>;

export default function InputModal({
  isOpen,
  title,
  onClose,
  onSave,
  primaryLabel,
  secondaryLabel,
  fields,
  values,
  additionalFieldsForData,
}: InputModalProps) {
  const [formData, setFormData] = useState<FormData>({});

  // Simple initializer that preserves existing edits when possible.
  useEffect(() => {
    setFormData((prev) => {
      const next: FormData = {};
      for (const f of fields) {
        // Use value from "values" prop as default, fallback to previous value, then field default
        let val = values?.[f.name] ?? prev[f.name] ?? (f as any).value;

        // For selects: if empty or not in options, fall back to first option.
        if (f.type === "select") {
          const opts = f.options ?? [];
          const valid = opts.some((o) => o.value === val);
          if (!valid) val = opts[0]?.value ?? "";
        } else {
          // For inputs/textarea: keep controlled value
          if (val === undefined || val === null) val = "";
        }

        next[f.name] = val as unknown;
      }
      return next;
    });
  }, [fields, values]);

  const onChange = (name: string, value: unknown) => {
    // alert(`Changed ${name} to ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSaveClick = () => {
    const myObj = {
      ...formData,
      ...additionalFieldsForData,
    };
    onSave(myObj);
  };
  return (
    <>
      {isOpen && (
        <InputModalContainerStyled>
          <InputModalBodyStyled>
            <InputModalTitleStyled>
              <h3>{title || "Modal"}</h3>
            </InputModalTitleStyled>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // onSave(formData);
                onSaveClick();
              }}
              noValidate={false}
            >
              <InputModalContentStyled>
                {fields.map((field) => (
                  <FormRow
                    key={field.name}
                    field={field}
                    value={formData[field.name]}
                    onChange={onChange}
                  />
                ))}
              </InputModalContentStyled>
              <InputModalButtonStyled>
                <button type="submit">{primaryLabel}</button>

                <button type="button" onClick={onClose}>
                  {secondaryLabel}
                </button>
              </InputModalButtonStyled>
            </form>
          </InputModalBodyStyled>
        </InputModalContainerStyled>
      )}
    </>
  );
}

function FormRow({
  field,
  value,
  onChange,
}: {
  field: FieldProps;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
}) {
  const id = `f_${field.name}`;

  return (
    <LabelStyled htmlFor={id}>
      {field.label && (
        <span>
          {field.label}
          {field.required && <span>*</span>}
        </span>
      )}

      {renderControl(field, value, (v) => onChange(field.name, v))}
    </LabelStyled>
  );
}

function renderControl(
  field: FieldProps,
  value: unknown,
  set: (v: unknown) => void
): React.ReactNode {
  const commonProps = {
    id: `f_${field.name}`,
    name: field.name,
    required: "required" in field ? field.required : undefined,
    placeholder: "placeholder" in field ? field.placeholder : undefined,
  } as const;

  switch (field.type) {
    case "text":
      return (
        <input
          {...commonProps}
          type={field.type}
          required={field.required}
          value={(value as string | undefined) ?? ""}
          onChange={(e) => set(e.target.value)}
          data-testid={`input-${field.name}`}
        />
      );
    case "select": {
      return (
        <select
          {...commonProps}
          value={(value as string | number | undefined) ?? ""}
          onChange={(e) => set(e.target.value)}
          data-testid={`select-${field.name}`}
        >
          <option value="" disabled>
            {field.placeholder ?? "Select..."}
          </option>
          {field?.options?.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    case "textarea": {
      return (
        <textarea
          {...commonProps}
          required={field.required}
          rows={field?.rows ?? 4}
          value={(value as string | undefined) ?? ""}
          onChange={(e) => set(e.target.value)}
          data-testid={`textarea-${field.name}`}
        />
      );
    }

    default:
      // Exhaustive check – helps during dev if you add new types later
      return null;
  }
}
