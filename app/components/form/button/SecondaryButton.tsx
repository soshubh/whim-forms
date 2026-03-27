import type { FormButtonProps } from "./types";

export function SecondaryButton({ label, state }: FormButtonProps) {
  const stateLabel =
    state === "loading"
      ? "Submitting..."
      : state === "success"
        ? "Submitted"
        : state === "error"
          ? "Retry Submit"
          : label;

  return (
    <button
      type="button"
      className={`builder-submit builder-submit--outline builder-submit-state--${state}`}
      aria-busy={state === "loading"}
    >
      {stateLabel}
    </button>
  );
}
