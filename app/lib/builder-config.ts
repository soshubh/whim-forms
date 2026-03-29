import type { FormActionButton } from "../components/form/button/types";
import type { Field, FieldType, WidthOption } from "../components/form/types";
import { getDefaultButtonIcons } from "./button-icons";

export type LayoutMode = "1-col" | "2-col";
export type PreviewMode = "desktop" | "tablet" | "mobile";
export type PaddingMode = "all" | "individual";
export type StylingValues = {
  layout: LayoutMode;
  formPaddingMode: PaddingMode;
  formPadding: number;
  formPaddingTop: number;
  formPaddingRight: number;
  formPaddingBottom: number;
  formPaddingLeft: number;
  inputPaddingMode: PaddingMode;
  inputPadding: number;
  inputPaddingTop: number;
  inputPaddingRight: number;
  inputPaddingBottom: number;
  inputPaddingLeft: number;
  buttonPaddingMode: PaddingMode;
  buttonPadding: number;
  buttonPaddingTop: number;
  buttonPaddingRight: number;
  buttonPaddingBottom: number;
  buttonPaddingLeft: number;
  sectionGap: number;
  fieldGap: number;
  primaryColor: string;
  surfaceColor: string;
  borderColor: string;
  textColor: string;
  labelColor: string;
  placeholderColor: string;
  sectionSurfaceColor: string;
  sectionBorderColor: string;
  sectionTitleColor: string;
  sectionBodyColor: string;
  sectionBorderWidth: number;
  fieldSurfaceColor: string;
  fieldBorderColor: string;
  fieldTextColor: string;
  fieldLabelColor: string;
  fieldHelperColor: string;
  fieldPlaceholderColor: string;
  fieldFocusColor: string;
  fieldBorderWidth: number;
  fieldFocusWidth: number;
  buttonBorderColor: string;
  buttonTextColor: string;
  titleSize: number;
  titleWeight: number;
  bodySize: number;
  bodyWeight: number;
  labelSize: number;
  labelWeight: number;
  helperSize: number;
  helperWeight: number;
  inputTextSize: number;
  inputTextWeight: number;
  buttonTextSize: number;
  buttonTextWeight: number;
  radius: number;
  sectionRadius: number;
  fieldRadius: number;
  buttonRadius: number;
  buttonBorderWidth: number;
  buttonStyle: "solid" | "outline";
  showHeading: boolean;
  showSubtext: boolean;
};
export type BuilderStyling = StylingValues & {
  tabletOverrides?: Partial<StylingValues>;
  mobileOverrides?: Partial<StylingValues>;
};

function getDefaultPlaceholderForType(type: FieldType) {
  if (type === "select") {
    return "Select an option";
  }

  if (type === "checkbox" || type === "radio") {
    return undefined;
  }

  return `Enter ${titleForType(type).toLowerCase()}`;
}

export type BuilderConfig = {
  fields: Field[];
  buttons: FormActionButton[];
  styling: BuilderStyling;
  integrations: {
    otpEnabled: boolean;
    sheetsEnabled: boolean;
    webhookEnabled: boolean;
    redirectEnabled: boolean;
  };
  formSettings: {
    pageName: string;
    successMessage: string;
  };
};

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
    placeholder: getDefaultPlaceholderForType("select"),
    required: true,
    isLabelVisible: true,
    isRequiredVisible: true,
    isHelperTextVisible: true,
    width: "half",
    options: ["Growth Sprint", "Performance Creative", "Product Advisory"],
    validationMessage: "Please select a program.",
  },
];

const INITIAL_BUTTONS: FormActionButton[] = [
  {
    id: "button-submit-primary",
    type: "submit",
    label: "Submit Application",
    width: "full",
    isLabelVisible: true,
    isLeftIconVisible: false,
    isRightIconVisible: false,
    leftIcon: getDefaultButtonIcons("submit").left,
    rightIcon: getDefaultButtonIcons("submit").right,
  },
];

