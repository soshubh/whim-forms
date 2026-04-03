import { LandingSubpageShell } from "../components/subpage-shell";
import styles from "../page.module.css";

export default function MadeByPage() {
  return (
    <LandingSubpageShell
      eyebrow="Made by"
      title="Free to use. Free to improve."
      lede="Built from a real gap. Open to everyone."
      heroClassName={styles.madeByHero}
      titleClassName={styles.madeByHeroTitle}
      ledeClassName={styles.madeByHeroLede}
    >
      <section className={styles.madeByQuoteBlock}>
        <blockquote className={styles.subpageQuote}>
          "I wanted forms as capable as code. I just didn&apos;t want to write
          them every single time."{" "}
          <span className={styles.subpageQuoteMeta}>- SHUBH</span>
        </blockquote>
      </section>

      <section className={`${styles.subpageGrid} ${styles.madeByStoryGrid}`}>
        <article className={`${styles.subpageSection} ${styles.madeByStoryCard}`}>
          <h2 className={styles.subpageSectionTitle}>The original problem</h2>
          <p className={styles.subpageSectionBody}>
            Forms kept breaking between the design, the builder, and the final
            export. Every change meant touching the code. Every integration
            meant rebuilding the delivery path. The form never stayed in one
            piece across the whole workflow.
          </p>
        </article>
        <article className={`${styles.subpageSection} ${styles.madeByStoryCard}`}>
          <h2 className={styles.subpageSectionTitle}>Why this product exists</h2>
          <p className={styles.subpageSectionBody}>
            To do everything code can do for a Framer form, without needing to
            write it. Field logic, delivery routing, styling, validation — all
            from one builder. The output is clean, paste-ready code that
            reflects exactly what was built.
          </p>
        </article>
      </section>

      <section className={`${styles.subpageSection} ${styles.madeByCoverageSection}`}>
        <h2 className={styles.subpageSectionTitle}>What the product covers</h2>
        <ul className={styles.subpageBulletList}>
          <li>Form structure that stays consistent from builder to export.</li>
          <li>Field behavior and validation without custom scripts.</li>
          <li>Delivery to Sheets and webhooks without separate integration work.</li>
          <li>Code output that does not need a rewrite after it leaves the builder.</li>
        </ul>
      </section>

      <section className={`${styles.subpageSection} ${styles.madeByContributionSection}`}>
        <h2 className={styles.subpageSectionTitle}>Want to make it better?</h2>
        <p className={styles.subpageSectionBody}>
          WHIM is open. If something is missing, broken, or could work better
          — say so or fix it directly. Every contribution makes it better for
          everyone who comes after.
        </p>
        <div className={styles.madeByActionGrid}>
          <a
            className={`${styles.secondaryButton} ${styles.madeByActionButton}`}
            href="https://github.com/soshubh/framer-form-builder"
            rel="noreferrer"
            target="_blank"
          >
            Contribute on GitHub →
          </a>
          <a
            className={`${styles.secondaryButton} ${styles.madeByActionButton}`}
            href="https://github.com/soshubh/framer-form-builder/issues"
            rel="noreferrer"
            target="_blank"
          >
            Report a bug →
          </a>
          <a
            className={`${styles.secondaryButton} ${styles.madeByActionButton}`}
            href="mailto:workforshubhsingh@gmail.com"
          >
            Share feedback →
          </a>
        </div>
      </section>
    </LandingSubpageShell>
  );
}
