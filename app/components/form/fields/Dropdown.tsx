import { Shell } from "./Shell";
import type { FormFieldComponentProps } from "../types";

export function Dropdown({ field }: FormFieldComponentProps) {
  return (
    <Shell
      label={field.label}
      isRequired={field.required}
      requiredMessage={field.validationMessage}
      isLabelVisible={field.isLabelVisible}
      isRequiredVisible={field.isRequiredVisible}
      isHelperTextVisible={field.isHelperTextVisible}
    >
      <select className="form-element-control" defaultValue="">
        <option value="" disabled>
          Select an option
        </option>
        {(field.options ?? []).map((option, index) => (
          <option key={`${field.id}-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Shell>
  );
}
