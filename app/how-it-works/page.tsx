import { LandingSubpageShell } from "../components/landing/subpage-shell";
import styles from "../components/landing/subpage.module.css";

const steps = [
  {
    title: "Build the structure",
    body:
      "Start with the field system in the builder. Choose the inputs, labels, helper copy, widths, and button actions while the canvas keeps the layout aligned.",
  },
  {
    title: "Tune the interactions",
    body:
      "Set real states instead of static visuals. Focus, invalid, loading, and success are part of the output, so the form behaves properly after export.",
  },
  {
    title: "Connect the flow",
    body:
      "Enable Google Sheets, webhook delivery, redirect behavior, and OTP-related flows from the same product instead of wiring them later in separate tools.",
  },
  {
    title: "Export to Framer",
    body:
      "Copy the generated component code and supporting script output. The exported code preserves the styling, field logic, validation, and transport formats from the builder.",
  },
];

export default function HowItWorksPage() {
  return (
    <LandingSubpageShell
      eyebrow="How it works"
      title="From form idea to working Framer component."
      lede="The builder is designed to keep design, state logic, and export code aligned. You don’t rebuild the same decisions in three different places."
    >
      <section className={styles.grid}>
        {steps.map((step, index) => (
          <article className={styles.section} key={step.title}>
            <div className={styles.stepNumber}>{index + 1}</div>
            <h2 className={styles.sectionTitle}>{step.title}</h2>
            <p className={styles.sectionBody}>{step.body}</p>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What the system handles</h2>
        <p className={styles.sectionBody}>
          The product is not only a visual layout tool. It is also responsible
          for validation rules, field states, Google Sheets transport, webhook
          payloads, and export-ready Framer code.
        </p>
        <ul className={styles.bulletList}>
          <li>Real required-field and format validation instead of static helper text.</li>
          <li>Phone fields with split country code and local number behavior.</li>
          <li>OTP-related paths when a project needs gated submission flow.</li>
          <li>App Script and webhook outputs that match the generated field ids.</li>
        </ul>
      </section>
    </LandingSubpageShell>
  );
}
