export type FormButtonState = "idle" | "loading" | "success" | "error";
export type FormButtonStyle = "solid" | "outline";

export type FormButtonProps = {
  label: string;
  state: FormButtonState;
};
