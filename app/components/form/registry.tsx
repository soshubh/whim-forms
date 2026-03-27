import { CheckboxField } from "./CheckboxField";
import { DropdownField } from "./DropdownField";
import { EmailField } from "./EmailField";
import { PhoneField } from "./PhoneField";
import { RadioField } from "./RadioField";
import { TextareaField } from "./TextareaField";
import { TextField } from "./TextField";
import type { FieldType, FormFieldComponent } from "./types";

export const FORM_FIELD_COMPONENTS: Record<FieldType, FormFieldComponent> = {
  text: TextField,
  textarea: TextareaField,
  email: EmailField,
  phone: PhoneField,
  select: DropdownField,
  radio: RadioField,
  checkbox: CheckboxField,
};
