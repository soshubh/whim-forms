import Link from "next/link";

import { BuilderStatePreview } from "./components/builder-state-preview";
import { CodePreviewCopyButton } from "./components/code-preview-copy-button";
import { LandingFooter } from "./components/footer";
import { marketingDisplay, marketingSans } from "./components/marketing-fonts";
import { landingNavItems } from "./components/nav-items";
import { LearnGrid } from "./components/learn-grid";
import { submitApplicationFormPreview } from "./components/submit-application-form-preview";
import { GridBackground } from "./components/GridBackground";
import { LandingTopbar } from "./components/topbar";
import styles from "./page.module.css";

function BuilderFieldPreview() {
  return (
    <form className={styles.formPreview}>
      <label className={styles.fieldStack}>
        <span className={styles.previewFieldLabel}>Name</span>
        <input
          className={styles.previewFieldControl}
          placeholder="Enter full name"
          type="text"
        />
      </label>

      <label className={styles.fieldStack}>
        <span className={styles.previewFieldLabel}>Email</span>
        <input
          className={styles.previewFieldControl}
          placeholder="Enter your work email"
          type="email"
        />
      </label>

      <label className={styles.fieldStack}>
        <span className={styles.previewFieldLabel}>Preferred service</span>
        <select
          className={`${styles.previewFieldControl} ${styles.previewFieldSelect}`}
          defaultValue=""
          required
        >
          <option disabled value="">
            Select a service
          </option>
          <option value="growth-sprint">Growth Sprint</option>
          <option value="performance-creative">Performance Creative</option>
          <option value="product-advisory">Product Advisory</option>
        </select>
      </label>

      <label className={styles.fieldStack}>
        <span className={styles.previewFieldLabel}>Send message</span>
        <textarea
          className={`${styles.previewFieldControl} ${styles.previewFieldTextarea}`}
          placeholder="Write your message"
        />
      </label>
    </form>
  );
}

function BuilderIntegrationPreview() {
  return (
    <article className={styles.codePreviewCard}>
      <header className={styles.codePreviewHeader}>
        <code className={styles.codePreviewFile}>SubmitApplicationForm.tsx</code>
        <CodePreviewCopyButton />
      </header>
      <pre className={styles.codePreviewBody}>
        <code>{submitApplicationFormPreview}</code>
      </pre>
    </article>
  );
}

export default function ProductHomePage() {
  return (
    <main
      className={`${styles.page} ${marketingSans.variable} ${marketingDisplay.variable}`}
      id="top"
    >
      <GridBackground />
      <section className={styles.hero}>
        <LandingTopbar items={landingNavItems} />
        <div className={styles.heroCopy}>
          <span className={styles.heroEyebrow}>
            Production-ready Framer forms
          </span>
          <h1>
            <span className={styles.heroFill}>Build Framer</span>{" "}
            <span className={styles.heroAccent}>Forms,</span>{" "}
            <span className={styles.heroFill}>ship production-ready.</span>
          </h1>
          <p>
            Design, preview, and export polished Framer forms with real
            validation, Google Sheets support, webhook delivery, and cleaner
            code from one builder.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/builder">
              Form Builder
            </Link>
            <span className={styles.freeChip}>Totally free</span>
          </div>
        </div>

        <div className={styles.promoBar}>
          <a className={styles.promoBarLink} href="/builder">
            Introducing interactive exports. Design forms, validate states, and
            ship production-ready code from one builder. Try it now →
          </a>
        </div>
      </section>

      <section className={styles.learnSection} id="how-it-works">
        <div className={styles.learnIntro}>
          <div className={styles.sectionTitle}>
            One system. Structure to delivery.
          </div>
          <p className={styles.sectionSubtitle}>
            One source of truth for fields, styling, behavior, and submissions.
          </p>
        </div>
        <LearnGrid
          left={
            <>
              <div className={styles.learnCardCopy}>
                <h3 className={styles.learnCardTitle}>Build the field layer</h3>
                <p className={styles.learnCardBody}>
                  Add text, email, phone, dropdowns, radios, checkboxes.
                  Control widths, layout, and responsive structure with
                  system-level logic.
                </p>
              </div>
              <div className={styles.learnCardVisual}>
                <BuilderFieldPreview />
              </div>
            </>
          }
          middle={
            <>
              <div className={styles.learnCardCopy}>
                <h3 className={styles.learnCardTitle}>
                  Ship data to the right places
                </h3>
                <p className={styles.learnCardBody}>
                  Connect directly to Google Sheets and webhooks, no need to
                  rebuild payload logic or submission handling separately.
                </p>
              </div>
              <div className={styles.learnCardVisual}>
                <BuilderStatePreview />
              </div>
            </>
          }
          right={
            <>
              <div className={styles.learnCardCopy}>
                <h3 className={styles.learnCardTitle}>Ship to destinations</h3>
                <p className={styles.learnCardBody}>
                  Export production-ready Framer JSX. Route submissions to
                  Google Sheets and webhooks without rebuilding payload logic.
                </p>
              </div>
              <div className={styles.learnCardVisual}>
                <BuilderIntegrationPreview />
              </div>
            </>
          }
        />
      </section>
      <LandingFooter />
    </main>
  );
}
