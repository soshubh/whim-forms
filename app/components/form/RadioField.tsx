import { FieldShell } from "./FieldShell";
import type { FormFieldComponentProps } from "./types";

export function RadioField({ field }: FormFieldComponentProps) {
  return (
    <FieldShell label={field.label} required={field.required} validationMessage={field.validationMessage}>
      <div className="builder-choice-list">
        {(field.options ?? []).map((option) => (
          <label key={option} className="builder-choice-item form-choice-control">
            <input type="radio" name={field.id} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </FieldShell>
  );
}
