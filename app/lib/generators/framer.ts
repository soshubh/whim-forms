import {
  resolveStylingForPreview,
  type BuilderConfig,
  type StylingValues,
} from "../builder-config";

function toPascalCase(value: string) {
  return value
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function generateFramerComponent(config: BuilderConfig) {
  const desktopStyling = resolveStylingForPreview(config.styling, "desktop");
  const tabletStyling = resolveStylingForPreview(config.styling, "tablet");
  const mobileStyling = resolveStylingForPreview(config.styling, "mobile");
  const getModeOverride = (modeStyling: StylingValues) =>
    Object.fromEntries(
      Object.entries(modeStyling).filter(
        ([key, value]) => desktopStyling[key as keyof StylingValues] !== value,
      ),
    );
  const stylingOverrides = {
    tablet: getModeOverride(tabletStyling),
    mobile: getModeOverride(mobileStyling),
  };
  const componentName = `${toPascalCase(config.formSettings.pageName) || "Generated"}Form`;
  const fieldsDefinition = JSON.stringify(config.fields, null, 2);
  const buttonsDefinition = JSON.stringify(config.buttons, null, 2);
  const phoneFieldId = config.fields.find((field) => field.type === "phone")?.id ?? "";
  const emailFieldId = config.fields.find((field) => field.type === "email")?.id ?? "";
  const headerMarkup =
    desktopStyling.showHeading || desktopStyling.showSubtext
      ? `
      <div style={{ display: "grid", gap: 4 }}>
        {resolvedProps.showHeading ? (
        <div style={{ color: resolvedProps.sectionTitleColor, fontSize: resolvedProps.titleSize, fontWeight: resolvedProps.titleWeight }}>
          ${JSON.stringify(config.formSettings.pageName)}
        </div>
        ) : null}
        {resolvedProps.showSubtext ? (
        <div style={{ color: resolvedProps.sectionBodyColor, fontSize: resolvedProps.bodySize, fontWeight: resolvedProps.bodyWeight }}>
          ${JSON.stringify(config.formSettings.successMessage)}
        </div>
        ) : null}
      </div>`
      : "";
  const integrationControls = [
    config.integrations.otpEnabled &&
      `otpWebhookUrl: { type: ControlType.String, title: "OTP URL", defaultValue: "" }`,
    config.integrations.sheetsEnabled &&
      `googleSheetsUrl: { type: ControlType.String, title: "Sheets URL", defaultValue: "" }`,
    config.integrations.webhookEnabled &&
      `fullDataWebhookUrl: { type: ControlType.String, title: "Webhook URL", defaultValue: "" }`,
    config.integrations.redirectEnabled &&
      `redirectUrl: { type: ControlType.String, title: "Redirect URL", defaultValue: "" }`,
  ]
    .filter(Boolean)
    .join(",\n  ");
  const googleSheetsSubmission = config.integrations.sheetsEnabled
    ? `
      if (props.googleSheetsUrl) {
        await fetch(props.googleSheetsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }`
    : "";
  const fullDataSubmission = config.integrations.webhookEnabled
    ? `
      if (props.fullDataWebhookUrl) {
        await fetch(props.fullDataWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }`
    : "";
  const otpSubmission = config.integrations.otpEnabled
    ? `
    if (props.otpWebhookUrl) {
      await fetch(props.otpWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: ${phoneFieldId ? `values["${phoneFieldId}"] || ""` : `""`},
          email: ${emailFieldId ? `values["${emailFieldId}"] || ""` : `""`},
        }),
      })
    }`
    : "";
  const redirectSubmission = config.integrations.redirectEnabled
    ? `
    if (props.redirectUrl) {
      window.location.assign(props.redirectUrl)
      return
    }`
    : "";

  const generatedComponents = [
    `function getFormPadding(props) {
  if (props.formPaddingMode === "individual") {
    return \`\${props.formPaddingTop}px \${props.formPaddingRight}px \${props.formPaddingBottom}px \${props.formPaddingLeft}px\`
  }

  return props.formPadding
}

function getInputPadding(props) {
  if (props.inputPaddingMode === "individual") {
    return {
      top: props.inputPaddingTop,
      right: props.inputPaddingRight,
      bottom: props.inputPaddingBottom,
      left: props.inputPaddingLeft,
    }
  }

  return {
    top: props.inputPadding,
    right: props.inputPadding,
    bottom: props.inputPadding,
    left: props.inputPadding,
  }
}

function getButtonPadding(props) {
  if (props.buttonPaddingMode === "individual") {
    return {
      top: props.buttonPaddingTop,
      right: props.buttonPaddingRight,
      bottom: props.buttonPaddingBottom,
      left: props.buttonPaddingLeft,
    }
  }

  return {
    top: props.buttonPadding,
    right: props.buttonPadding,
    bottom: props.buttonPadding,
    left: props.buttonPadding,
  }
}

function getInputSurfaceStyle(props, options = {}) {
  const inputPadding = getInputPadding(props)
  const topPadding = options.isTextarea ? inputPadding.top + 3 : inputPadding.top
  const borderWidth = options.isFocused ? props.fieldFocusWidth : props.fieldBorderWidth

  return {
    position: "relative",
    display: "flex",
    alignItems: options.isTextarea ? "flex-start" : "center",
    width: "100%",
    ...(options.isTextarea ? { minHeight: 132 } : {}),
    padding: \`\${topPadding}px \${inputPadding.right}px \${inputPadding.bottom}px \${inputPadding.left}px\`,
    ...(options.hasTrailing ? { paddingRight: inputPadding.right + 28 } : {}),
    borderRadius: props.fieldRadius,
    border: \`\${borderWidth}px solid \${options.isFocused ? props.fieldFocusColor : props.fieldBorderColor}\`,
    background: props.fieldSurfaceColor,
    color: options.isPlaceholder ? props.fieldPlaceholderColor : props.fieldTextColor,
    boxSizing: "border-box",
  }
}

function getNativeInputStyle(props, options = {}) {
  const inputPadding = getInputPadding(props)
  const topPadding = options.isTextarea ? inputPadding.top + 3 : inputPadding.top

  return {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    padding: \`\${topPadding}px \${inputPadding.right}px \${inputPadding.bottom}px \${inputPadding.left}px\`,
    border: "none",
    background: "transparent",
    color: "transparent",
    caretColor: props.fieldTextColor,
    fontFamily: "inherit",
    fontSize: props.inputTextSize,
    fontWeight: props.inputTextWeight,
    lineHeight: 1.2,
    outline: "none",
    resize: options.isTextarea ? "vertical" : "none",
    WebkitTextFillColor: "transparent",
    ...(options.isSelect ? { opacity: 0, cursor: "pointer", appearance: "none" } : {}),
  }
}

function getChoiceStyle(props) {
  const inputPadding = getInputPadding(props)

  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: \`\${inputPadding.top}px \${inputPadding.right}px \${inputPadding.bottom}px \${inputPadding.left}px\`,
    borderRadius: props.fieldRadius,
    border: \`\${props.fieldBorderWidth}px solid \${props.fieldBorderColor}\`,
    background: props.fieldSurfaceColor,
    fontSize: props.inputTextSize,
    fontWeight: props.inputTextWeight,
    color: props.fieldTextColor,
  }
}

function getButtonRootStyle() {
  return {
    width: "100%",
    padding: 0,
    border: "none",
    background: "transparent",
    appearance: "none",
    cursor: "pointer",
  }
}

function getButtonSurfaceStyle(props) {
  const buttonPadding = getButtonPadding(props)
  const shared = {
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: props.buttonRadius,
    fontSize: props.buttonTextSize,
    fontWeight: props.buttonTextWeight,
    lineHeight: 1.2,
    padding: \`\${buttonPadding.top}px \${buttonPadding.right}px \${buttonPadding.bottom}px \${buttonPadding.left}px\`,
    boxSizing: "border-box",
  }

  return props.buttonVariant === "outline"
    ? {
        ...shared,
        border: \`\${props.buttonBorderWidth}px solid \${props.buttonBorderColor}\`,
        color: props.buttonTextColor,
        background: "transparent",
      }
    : {
        ...shared,
        border: \`\${props.buttonBorderWidth}px solid \${props.buttonBorderColor}\`,
        color: props.buttonTextColor,
        background: props.primaryColor,
      }
}

function ButtonIcon({ icon, size = 18 }) {
  if (icon === "arrowBack") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M19 12H5M5 12L11 6M5 12L11 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (icon === "send") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 20.01L20 3M3 20.01L9 20M3 20.01L3 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (icon === "call") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 4.5C5 14.165 9.835 19 19.5 19L21 15.5L16.75 13.5L14.75 15.5C11.785 14.02 9.98 12.215 8.5 9.25L10.5 7.25L8.5 3L5 4.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (icon === "sms") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6.5C4 5.12 5.12 4 6.5 4H17.5C18.88 4 20 5.12 20 6.5V14.5C20 15.88 18.88 17 17.5 17H9L4 20V6.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (icon === "lock") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="5"
          y="11"
          width="14"
          height="9"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M8 11V8.5C8 6.01 10.01 4 12.5 4C14.99 4 17 6.01 17 8.5V11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (icon === "check") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 12L10 17L19 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 10L12 15L17 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function getButtonContent(button, label, props) {
  const leftIcon = button.leftIcon || (button.type === "back" ? "arrowBack" : button.type === "otp" ? "lock" : "send")
  const rightIcon = button.rightIcon || "arrowForward"
  const iconSize = props.buttonTextSize + 5

  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: props.buttonTextSize, lineHeight: 1.2 }}>
      {button.isLeftIconVisible === true ? <ButtonIcon icon={leftIcon} size={iconSize} /> : null}
      {button.isLabelVisible !== false ? <span>{label}</span> : null}
      {button.isRightIconVisible === true ? <ButtonIcon icon={rightIcon} size={iconSize} /> : null}
    </span>
  )
}

function FieldShell({ label, required, isLabelVisible, isRequiredVisible, message, isHelperTextVisible, children, props }) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      {isLabelVisible !== false ? (
        <span style={{ color: props.fieldLabelColor, fontWeight: props.labelWeight, fontSize: props.labelSize }}>
          {label}{required && isRequiredVisible !== false ? " *" : ""}
        </span>
      ) : null}
      {children}
      {message && isHelperTextVisible !== false ? (
        <span style={{ color: props.fieldHelperColor, fontSize: props.helperSize, fontWeight: props.helperWeight }}>{message}</span>
      ) : null}
    </label>
  )
}`,
    `function InputField({ field, value, onChange, onFocus, onBlur, isFocused, props, type = "text" }) {
  return (
    <FieldShell
      label={field.label}
      required={field.required}
      isLabelVisible={field.isLabelVisible}
      isRequiredVisible={field.isRequiredVisible}
      message={field.validationMessage}
      isHelperTextVisible={field.isHelperTextVisible}
      props={props}
    >
      <div style={{ position: "relative" }}>
        <div aria-hidden="true" style={getInputSurfaceStyle(props, { isPlaceholder: !value, isFocused })}>
          <span style={{ display: "block", width: "100%", fontSize: props.inputTextSize, fontWeight: props.inputTextWeight, lineHeight: 1.2, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {value || field.placeholder || "\u00A0"}
          </span>
        </div>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(field.id, event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder=""
          style={getNativeInputStyle(props)}
        />
      </div>
    </FieldShell>
  )
}`,
    `function TextareaField({ field, value, onChange, onFocus, onBlur, isFocused, props }) {
  return (
    <FieldShell
      label={field.label}
      required={field.required}
      isLabelVisible={field.isLabelVisible}
      isRequiredVisible={field.isRequiredVisible}
      message={field.validationMessage}
      isHelperTextVisible={field.isHelperTextVisible}
      props={props}
    >
      <div style={{ position: "relative" }}>
        <div aria-hidden="true" style={getInputSurfaceStyle(props, { isTextarea: true, isPlaceholder: !value, isFocused })}>
          <span style={{ display: "block", width: "100%", fontSize: props.inputTextSize, fontWeight: props.inputTextWeight, lineHeight: 1.2, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {value || field.placeholder || "\u00A0"}
          </span>
        </div>
        <textarea
          value={value}
          onChange={(event) => onChange(field.id, event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder=""
          style={getNativeInputStyle(props, { isTextarea: true })}
        />
      </div>
    </FieldShell>
  )
}`,
    `function DropdownField({ field, value, onChange, onFocus, onBlur, isFocused, props }) {
  return (
    <FieldShell
      label={field.label}
      required={field.required}
      isLabelVisible={field.isLabelVisible}
      isRequiredVisible={field.isRequiredVisible}
      message={field.validationMessage}
      isHelperTextVisible={field.isHelperTextVisible}
      props={props}
    >
      <div style={{ position: "relative" }}>
        <div aria-hidden="true" style={getInputSurfaceStyle(props, { isPlaceholder: !value, hasTrailing: true, isFocused })}>
          <span style={{ display: "block", width: "100%", fontSize: props.inputTextSize, fontWeight: props.inputTextWeight, lineHeight: 1.2, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {value || (field.placeholder ?? "Select an option")}
          </span>
          <span style={{ position: "absolute", top: "50%", right: getInputPadding(props).right, display: "inline-flex", alignItems: "center", justifyContent: "center", color: props.fieldLabelColor, transform: "translateY(-50%)" }}>
            <ChevronIcon />
          </span>
        </div>
        <select
          value={value}
          onChange={(event) => onChange(field.id, event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          style={getNativeInputStyle(props, { isSelect: true })}
        >
          <option value="">{field.placeholder ?? "Select an option"}</option>
          {(field.options || []).map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </FieldShell>
  )
}`,
    `function RadioField({ field, value, onChange, props }) {
  return (
    <FieldShell
      label={field.label}
      required={field.required}
      isLabelVisible={field.isLabelVisible}
      isRequiredVisible={field.isRequiredVisible}
      message={field.validationMessage}
      isHelperTextVisible={field.isHelperTextVisible}
      props={props}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {(field.options || []).map((option) => (
          <label key={option} style={getChoiceStyle(props)}>
            <input
              type="radio"
              name={field.id}
              checked={value === option}
              onChange={() => onChange(field.id, option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </FieldShell>
  )
}`,
    `function CheckboxField({ field, value, onChange, props }) {
  const selectedValues = Array.isArray(value) ? value : []
  const options = field.options && field.options.length > 0 ? field.options : [field.label]

  return (
    <FieldShell
      label={field.label}
      required={field.required}
      isLabelVisible={field.isLabelVisible}
      isRequiredVisible={field.isRequiredVisible}
      message={field.validationMessage}
      isHelperTextVisible={field.isHelperTextVisible}
      props={props}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {options.map((option) => (
          <label key={option} style={getChoiceStyle(props)}>
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={(event) =>
                onChange(
                  field.id,
                  event.target.checked
                    ? [...selectedValues, option]
                    : selectedValues.filter((value) => value !== option)
                )
              }
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </FieldShell>
  )
}`,
    `function renderField(field, value, onChange, isFocused, onFocus, onBlur, props) {
  switch (field.type) {
    case "text":
      return <InputField field={field} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} isFocused={isFocused} props={props} />
    case "email":
      return <InputField field={field} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} isFocused={isFocused} props={props} type="email" />
    case "phone":
      return <InputField field={field} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} isFocused={isFocused} props={props} type="tel" />
    case "textarea":
      return <TextareaField field={field} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} isFocused={isFocused} props={props} />
    case "select":
      return <DropdownField field={field} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} isFocused={isFocused} props={props} />
    case "radio":
      return <RadioField field={field} value={value} onChange={onChange} props={props} />
    case "checkbox":
      return <CheckboxField field={field} value={value} onChange={onChange} props={props} />
    default:
      return null
  }
}`,
  ].join("\n\n");

  return `import * as React from "react";
import { addPropertyControls, ControlType } from "framer";

const fields = ${fieldsDefinition};
const buttons = ${buttonsDefinition};
const layout = {
  desktop: "${desktopStyling.layout}",
  tablet: "${tabletStyling.layout}",
  mobile: "${mobileStyling.layout}",
};
const styleOverrides = ${JSON.stringify(stylingOverrides, null, 2)};

${generatedComponents}

function getViewportWidth() {
  if (typeof window === "undefined") {
    return 1200
  }

  return window.innerWidth
}

function getActiveMode(props, viewportWidth) {
  if (props.layoutMode) {
    return props.layoutMode
  }

  if (viewportWidth <= 414) {
    return "mobile"
  }

  if (viewportWidth <= 820) {
    return "tablet"
  }

  return "desktop"
}

function getFieldWidth(field, activeMode) {
  if (activeMode === "mobile" && field.mobileWidth) {
    return field.mobileWidth
  }

  if (activeMode === "tablet" && field.tabletWidth) {
    return field.tabletWidth
  }

  return field.width
}

function getButtonWidth(button, activeMode) {
  if (activeMode === "mobile" && button.mobileWidth) {
    return button.mobileWidth
  }

  if (activeMode === "tablet" && button.tabletWidth) {
    return button.tabletWidth
  }

  return button.width
}

function getGridColumn(width, layoutValue) {
  if (layoutValue !== "2-col") {
    return "span 6"
  }

  if (width === "third") {
    return "span 2"
  }

  if (width === "half") {
    return "span 3"
  }

  return "span 6"
}

function getLayoutForViewport(props, viewportWidth) {
  if (props.layoutMode) {
    return layout[props.layoutMode] || layout.desktop || "1-col"
  }

  if (viewportWidth <= 414) {
    return layout.mobile || layout.desktop || "1-col"
  }

  if (viewportWidth <= 820) {
    return layout.tablet || layout.desktop || "1-col"
  }

  return layout.desktop || "1-col"
}

export default function ${componentName}(props) {
  const [values, setValues] = React.useState(() =>
    Object.fromEntries(fields.map((field) => [field.id, field.type === "checkbox" ? [] : ""]))
  )
  const [submitState, setSubmitState] = React.useState("idle")
  const [focusedFieldId, setFocusedFieldId] = React.useState(null)
  const [viewportWidth, setViewportWidth] = React.useState(() => getViewportWidth())

  const handleChange = React.useCallback((fieldId, nextValue) => {
    setValues((current) => ({ ...current, [fieldId]: nextValue }))
  }, [])

  const handleOtp = React.useCallback(async () => {${otpSubmission}
  }, [props.otpWebhookUrl, values])

  const handleBack = React.useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back()
    }
  }, [])

  React.useEffect(() => {
    const handleResize = () => {
      setViewportWidth(getViewportWidth())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSubmit = React.useCallback(async (event) => {
    event.preventDefault()
    setSubmitState("loading")

    const payload = {
      submittedAt: new Date().toISOString(),
      values,
    }
${googleSheetsSubmission}
${fullDataSubmission}

    setSubmitState("success")
${redirectSubmission}
  }, [props.fullDataWebhookUrl, props.googleSheetsUrl, props.redirectUrl, values])

  const activeMode = getActiveMode(props, viewportWidth)
  const activeLayout = getLayoutForViewport(props, viewportWidth)
  const resolvedProps = {
    ...props,
    ...(activeMode === "tablet"
      ? styleOverrides.tablet
      : activeMode === "mobile"
        ? styleOverrides.mobile
        : {}),
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: resolvedProps.sectionGap,
        padding: getFormPadding(resolvedProps),
        borderRadius: resolvedProps.sectionRadius,
        background: resolvedProps.sectionSurfaceColor,
        border: \`\${resolvedProps.sectionBorderWidth}px solid \${resolvedProps.sectionBorderColor}\`,
      }}
    >
      ${headerMarkup}
      <div
        style={{
          display: "grid",
          gap: resolvedProps.fieldGap,
          gridTemplateColumns: activeLayout === "2-col" ? "repeat(6, minmax(0, 1fr))" : "1fr",
        }}
      >
        {fields.map((field) => (
          <div
            key={field.id}
            style={{
              gridColumn: getGridColumn(getFieldWidth(field, activeMode), activeLayout),
            }}
          >
            {renderField(
              field,
              values[field.id],
              handleChange,
              focusedFieldId === field.id,
              () => setFocusedFieldId(field.id),
              () => setFocusedFieldId((current) => (current === field.id ? null : current)),
              resolvedProps
            )}
          </div>
        ))}
      </div>

      {buttons.length > 0 ? (
        <div
          style={{
            display: "grid",
            gap: resolvedProps.fieldGap,
            gridTemplateColumns: activeLayout === "2-col" ? "repeat(6, minmax(0, 1fr))" : "1fr",
          }}
        >
          {buttons.map((button) => {
            const label = button.type === "submit"
              ? submitState === "loading"
                ? "Submitting..."
                : submitState === "success"
                  ? "Submitted"
                  : submitState === "error"
                    ? "Retry Submit"
                    : button.label
              : button.label

            const sharedProps = {
              disabled: button.type === "submit" && submitState === "loading",
              style: getButtonRootStyle(),
            }

            return (
              <div
                key={button.id}
                style={{
                  gridColumn: getGridColumn(getButtonWidth(button, activeMode), activeLayout),
                }}
              >
                {button.type === "submit" ? (
                  <button type="submit" {...sharedProps}>
                    <span style={getButtonSurfaceStyle(resolvedProps)}>
                      {getButtonContent(button, label, resolvedProps)}
                    </span>
                  </button>
                ) : button.type === "otp" ? (
                  <button type="button" onClick={handleOtp} style={getButtonRootStyle()}>
                    <span style={getButtonSurfaceStyle(resolvedProps)}>
                      {getButtonContent(button, label, resolvedProps)}
                    </span>
                  </button>
                ) : (
                  <button type="button" onClick={handleBack} style={getButtonRootStyle()}>
                    <span style={getButtonSurfaceStyle(resolvedProps)}>
                      {getButtonContent(button, label, resolvedProps)}
                    </span>
                  </button>
                )}
              </div>
            )
          })}
        </div>
      ) : null}
    </form>
  )
}

${integrationControls ? `addPropertyControls(${componentName}, {\n  ${integrationControls},` : `addPropertyControls(${componentName}, {`}
  layoutMode: {
    type: ControlType.Enum,
    title: "Layout Mode",
    options: ["desktop", "tablet", "mobile"],
    optionTitles: ["Desktop", "Tablet", "Mobile"],
    displaySegmentedControl: true,
    defaultValue: "desktop",
  },
  primaryColor: { type: ControlType.Color, title: "Button Color", defaultValue: "${desktopStyling.primaryColor}" },
  buttonBorderColor: { type: ControlType.Color, title: "Button Border", defaultValue: "${desktopStyling.buttonBorderColor}" },
  buttonTextColor: { type: ControlType.Color, title: "Button Text", defaultValue: "${desktopStyling.buttonTextColor}" },
  sectionSurfaceColor: { type: ControlType.Color, title: "Section Surface", defaultValue: "${desktopStyling.sectionSurfaceColor}" },
  sectionBorderColor: { type: ControlType.Color, title: "Section Border", defaultValue: "${desktopStyling.sectionBorderColor}" },
  sectionBorderWidth: { type: ControlType.Number, title: "Section Border Width", min: 0, max: 12, step: 0.1, defaultValue: ${desktopStyling.sectionBorderWidth} },
  sectionTitleColor: { type: ControlType.Color, title: "Section Title", defaultValue: "${desktopStyling.sectionTitleColor}" },
  sectionBodyColor: { type: ControlType.Color, title: "Section Body", defaultValue: "${desktopStyling.sectionBodyColor}" },
  fieldSurfaceColor: { type: ControlType.Color, title: "Field Surface", defaultValue: "${desktopStyling.fieldSurfaceColor}" },
  fieldBorderColor: { type: ControlType.Color, title: "Field Border", defaultValue: "${desktopStyling.fieldBorderColor}" },
  fieldBorderWidth: { type: ControlType.Number, title: "Field Border Width", min: 0, max: 12, step: 0.1, defaultValue: ${desktopStyling.fieldBorderWidth} },
  fieldTextColor: { type: ControlType.Color, title: "Field Text", defaultValue: "${desktopStyling.fieldTextColor}" },
  fieldLabelColor: { type: ControlType.Color, title: "Field Label", defaultValue: "${desktopStyling.fieldLabelColor}" },
  fieldHelperColor: { type: ControlType.Color, title: "Field Helper", defaultValue: "${desktopStyling.fieldHelperColor}" },
  fieldPlaceholderColor: { type: ControlType.Color, title: "Field Placeholder", defaultValue: "${desktopStyling.fieldPlaceholderColor}" },
  fieldFocusColor: { type: ControlType.Color, title: "Field Focus", defaultValue: "${desktopStyling.fieldFocusColor}" },
  fieldFocusWidth: { type: ControlType.Number, title: "Field Focus Width", min: 0, max: 12, step: 0.1, defaultValue: ${desktopStyling.fieldFocusWidth} },
  formPaddingMode: {
    type: ControlType.Enum,
    title: "Padding Mode",
    options: ["all", "individual"],
    optionTitles: ["All", "4 sides"],
    defaultValue: "${desktopStyling.formPaddingMode}",
  },
  formPadding: { type: ControlType.Number, title: "Form Padding", min: 0, max: 64, defaultValue: ${desktopStyling.formPadding} },
  formPaddingTop: { type: ControlType.Number, title: "Pad Top", min: 0, max: 64, defaultValue: ${desktopStyling.formPaddingTop} },
  formPaddingRight: { type: ControlType.Number, title: "Pad Right", min: 0, max: 64, defaultValue: ${desktopStyling.formPaddingRight} },
  formPaddingBottom: { type: ControlType.Number, title: "Pad Bottom", min: 0, max: 64, defaultValue: ${desktopStyling.formPaddingBottom} },
  formPaddingLeft: { type: ControlType.Number, title: "Pad Left", min: 0, max: 64, defaultValue: ${desktopStyling.formPaddingLeft} },
  inputPaddingMode: {
    type: ControlType.Enum,
    title: "Input Pad Mode",
    options: ["all", "individual"],
    optionTitles: ["All", "4 sides"],
    defaultValue: "${desktopStyling.inputPaddingMode}",
  },
  inputPadding: { type: ControlType.Number, title: "Input Padding", min: 0, max: 32, defaultValue: ${desktopStyling.inputPadding} },
  inputPaddingTop: { type: ControlType.Number, title: "Input Top", min: 0, max: 32, defaultValue: ${desktopStyling.inputPaddingTop} },
  inputPaddingRight: { type: ControlType.Number, title: "Input Right", min: 0, max: 32, defaultValue: ${desktopStyling.inputPaddingRight} },
  inputPaddingBottom: { type: ControlType.Number, title: "Input Bottom", min: 0, max: 32, defaultValue: ${desktopStyling.inputPaddingBottom} },
  inputPaddingLeft: { type: ControlType.Number, title: "Input Left", min: 0, max: 32, defaultValue: ${desktopStyling.inputPaddingLeft} },
  buttonPaddingMode: {
    type: ControlType.Enum,
    title: "Button Pad Mode",
    options: ["all", "individual"],
    optionTitles: ["All", "4 sides"],
    defaultValue: "${desktopStyling.buttonPaddingMode}",
  },
  buttonPadding: { type: ControlType.Number, title: "Button Padding", min: 0, max: 40, defaultValue: ${desktopStyling.buttonPadding} },
  buttonPaddingTop: { type: ControlType.Number, title: "Button Top", min: 0, max: 40, defaultValue: ${desktopStyling.buttonPaddingTop} },
  buttonPaddingRight: { type: ControlType.Number, title: "Button Right", min: 0, max: 40, defaultValue: ${desktopStyling.buttonPaddingRight} },
  buttonPaddingBottom: { type: ControlType.Number, title: "Button Bottom", min: 0, max: 40, defaultValue: ${desktopStyling.buttonPaddingBottom} },
  buttonPaddingLeft: { type: ControlType.Number, title: "Button Left", min: 0, max: 40, defaultValue: ${desktopStyling.buttonPaddingLeft} },
  sectionGap: { type: ControlType.Number, title: "Section Gap", min: 0, max: 48, defaultValue: ${desktopStyling.sectionGap} },
  fieldGap: { type: ControlType.Number, title: "Field Gap", min: 0, max: 40, defaultValue: ${desktopStyling.fieldGap} },
  titleSize: { type: ControlType.Number, title: "Title Size", min: 10, max: 40, defaultValue: ${desktopStyling.titleSize} },
  titleWeight: { type: ControlType.Enum, title: "Title Weight", options: ["300", "400", "500", "600", "700"], defaultValue: "${desktopStyling.titleWeight}" },
  bodySize: { type: ControlType.Number, title: "Body Size", min: 8, max: 24, defaultValue: ${desktopStyling.bodySize} },
  bodyWeight: { type: ControlType.Enum, title: "Body Weight", options: ["300", "400", "500", "600", "700"], defaultValue: "${desktopStyling.bodyWeight}" },
  labelSize: { type: ControlType.Number, title: "Label Size", min: 8, max: 20, defaultValue: ${desktopStyling.labelSize} },
  labelWeight: { type: ControlType.Enum, title: "Label Weight", options: ["300", "400", "500", "600", "700"], defaultValue: "${desktopStyling.labelWeight}" },
  helperSize: { type: ControlType.Number, title: "Helper Size", min: 8, max: 20, defaultValue: ${desktopStyling.helperSize} },
  helperWeight: { type: ControlType.Enum, title: "Helper Weight", options: ["300", "400", "500", "600", "700"], defaultValue: "${desktopStyling.helperWeight}" },
  inputTextSize: { type: ControlType.Number, title: "Input Size", min: 8, max: 24, defaultValue: ${desktopStyling.inputTextSize} },
  inputTextWeight: { type: ControlType.Enum, title: "Input Weight", options: ["300", "400", "500", "600", "700"], defaultValue: "${desktopStyling.inputTextWeight}" },
  buttonTextSize: { type: ControlType.Number, title: "Button Size", min: 8, max: 24, defaultValue: ${desktopStyling.buttonTextSize} },
  buttonTextWeight: { type: ControlType.Enum, title: "Button Weight", options: ["300", "400", "500", "600", "700"], defaultValue: "${desktopStyling.buttonTextWeight}" },
  sectionRadius: { type: ControlType.Number, title: "Section Radius", min: 0, max: 48, defaultValue: ${desktopStyling.sectionRadius} },
  fieldRadius: { type: ControlType.Number, title: "Field Radius", min: 0, max: 32, defaultValue: ${desktopStyling.fieldRadius} },
  buttonRadius: { type: ControlType.Number, title: "Button Radius", min: 0, max: 32, defaultValue: ${desktopStyling.buttonRadius} },
  buttonBorderWidth: { type: ControlType.Number, title: "Button Border Width", min: 0, max: 12, step: 0.1, defaultValue: ${desktopStyling.buttonBorderWidth} },
  buttonVariant: {
    type: ControlType.Enum,
    title: "Button Style",
    options: ["solid", "outline"],
    defaultValue: "${desktopStyling.buttonStyle}",
  },
});`;
}
