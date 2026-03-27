import { Shell } from "./Shell";
import type { FormFieldComponentProps } from "../types";

export function Radio({ field }: FormFieldComponentProps) {
  return (
    <Shell
      label={field.label}
      isRequired={field.required}
      requiredMessage={field.validationMessage}
      isLabelVisible={field.isLabelVisible}
      isRequiredVisible={field.isRequiredVisible}
      isHelperTextVisible={field.isHelperTextVisible}
    >
      <div className="form-element-choice-list">
        {(field.options ?? []).map((option, index) => (
          <label key={`${field.id}-${index}`} className="form-element-choice-item form-choice-control">
            <input type="radio" name={field.id} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </Shell>
  );
}