export const DEFAULT_CONFIG: BuilderConfig = {
  fields: INITIAL_FIELDS,
  buttons: INITIAL_BUTTONS,
  styling: {
    layout: "2-col",
    formPaddingMode: "all",
    formPadding: 28,
    formPaddingTop: 28,
    formPaddingRight: 28,
    formPaddingBottom: 28,
    formPaddingLeft: 28,
    inputPaddingMode: "all",
    inputPadding: 12,
    inputPaddingTop: 12,
    inputPaddingRight: 12,
    inputPaddingBottom: 12,
    inputPaddingLeft: 12,
    buttonPaddingMode: "all",
    buttonPadding: 12,
    buttonPaddingTop: 12,
    buttonPaddingRight: 12,
    buttonPaddingBottom: 12,
    buttonPaddingLeft: 12,
    sectionGap: 18,
    fieldGap: 14,
    primaryColor: "#0055FF",
    surfaceColor: "#222222",
    borderColor: "#2E2E2E",
    textColor: "#F0F0F0",
    labelColor: "#888888",
    placeholderColor: "#555555",
    sectionSurfaceColor: "#222222",
    sectionBorderColor: "#2E2E2E",
    sectionTitleColor: "#F0F0F0",
    sectionBodyColor: "#888888",
    sectionBorderWidth: 1,
    fieldSurfaceColor: "#222222",
    fieldBorderColor: "#2E2E2E",
    fieldTextColor: "#F0F0F0",
    fieldLabelColor: "#888888",
    fieldHelperColor: "#888888",
    fieldPlaceholderColor: "#555555",
    fieldFocusColor: "#0055FF",
    fieldBorderWidth: 1,
    fieldFocusWidth: 1,
    buttonBorderColor: "#0055FF",
    buttonTextColor: "#FFFFFF",
    titleSize: 18,
    titleWeight: 600,
    bodySize: 12,
    bodyWeight: 400,
    labelSize: 12,
    labelWeight: 600,
    helperSize: 12,
    helperWeight: 400,
    inputTextSize: 16,
    inputTextWeight: 400,
    buttonTextSize: 16,
    buttonTextWeight: 600,
    radius: 10,
    sectionRadius: 14,
    fieldRadius: 10,
    buttonRadius: 10,
    buttonBorderWidth: 1,
    buttonStyle: "solid",
    showHeading: false,
    showSubtext: false,
  },
  integrations: {
    otpEnabled: true,
    sheetsEnabled: true,
    webhookEnabled: false,
    redirectEnabled: true,
  },
  formSettings: {
    pageName: "Submit Application",
    successMessage: "Fill in the details below to get started.",
  },
};

