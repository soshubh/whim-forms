import type { ReactNode } from "react";

export function Shell({
  label,
  isRequired = false,
  requiredMessage,
  isLabelVisible = true,
  isRequiredVisible = true,
  isHelperTextVisible = true,
  children,
}: {
  label: string;
  isRequired?: boolean;
  requiredMessage?: string;
  isLabelVisible?: boolean;
  isRequiredVisible?: boolean;
  isHelperTextVisible?: boolean;
  children: ReactNode;
}) {
  const labelContent = `${label}${isRequired && isRequiredVisible ? " *" : ""}`;
  const helperContent = requiredMessage ?? "\u00A0";

  return (
    <label className="form-element-shell">
      <span
        className={`form-element-label${isLabelVisible ? "" : " is-hidden"}`}
        aria-hidden={!isLabelVisible}
      >
        {labelContent || "\u00A0"}
      </span>
      {children}
      <small
        className={`form-element-message${
          isHelperTextVisible && requiredMessage ? "" : " is-hidden"
        }`}
        aria-hidden={!(isHelperTextVisible && requiredMessage)}
      >
        {helperContent}
      </small>
    </label>
  );
}
