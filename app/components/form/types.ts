import type { ComponentType } from "react";

export type FieldType = "text" | "textarea" | "email" | "phone" | "select" | "radio" | "checkbox";
export type WidthOption = "full" | "half" | "third";

export type Field = {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  isLabelVisible?: boolean;
  isRequiredVisible?: boolean;
  isHelperTextVisible?: boolean;
  width: WidthOption;
  tabletWidth?: WidthOption;
  mobileWidth?: WidthOption;
  options?: string[];
  validationMessage?: string;
};

export type FormFieldComponentProps = {
  field: Field;
};

export type FormFieldComponent = ComponentType<FormFieldComponentProps>;
