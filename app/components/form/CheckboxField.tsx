import { FieldShell } from "./FieldShell";
import type { FormFieldComponentProps } from "./types";

export function CheckboxField({ field }: FormFieldComponentProps) {
  return (
    <FieldShell label={field.label} required={field.required} validationMessage={field.validationMessage}>
      <label className="builder-choice-item builder-inline-choice form-choice-control">
        <input type="checkbox" />
        <span>{field.label}</span>
      </label>
    </FieldShell>
  );
}