export function normalizeBuilderConfig(config: BuilderConfig): BuilderConfig {
  const rawStyling = config.styling ?? {};
  const legacyFormSettings = (config.formSettings ?? {}) as BuilderConfig["formSettings"] & {
    showHeading?: boolean;
    showSubtext?: boolean;
  };
  const legacyStyling = rawStyling as typeof rawStyling & {
    controlPaddingX?: number;
    controlPaddingY?: number;
    surfaceColor?: string;
    borderColor?: string;
    textColor?: string;
    labelColor?: string;
    placeholderColor?: string;
    primaryColor?: string;
    radius?: number;
    buttonBorderColor?: string;
    tabletLayout?: LayoutMode;
    mobileLayout?: LayoutMode;
  };
  const nextStyling = {
    ...DEFAULT_CONFIG.styling,
    ...rawStyling,
  };
  delete nextStyling.tabletOverrides;
  delete nextStyling.mobileOverrides;
  const hasExplicitInputPadding =
    "inputPaddingMode" in rawStyling ||
    "inputPadding" in rawStyling ||
    "inputPaddingTop" in rawStyling ||
    "inputPaddingRight" in rawStyling ||
    "inputPaddingBottom" in rawStyling ||
    "inputPaddingLeft" in rawStyling;
  const hasExplicitButtonPadding =
    "buttonPaddingMode" in rawStyling ||
    "buttonPadding" in rawStyling ||
    "buttonPaddingTop" in rawStyling ||
    "buttonPaddingRight" in rawStyling ||
    "buttonPaddingBottom" in rawStyling ||
    "buttonPaddingLeft" in rawStyling;
  const hasExplicitSectionColors =
    "sectionSurfaceColor" in rawStyling ||
    "sectionBorderColor" in rawStyling ||
    "sectionTitleColor" in rawStyling ||
    "sectionBodyColor" in rawStyling;
  const hasExplicitFieldColors =
    "fieldSurfaceColor" in rawStyling ||
    "fieldBorderColor" in rawStyling ||
    "fieldTextColor" in rawStyling ||
    "fieldLabelColor" in rawStyling ||
    "fieldHelperColor" in rawStyling ||
    "fieldPlaceholderColor" in rawStyling ||
    "fieldFocusColor" in rawStyling;
  const hasExplicitButtonColors =
    "buttonBorderColor" in rawStyling || "buttonTextColor" in rawStyling;
  const hasExplicitRadii =
    "sectionRadius" in rawStyling || "fieldRadius" in rawStyling || "buttonRadius" in rawStyling;
  const legacyControlPaddingX =
    "controlPaddingX" in legacyStyling && typeof legacyStyling.controlPaddingX === "number"
      ? legacyStyling.controlPaddingX
      : undefined;
  const legacyControlPaddingY =
    "controlPaddingY" in legacyStyling && typeof legacyStyling.controlPaddingY === "number"
      ? legacyStyling.controlPaddingY
      : undefined;

  if (!hasExplicitInputPadding && (legacyControlPaddingX !== undefined || legacyControlPaddingY !== undefined)) {
    nextStyling.inputPaddingMode = "individual";
    nextStyling.inputPadding = legacyControlPaddingX ?? DEFAULT_CONFIG.styling.inputPadding;
    nextStyling.inputPaddingTop = legacyControlPaddingY ?? DEFAULT_CONFIG.styling.inputPaddingTop;
    nextStyling.inputPaddingRight = legacyControlPaddingX ?? DEFAULT_CONFIG.styling.inputPaddingRight;
    nextStyling.inputPaddingBottom =
      legacyControlPaddingY ?? DEFAULT_CONFIG.styling.inputPaddingBottom;
    nextStyling.inputPaddingLeft = legacyControlPaddingX ?? DEFAULT_CONFIG.styling.inputPaddingLeft;
  }

  if (!hasExplicitSectionColors) {
    nextStyling.sectionSurfaceColor =
      legacyStyling.surfaceColor ?? DEFAULT_CONFIG.styling.sectionSurfaceColor;
    nextStyling.sectionBorderColor =
      legacyStyling.borderColor ?? DEFAULT_CONFIG.styling.sectionBorderColor;
    nextStyling.sectionTitleColor =
      legacyStyling.textColor ?? DEFAULT_CONFIG.styling.sectionTitleColor;
    nextStyling.sectionBodyColor =
      legacyStyling.labelColor ?? DEFAULT_CONFIG.styling.sectionBodyColor;
  }

  if (!hasExplicitFieldColors) {
    nextStyling.fieldSurfaceColor =
      legacyStyling.surfaceColor ?? DEFAULT_CONFIG.styling.fieldSurfaceColor;
    nextStyling.fieldBorderColor =
      legacyStyling.borderColor ?? DEFAULT_CONFIG.styling.fieldBorderColor;
    nextStyling.fieldTextColor =
      legacyStyling.textColor ?? DEFAULT_CONFIG.styling.fieldTextColor;
    nextStyling.fieldLabelColor =
      legacyStyling.labelColor ?? DEFAULT_CONFIG.styling.fieldLabelColor;
    nextStyling.fieldHelperColor =
      legacyStyling.labelColor ?? DEFAULT_CONFIG.styling.fieldHelperColor;
    nextStyling.fieldPlaceholderColor =
      legacyStyling.placeholderColor ?? DEFAULT_CONFIG.styling.fieldPlaceholderColor;
    nextStyling.fieldFocusColor =
      legacyStyling.primaryColor ?? DEFAULT_CONFIG.styling.fieldFocusColor;
  }

  if (!hasExplicitButtonColors) {
    nextStyling.buttonBorderColor =
      legacyStyling.primaryColor ?? DEFAULT_CONFIG.styling.buttonBorderColor;
  }

  if (!hasExplicitRadii) {
    const legacyRadius = legacyStyling.radius ?? DEFAULT_CONFIG.styling.fieldRadius;
    nextStyling.sectionRadius = legacyRadius + 4;
    nextStyling.fieldRadius = legacyRadius;
    nextStyling.buttonRadius = legacyRadius;
  }

  if (!hasExplicitButtonPadding) {
    const inputPadding = getInputPaddingValues(nextStyling);

    nextStyling.buttonPaddingMode = "all";
    nextStyling.buttonPadding = inputPadding.right;
    nextStyling.buttonPaddingTop = inputPadding.top;
    nextStyling.buttonPaddingRight = inputPadding.right;
    nextStyling.buttonPaddingBottom = inputPadding.bottom;
    nextStyling.buttonPaddingLeft = inputPadding.left;
  }

  nextStyling.showHeading =
    typeof rawStyling.showHeading === "boolean"
      ? rawStyling.showHeading
      : legacyFormSettings.showHeading ?? DEFAULT_CONFIG.styling.showHeading;
  nextStyling.showSubtext =
    typeof rawStyling.showSubtext === "boolean"
      ? rawStyling.showSubtext
      : legacyFormSettings.showSubtext ?? DEFAULT_CONFIG.styling.showSubtext;

  const normalizeOverride = (override: Partial<BuilderStyling> | undefined, fallbackLayout?: LayoutMode) => {
    if (!override && fallbackLayout == null) {
      return undefined;
    }

    return {
      ...(override ?? {}),
      ...(fallbackLayout ? { layout: fallbackLayout } : {}),
    } satisfies Partial<StylingValues>;
  };

  const tabletOverrides = normalizeOverride(rawStyling.tabletOverrides, legacyStyling.tabletLayout);
  const mobileOverrides = normalizeOverride(rawStyling.mobileOverrides, legacyStyling.mobileLayout);

  return {
    ...DEFAULT_CONFIG,
    ...config,
    fields: (config.fields ?? DEFAULT_CONFIG.fields).map((field) =>
      field.type === "select" && field.placeholder == null
        ? { ...field, placeholder: getDefaultPlaceholderForType("select") }
        : field,
    ),
    buttons: config.buttons ?? DEFAULT_CONFIG.buttons,
    styling: {
      ...nextStyling,
      ...(tabletOverrides ? { tabletOverrides } : {}),
      ...(mobileOverrides ? { mobileOverrides } : {}),
    },
    integrations: {
      ...DEFAULT_CONFIG.integrations,
      ...config.integrations,
    },
    formSettings: {
      ...DEFAULT_CONFIG.formSettings,
      ...config.formSettings,
    },
  };
}

