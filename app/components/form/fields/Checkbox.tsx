import { Shell } from "./Shell";
import type { FormFieldComponentProps } from "../types";

export function Checkbox({ field }: FormFieldComponentProps) {
  return (
    <Shell
      label={field.label}
      isRequired={field.required}
      requiredMessage={field.validationMessage}
      isLabelVisible={field.isLabelVisible}
      isRequiredVisible={field.isRequiredVisible}
      isHelperTextVisible={field.isHelperTextVisible}
    >
      <label className="form-element-choice-item form-element-choice-item--inline form-choice-control">
        <input type="checkbox" />
        <span>{field.label}</span>
      </label>
    </Shell>
  );
}
