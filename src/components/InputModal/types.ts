// src/components/InputModal/types.ts

export type InputModalProps = {
  isOpen: boolean;
  title: string;
  primaryLabel: string;
  secondaryLabel: string;
  fields: FieldProps[];
  values: Record<string, unknown>; // controlled values
  additionalFieldsForData?: Record<string, unknown>; 
  onClose: () => void;
  onSave: (data: any) => void;
};


export type Options = {
    label: string;
    value: string | number;
}

export type FieldProps = {
    type: "text"|"select"|"textarea";
    label: string;
    value?: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    options?: Options[];
    rows?: number;
    cols?: number;
    helpText?: string;
}