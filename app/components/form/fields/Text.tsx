import { Shell } from "./Shell";
import type { FormFieldComponentProps } from "../types";

export function Text({ field }: FormFieldComponentProps) {
  return (
    <Shell
      label={field.label}
      isRequired={field.required}
      requiredMessage={field.validationMessage}
      isLabelVisible={field.isLabelVisible}
      isRequiredVisible={field.isRequiredVisible}
      isHelperTextVisible={field.isHelperTextVisible}
    >
      <input className="form-element-control" type="text" placeholder={field.placeholder} />
    </Shell>
  );
}
