import type { ReactNode } from "react";

export function FieldShell({
  label,
  required,
  validationMessage,
  children,
}: {
  label: string;
  required: boolean;
  validationMessage?: string;
  children: ReactNode;
}) {
  return (
    <label className="form-element-shell">
      <span className="form-element-label">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
      {validationMessage ? <small className="form-element-message">{validationMessage}</small> : null}
    </label>
  );
}
