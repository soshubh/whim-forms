import { FieldShell } from "./FieldShell";
import type { FormFieldComponentProps } from "./types";

export function TextareaField({ field }: FormFieldComponentProps) {
  return (
    <FieldShell label={field.label} required={field.required} validationMessage={field.validationMessage}>
      <textarea className="form-element-control form-element-control--textarea" rows={5} placeholder={field.placeholder} />
    </FieldShell>
  );
}
