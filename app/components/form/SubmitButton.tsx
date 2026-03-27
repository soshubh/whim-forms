export type SubmitButtonState = "idle" | "loading" | "success" | "error";
export type SubmitButtonVariant = "solid" | "outline";

export function SubmitButton({
  label,
  variant,
  state,
}: {
  label: string;
  variant: SubmitButtonVariant;
  state: SubmitButtonState;
}) {
  const stateLabel =
    state === "loading" ? "Submitting..." : state === "success" ? "Submitted" : state === "error" ? "Retry Submit" : label;

  return (
    <button
      type="button"
      className={`builder-submit builder-submit--${variant} builder-submit-state--${state}`}
      aria-busy={state === "loading"}
    >
      {stateLabel}
    </button>
  );
}
