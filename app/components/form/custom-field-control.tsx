import { useState, type ReactNode } from "react";

type CustomTextControlProps = {
  type?: "text" | "email" | "tel";
  placeholder?: string;
};

type CustomTextareaControlProps = {
  placeholder?: string;
};

type CustomSelectControlProps = {
  placeholder?: string;
  options?: string[];
};

function ControlSurface({
  value,
  placeholder,
  isTextarea = false,
  trailing,
}: {
  value: string;
  placeholder?: string;
  isTextarea?: boolean;
  trailing?: ReactNode;
}) {
  const content = value || placeholder || "\u00A0";

  return (
    <div
      className={`form-element-visual-surface${isTextarea ? " is-textarea" : ""}${
        value ? "" : " is-placeholder"
      }`}
      aria-hidden="true"
    >
      <span className="form-element-visual-text">{content}</span>
      {trailing ? <span className="form-element-visual-trailing">{trailing}</span> : null}
    </div>
  );
}

export function CustomTextControl({
  type = "text",
  placeholder,
}: CustomTextControlProps) {
  const [value, setValue] = useState("");

  return (
    <div className="form-element-visual-control">
      <ControlSurface value={value} placeholder={placeholder} />
      <input
        className="form-element-native-control"
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder=""
      />
    </div>
  );
}

export function CustomTextareaControl({ placeholder }: CustomTextareaControlProps) {
  const [value, setValue] = useState("");

  return (
    <div className="form-element-visual-control is-textarea">
      <ControlSurface value={value} placeholder={placeholder} isTextarea />
      <textarea
        className="form-element-native-control is-textarea"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder=""
        rows={5}
      />
    </div>
  );
}

export function CustomSelectControl({
  placeholder,
  options = [],
}: CustomSelectControlProps) {
  const [value, setValue] = useState("");

  return (
    <div className="form-element-visual-control is-select">
      <ControlSurface
        value={value}
        placeholder={placeholder ?? "Select an option"}
        trailing={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
      <select
        className="form-element-native-control is-select"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        <option value="">{placeholder ?? "Select an option"}</option>
        {options.map((option, index) => (
          <option key={`${option}-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
