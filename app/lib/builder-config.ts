import type { Field, FieldType, WidthOption } from "../components/form/types";

export type LayoutMode = "1-col" | "2-col";
export type PreviewMode = "desktop" | "tablet" | "mobile";

export type BuilderConfig = {
  fields: Field[];
  styling: {
    layout: LayoutMode;
    tabletLayout?: LayoutMode;
    mobileLayout?: LayoutMode;
    primaryColor: string;
    surfaceColor: string;
    borderColor: string;
    textColor: string;
    labelColor: string;
    placeholderColor: string;
    radius: number;
    buttonStyle: "solid" | "outline";
  };
  integrations: {
    otpEnabled: boolean;
    sheetsEnabled: boolean;
    webhookEnabled: boolean;
    redirectEnabled: boolean;
  };
  formSettings: {
    pageName: string;
    successMessage: string;
    buttonText: string;
  };
};

export type ControlPanel =
  | "add"
  | "edit"
  | "integrations"
  | "form"
  | "style"
  | null;

export const FIELD_LIBRARY: Array<{
  type: FieldType;
  label: string;
  description: string;
}> = [
  { type: "text", label: "Text Input", description: "Names, company, short answers" },
  { type: "textarea", label: "Textarea", description: "Long-form responses and notes" },
  { type: "email", label: "Email", description: "Built-in email validation" },
  { type: "phone", label: "Phone", description: "Phone-first lead capture" },
  { type: "select", label: "Dropdown", description: "Compact choice lists" },
  { type: "radio", label: "Radio", description: "Single-choice selection" },
  { type: "checkbox", label: "Checkbox", description: "Consent and opt-ins" },
];

const INITIAL_FIELDS: Field[] = [
  {
    id: "field-first-name",
    type: "text",
    label: "First Name",
    placeholder: "Enter first name",
    required: true,
    isLabelVisible: true,
    isRequiredVisible: true,
    isHelperTextVisible: true,
    width: "half",
    validationMessage: "First name is required.",
  },
  {
    id: "field-email",
    type: "email",
    label: "Email",
    placeholder: "Enter your work email",
    required: true,
    isLabelVisible: true,
    isRequiredVisible: true,
    isHelperTextVisible: true,
    width: "half",
    validationMessage: "Please enter a valid email address.",
  },
  {
    id: "field-phone",
    type: "phone",
    label: "Phone Number",
    placeholder: "Enter phone number",
    required: false,
    isLabelVisible: true,
    isRequiredVisible: true,
    isHelperTextVisible: true,
    width: "half",
    validationMessage: "Please enter a valid phone number.",
  },
  {
    id: "field-program",
    type: "select",
    label: "Program",
    required: true,
    isLabelVisible: true,
    isRequiredVisible: true,
    isHelperTextVisible: true,
    width: "half",
    options: ["Growth Sprint", "Performance Creative", "Product Advisory"],
    validationMessage: "Please select a program.",
  },
];

export const DEFAULT_CONFIG: BuilderConfig = {
  fields: INITIAL_FIELDS,
  styling: {
    layout: "2-col",
    primaryColor: "#0055FF",
    surfaceColor: "#FFFFFF",
    borderColor: "#000000",
    textColor: "#000000",
    labelColor: "#000000",
    placeholderColor: "#000000",
    radius: 20,
    buttonStyle: "solid",
  },
  integrations: {
    otpEnabled: true,
    sheetsEnabled: true,
    webhookEnabled: false,
    redirectEnabled: true,
  },
  formSettings: {
    pageName: "Lead Capture Form",
    successMessage: "Thanks, your submission has been received.",
    buttonText: "Submit Application",
  },
};

function titleForType(type: FieldType) {
  switch (type) {
    case "text":
      return "Text Field";
    case "email":
      return "Email Field";
    case "textarea":
      return "Textarea Field";
    case "phone":
      return "Phone Field";
    case "select":
      return "Dropdown Field";
    case "radio":
      return "Radio Group";
    case "checkbox":
      return "Checkbox";
  }
}

export function defaultField(type: FieldType, index: number): Field {
  const baseId = `field-${type}-${index + 1}`;

  if (type === "select") {
    return {
      id: baseId,
      type,
      label: "Select Option",
      required: false,
      isLabelVisible: true,
      isRequiredVisible: true,
      isHelperTextVisible: true,
      width: "full",
      options: ["Option 1", "Option 2", "Option 3"],
      validationMessage: "Please choose an option.",
    };
  }

  if (type === "radio") {
    return {
      id: baseId,
      type,
      label: "Choose One",
      required: false,
      isLabelVisible: true,
      isRequiredVisible: true,
      isHelperTextVisible: true,
      width: "full",
      options: ["Yes", "No"],
      validationMessage: "Please select one option.",
    };
  }

  if (type === "checkbox") {
    return {
      id: baseId,
      type,
      label: "I agree to the terms",
      required: true,
      isLabelVisible: true,
      isRequiredVisible: true,
      isHelperTextVisible: true,
      width: "full",
      validationMessage: "Please accept before continuing.",
    };
  }

  return {
    id: baseId,
    type,
    label: titleForType(type),
    placeholder: `Enter ${titleForType(type).toLowerCase()}`,
    required: false,
    isLabelVisible: true,
    isRequiredVisible: true,
    isHelperTextVisible: true,
    width: "full",
    validationMessage: `${titleForType(type)} is invalid.`,
  };
}

export function fieldWidthClass(width: WidthOption, layout: LayoutMode) {
  if (layout === "1-col") {
    return "builder-field--full";
  }

  switch (width) {
    case "half":
      return "builder-field--half";
    case "third":
      return "builder-field--third";
    default:
      return "builder-field--full";
  }
}

export function getFieldWidthForPreview(field: Field, previewMode: PreviewMode) {
  if (previewMode === "tablet") {
    return field.tabletWidth ?? field.width;
  }

  if (previewMode === "mobile") {
    return field.mobileWidth ?? field.width;
  }

  return field.width;
}

export function getLayoutForPreview(
  styling: BuilderConfig["styling"],
  previewMode: PreviewMode,
) {
  if (previewMode === "tablet") {
    return styling.tabletLayout ?? styling.layout;
  }

  if (previewMode === "mobile") {
    return styling.mobileLayout ?? styling.layout;
  }

  return styling.layout;
}