export function resolveStylingForPreview(
  styling: BuilderStyling,
  previewMode: PreviewMode,
): StylingValues {
  if (previewMode === "tablet") {
    return {
      ...styling,
      ...(styling.tabletOverrides ?? {}),
    };
  }

  if (previewMode === "mobile") {
    return {
      ...styling,
      ...(styling.mobileOverrides ?? {}),
    };
  }

  return styling;
}

export function updateStylingForPreview(
  styling: BuilderStyling,
  previewMode: PreviewMode,
  patch: Partial<StylingValues>,
): BuilderStyling {
  if (previewMode === "tablet") {
    return {
      ...styling,
      tabletOverrides: {
        ...(styling.tabletOverrides ?? {}),
        ...patch,
      },
    };
  }

  if (previewMode === "mobile") {
    return {
      ...styling,
      mobileOverrides: {
        ...(styling.mobileOverrides ?? {}),
        ...patch,
      },
    };
  }

  return {
    ...styling,
    ...patch,
  };
}

export function getFormPaddingValue(
  styling: Pick<
    BuilderStyling,
    | "formPaddingMode"
    | "formPadding"
    | "formPaddingTop"
    | "formPaddingRight"
    | "formPaddingBottom"
    | "formPaddingLeft"
  >,
) {
  if (styling.formPaddingMode === "individual") {
    return `${styling.formPaddingTop}px ${styling.formPaddingRight}px ${styling.formPaddingBottom}px ${styling.formPaddingLeft}px`;
  }

  return `${styling.formPadding}px`;
}

