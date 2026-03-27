import { Shell } from "./Shell";
import type { FormFieldComponentProps } from "../types";

export function Textarea({ field }: FormFieldComponentProps) {
  return (
    <Shell
      label={field.label}
      isRequired={field.required}
      requiredMessage={field.validationMessage}
      isLabelVisible={field.isLabelVisible}
      isRequiredVisible={field.isRequiredVisible}
      isHelperTextVisible={field.isHelperTextVisible}
    >
      <textarea className="form-element-control form-element-control--textarea" rows={5} placeholder={field.placeholder} />
    </Shell>
  );
}
