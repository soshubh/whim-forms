import { Checkbox } from "./fields/Checkbox";
import { Dropdown } from "./fields/Dropdown";
import { Email } from "./fields/Email";
import { Phone } from "./fields/Phone";
import { Radio } from "./fields/Radio";
import { Text } from "./fields/Text";
import { Textarea } from "./fields/Textarea";
import type { FieldType, FormFieldComponent } from "./types";

export const FORM_FIELD_COMPONENTS: Record<FieldType, FormFieldComponent> = {
  text: Text,
  textarea: Textarea,
  email: Email,
  phone: Phone,
  select: Dropdown,
  radio: Radio,
  checkbox: Checkbox,
};