export function getInputPaddingValues(
  styling: Pick<
    BuilderStyling,
    | "inputPaddingMode"
    | "inputPadding"
    | "inputPaddingTop"
    | "inputPaddingRight"
    | "inputPaddingBottom"
    | "inputPaddingLeft"
  >,
) {
  if (styling.inputPaddingMode === "individual") {
    return {
      top: styling.inputPaddingTop,
      right: styling.inputPaddingRight,
      bottom: styling.inputPaddingBottom,
      left: styling.inputPaddingLeft,
    };
  }

  return {
    top: styling.inputPadding,
    right: styling.inputPadding,
    bottom: styling.inputPadding,
    left: styling.inputPadding,
  };
}

export function getButtonPaddingValues(
  styling: Pick<
    BuilderStyling,
    | "buttonPaddingMode"
    | "buttonPadding"
    | "buttonPaddingTop"
    | "buttonPaddingRight"
    | "buttonPaddingBottom"
    | "buttonPaddingLeft"
  >,
) {
  if (styling.buttonPaddingMode === "individual") {
    return {
      top: styling.buttonPaddingTop,
      right: styling.buttonPaddingRight,
      bottom: styling.buttonPaddingBottom,
      left: styling.buttonPaddingLeft,
    };
  }

  return {
    top: styling.buttonPadding,
    right: styling.buttonPadding,
    bottom: styling.buttonPadding,
    left: styling.buttonPadding,
  };
}

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
      placeholder: getDefaultPlaceholderForType(type),
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
      label: "Choose Options",
      required: false,
      isLabelVisible: true,
      isRequiredVisible: true,
      isHelperTextVisible: true,
      width: "full",
      options: ["Option 1", "Option 2", "Option 3"],
      validationMessage: "Please select at least one option.",
    };
  }

  return {
    id: baseId,
    type,
    label: titleForType(type),
    placeholder: getDefaultPlaceholderForType(type),
    required: false,
    isLabelVisible: true,
    isRequiredVisible: true,
    isHelperTextVisible: true,
    width: "full",
    validationMessage: `${titleForType(type)} is invalid.`,
  };
}

export function defaultButton(
  index: number,
): FormActionButton {
  const baseId = `button-${index + 1}`;
  const defaultIcons = getDefaultButtonIcons("submit");

  return {
    id: baseId,
    type: "submit",
    label: "Button",
    width: "full",
    isLabelVisible: true,
    isLeftIconVisible: false,
    isRightIconVisible: false,
    leftIcon: defaultIcons.left,
    rightIcon: defaultIcons.right,
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
  return resolveStylingForPreview(styling, previewMode).layout;
}

export function getButtonWidthForPreview(
  button: FormActionButton,
  previewMode: PreviewMode,
) {
  if (previewMode === "tablet") {
    return button.tabletWidth ?? button.width;
  }

  if (previewMode === "mobile") {
    return button.mobileWidth ?? button.width;
  }

  return button.width;
}
