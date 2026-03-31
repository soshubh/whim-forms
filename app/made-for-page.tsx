import { LandingSubpageShell } from "./components/landing/subpage-shell";
import styles from "./components/landing/subpage.module.css";

const audiences = [
  {
    title: "Teams shipping lead forms fast",
    body:
      "When a marketing or admissions team needs a form live quickly, the builder keeps the experience polished without waiting on a full frontend pass for every change.",
  },
  {
    title: "Flows that need delivery logic",
    body:
      "This is for forms that must do more than submit. Google Sheets, webhook transport, redirects, and OTP-linked paths are part of the product value.",
  },
  {
    title: "People who need consistency",
    body:
      "The builder is useful when inconsistent spacing, mismatched controls, and broken exports are costing time. It keeps the visual system and the code system aligned.",
  },
  {
    title: "Framer users who still care about production",
    body:
      "The tool is aimed at people who want Framer speed but do not want to accept weak validation, one-off code, or fragile submission logic.",
  },
];

export default function MadeForPage() {
  return (
    <LandingSubpageShell
      eyebrow="Made for"
      title="Built for teams that need more than a pretty form."
      lede="The strongest use case is when the form needs to look good, behave correctly, and connect to real workflows without rewriting everything by hand."
    >
      <section className={styles.grid}>
        {audiences.map((item) => (
          <article className={styles.section} key={item.title}>
            <h2 className={styles.sectionTitle}>{item.title}</h2>
            <p className={styles.sectionBody}>{item.body}</p>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Typical use cases</h2>
        <ul className={styles.bulletList}>
          <li>Admission and counseling forms that need structured lead capture.</li>
          <li>High-intent enquiry forms where phone verification matters.</li>
          <li>Internal teams that want Google Sheets as the simplest backend.</li>
          <li>Framer sites that need code export without losing design fidelity.</li>
        </ul>
      </section>
    </LandingSubpageShell>
  );
}
