import type { FormButtonProps } from "./types";

export function PrimaryButton({ label, state }: FormButtonProps) {
  const stateLabel =
    state === "loading" ? "Submitting..." : state === "success" ? "Submitted" : state === "error" ? "Retry Submit" : label;

  return (
    <button
      type="button"
      className={`builder-submit builder-submit--solid builder-submit-state--${state}`}
      aria-busy={state === "loading"}
    >
      {stateLabel}
    </button>
  );
}
