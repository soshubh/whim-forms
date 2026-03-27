import { FieldShell } from "./FieldShell";
import type { FormFieldComponentProps } from "./types";

export function TextField({ field }: FormFieldComponentProps) {
  return (
    <FieldShell label={field.label} required={field.required} validationMessage={field.validationMessage}>
      <input className="form-element-control" type="text" placeholder={field.placeholder} />
    </FieldShell>
  );
}
