import type { BuilderConfig } from "../builder-config";

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
  const componentName = `${toPascalCase(config.formSettings.pageName) || "Generated"}Form`;
  const fieldsDefinition = JSON.stringify(config.fields, null, 2);
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
          body: JSON.stringify({ phone: values.phone || values.phoneNumber || "", email: values.email || "" }),
        });
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
    `function getInputStyle(props) {
  return {
    minHeight: 50,
    width: "100%",
    padding: "0 14px",
    borderRadius: props.radius,
    border: \`1px solid \${props.borderColor}\`,
    background: props.surfaceColor,
    color: props.textColor,
    outline: "none",
  }
}

function getChoiceStyle(props) {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 14px",
    borderRadius: props.radius,
    border: \`1px solid \${props.borderColor}\`,
    background: props.surfaceColor,
  }
}

function getButtonStyle(props) {
  return props.buttonVariant === "outline"
    ? {
        minHeight: 52,
        borderRadius: props.radius,
        border: \`1px solid \${props.primaryColor}\`,
        color: props.primaryColor,
        background: "transparent",
        fontWeight: 700,
        padding: "0 20px",
      }
    : {
        minHeight: 52,
        borderRadius: props.radius,
        border: "none",
        color: "#fff",
        background: props.primaryColor,
        fontWeight: 700,
        padding: "0 20px",
      }
}

function FieldShell({ label, required, message, children, props }) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ color: props.labelColor, fontWeight: 600, fontSize: 14 }}>
        {label}{required ? " *" : ""}
      </span>
      {children}
      {message ? <span style={{ color: props.labelColor, opacity: 0.68, fontSize: 13 }}>{message}</span> : null}
    </label>
  )
}`,
    `function InputField({ field, value, onChange, props, type = "text" }) {
  return (
    <FieldShell
      label={field.label}
      required={field.required}
      message={field.validationMessage}
      props={props}
    >
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(field.id, event.target.value)}
        placeholder={field.placeholder || ""}
        style={getInputStyle(props)}
      />
    </FieldShell>
  )
}`,
    `function TextareaField({ field, value, onChange, props }) {
  return (
    <FieldShell
      label={field.label}
      required={field.required}
      message={field.validationMessage}
      props={props}
    >
      <textarea
        value={value}
        onChange={(event) => onChange(field.id, event.target.value)}
        placeholder={field.placeholder || ""}
        style={{ ...getInputStyle(props), minHeight: 132, padding: 14, resize: "vertical" }}
      />
    </FieldShell>
  )
}`,
    `function DropdownField({ field, value, onChange, props }) {
  return (
    <FieldShell
      label={field.label}
      required={field.required}
      message={field.validationMessage}
      props={props}
    >
      <select
        value={value}
        onChange={(event) => onChange(field.id, event.target.value)}
        style={getInputStyle(props)}
      >
        <option value="">{field.placeholder || "Select an option"}</option>
        {(field.options || []).map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </FieldShell>
  )
}`,
    `function RadioField({ field, value, onChange, props }) {
  return (
    <FieldShell
      label={field.label}
      required={field.required}
      message={field.validationMessage}
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
  return (
    <label style={getChoiceStyle(props)}>
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(event) => onChange(field.id, event.target.checked)}
      />
      <span>{field.label}{field.required ? " *" : ""}</span>
    </label>
  )
}`,
    `function SubmitButton({ state, props }) {
  const label = state === "loading"
    ? "Submitting..."
    : state === "success"
      ? "Submitted"
      : state === "error"
        ? "Retry Submit"
        : props.buttonText

  return (
    <button type="submit" disabled={state === "loading"} style={getButtonStyle(props)}>
      {label}
    </button>
  )
}`,
    `function renderField(field, value, onChange, props) {
  switch (field.type) {
    case "text":
      return <InputField field={field} value={value} onChange={onChange} props={props} />
    case "email":
      return <InputField field={field} value={value} onChange={onChange} props={props} type="email" />
    case "phone":
      return <InputField field={field} value={value} onChange={onChange} props={props} type="tel" />
    case "textarea":
      return <TextareaField field={field} value={value} onChange={onChange} props={props} />
    case "select":
      return <DropdownField field={field} value={value} onChange={onChange} props={props} />
    case "radio":
      return <RadioField field={field} value={value} onChange={onChange} props={props} />
    case "checkbox":
      return <CheckboxField field={field} value={value} onChange={onChange} props={props} />
    default:
      return null
  }
}`,
  ]
    .join("\n\n");

  return `import * as React from "react";
import { addPropertyControls, ControlType } from "framer";

const fields = ${fieldsDefinition};
const layout = {
  desktop: "${config.styling.layout}",
  tablet: "${config.styling.tabletLayout ?? config.styling.layout}",
  mobile: "${config.styling.mobileLayout ?? config.styling.layout}",
};

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

function getGridColumn(field, activeMode, layout) {
  if (layout !== "2-col") {
    return "span 6"
  }

  const width = getFieldWidth(field, activeMode)
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
    Object.fromEntries(fields.map((field) => [field.id, field.type === "checkbox" ? false : ""]))
  );
  const [submitState, setSubmitState] = React.useState("idle");
  const [viewportWidth, setViewportWidth] = React.useState(() => getViewportWidth());

  const handleChange = React.useCallback((fieldId, nextValue) => {
    setValues((current) => ({ ...current, [fieldId]: nextValue }));
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setViewportWidth(getViewportWidth())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSubmit = React.useCallback(async (event) => {
    event.preventDefault();
    setSubmitState("loading");

    const payload = {
      submittedAt: new Date().toISOString(),
      values,
    };
${googleSheetsSubmission}
${fullDataSubmission}
${otpSubmission}

    setSubmitState("success");
${redirectSubmission}
  }, [values]);

  const activeMode = getActiveMode(props, viewportWidth)
  const activeLayout = getLayoutForViewport(props, viewportWidth)

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
      <div
        style={{
          display: "grid",
          gap: 14,
          gridTemplateColumns: activeLayout === "2-col" ? "repeat(6, minmax(0, 1fr))" : "1fr",
        }}
      >
        {fields.map((field) => (
          <div
            key={field.id}
            style={{
              gridColumn: getGridColumn(field, activeMode, activeLayout),
            }}
          >
            {renderField(field, values[field.id], handleChange, props)}
          </div>
        ))}
      </div>

      <SubmitButton state={submitState} props={props} />
    </form>
  );
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
  primaryColor: { type: ControlType.Color, title: "Primary", defaultValue: "${config.styling.primaryColor}" },
  surfaceColor: { type: ControlType.Color, title: "Surface", defaultValue: "${config.styling.surfaceColor}" },
  borderColor: { type: ControlType.Color, title: "Border", defaultValue: "${config.styling.borderColor}" },
  textColor: { type: ControlType.Color, title: "Text", defaultValue: "${config.styling.textColor}" },
  labelColor: { type: ControlType.Color, title: "Label", defaultValue: "${config.styling.labelColor}" },
  placeholderColor: { type: ControlType.Color, title: "Placeholder", defaultValue: "${config.styling.placeholderColor}" },
  radius: { type: ControlType.Number, title: "Radius", min: 0, max: 32, defaultValue: ${config.styling.radius} },
  buttonText: { type: ControlType.String, title: "Button", defaultValue: "${config.formSettings.buttonText}" },
  buttonVariant: {
    type: ControlType.Enum,
    title: "Button Style",
    options: ["solid", "outline"],
    defaultValue: "${config.styling.buttonStyle}",
  },
});`;
}
