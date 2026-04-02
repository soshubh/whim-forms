"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { landingNavItems } from "./components/nav-items";
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

function BuilderStatePreview() {
  const [toggleStates, setToggleStates] = useState({
    otp: true,
    sheets: true,
    webhook: true,
    redirect: false,
  });

  const toggleItem = (key: keyof typeof toggleStates) => {
    setToggleStates((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div className={styles.toggleList}>
      <div className={styles.toggleRow}>
        <div className={styles.toggleCopy}>
          <div className={styles.toggleLabel}>Enable OTP verification</div>
          <div className={styles.toggleDescription}>
            Verify mobile submissions before form send.
          </div>
        </div>
        <button
          aria-pressed={toggleStates.otp}
          className={`${styles.toggleSwitch} ${toggleStates.otp ? styles.toggleSwitchEnabled : ""}`}
          onClick={() => toggleItem("otp")}
          type="button"
        >
          <span className={styles.toggleKnob} />
        </button>
      </div>
      <div className={styles.toggleRow}>
        <div className={styles.toggleCopy}>
          <div className={styles.toggleLabel}>Enable Google Sheets</div>
          <div className={styles.toggleDescription}>
            Sync submissions into a connected sheet automatically.
          </div>
        </div>
        <button
          aria-pressed={toggleStates.sheets}
          className={`${styles.toggleSwitch} ${toggleStates.sheets ? styles.toggleSwitchEnabled : ""}`}
          onClick={() => toggleItem("sheets")}
          type="button"
        >
          <span className={styles.toggleKnob} />
        </button>
      </div>
      <div className={styles.toggleRow}>
        <div className={styles.toggleCopy}>
          <div className={styles.toggleLabel}>Enable data webhook</div>
          <div className={styles.toggleDescription}>
            Send structured payloads to your backend endpoint.
          </div>
        </div>
        <button
          aria-pressed={toggleStates.webhook}
          className={`${styles.toggleSwitch} ${toggleStates.webhook ? styles.toggleSwitchEnabled : ""}`}
          onClick={() => toggleItem("webhook")}
          type="button"
        >
          <span className={styles.toggleKnob} />
        </button>
      </div>
      <div className={styles.toggleRow}>
        <div className={styles.toggleCopy}>
          <div className={styles.toggleLabel}>Enable redirect on submit</div>
          <div className={styles.toggleDescription}>
            Take visitors to a destination after successful submit.
          </div>
        </div>
        <button
          aria-pressed={toggleStates.redirect}
          className={`${styles.toggleSwitch} ${toggleStates.redirect ? styles.toggleSwitchEnabled : ""}`}
          onClick={() => toggleItem("redirect")}
          type="button"
        >
          <span className={styles.toggleKnob} />
        </button>
      </div>
    </div>
  );
}

function BuilderInspectorPreview() {
  return (
    <div className={styles.realBuilderInspector}>
      <div className="builder-app-config-group">
        <div className="builder-app-config-group-title">Layout</div>
        <div className="builder-app-config-row">
          <div className="builder-app-config-row-label">Desktop layout</div>
          <select className="builder-app-config-select" defaultValue="2-col">
            <option value="2-col">2 column</option>
          </select>
        </div>
        <div className="builder-app-config-row">
          <div className="builder-app-config-row-label">Button style</div>
          <select className="builder-app-config-select" defaultValue="solid">
            <option value="solid">Solid</option>
          </select>
        </div>
      </div>
      <div className="builder-app-config-group">
        <div className="builder-app-config-group-title">Theme</div>
        <div className="builder-app-config-row">
          <div className="builder-app-config-row-label">Field surface</div>
          <div className="builder-app-config-color-control">
            <input
              className="builder-app-config-input builder-app-config-color-code"
              value="#222222"
              readOnly
            />
            <input
              className="builder-app-config-input builder-app-config-color-opacity"
              value="100"
              readOnly
            />
            <button className="builder-app-config-color-swatch" type="button">
              <span
                className="builder-app-config-color-swatch-fill"
                style={{ background: "#222222" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuilderIntegrationPreview() {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsCopied(false);
    }, 1400);

    return () => window.clearTimeout(timeout);
  }, [isCopied]);

  return (
    <article className={styles.codePreviewCard}>
      <header className={styles.codePreviewHeader}>
        <code className={styles.codePreviewFile}>SubmitApplicationForm.tsx</code>
        <button
          className={`${styles.codePreviewCopy} ${isCopied ? styles.codePreviewCopyActive : ""}`}
          onClick={() => setIsCopied(true)}
          type="button"
        >
          {isCopied ? "Code copied" : "Copy"}
        </button>
      </header>
      <pre className={styles.codePreviewBody}>
        <code>
          {submitApplicationFormPreview.split("\n").map((line, index) => (
            <span className={styles.codeLine} key={`${index}-${line}`}>
              {line || " "}
            </span>
          ))}
        </code>
      </pre>
    </article>
  );
}

const featureStrip = [
  {
    eyebrow: "Tons of input types",
    title: "Build the exact form you need with a wide field set.",
    body: "Use text, email, phone, dropdowns, radios, checkboxes, and long-form inputs without breaking the visual system.",
    variant: "inputs",
  },
  {
    eyebrow: "Freeform editing",
    title: "Compose layouts with design-tool flexibility.",
    body: "Arrange fields, actions, and copy visually while the builder keeps spacing, widths, and surfaces structured.",
    variant: "editing",
  },
  {
    eyebrow: "Works out of the box",
    title: "Start collecting submissions without wiring every detail manually.",
    body: "Export Framer code, sheet destinations, and webhook payloads that are already aligned with the preview.",
    variant: "delivery",
  },
  {
    eyebrow: "Effects & states",
    title: "Focus, invalid, loading, and success states are part of the build.",
    body: "Your exported forms reflect real interaction states instead of leaving the behavior as an afterthought.",
    variant: "states",
  },
];

const storySections = [
  {
    title: "Input types",
    heading:
      "Design your ideal form with flexible field types and consistent control surfaces.",
    body: "Use a broad set of inputs while keeping spacing, border logic, typography, and field states systemized. The result feels like one form product, not separate widgets stitched together.",
    cta: "Forms course",
    variant: "inputs",
  },
  {
    title: "Freeform editing",
    heading:
      "Use the canvas to shape layout, then let the system carry the details.",
    body: "Fields, helper copy, buttons, and integrations can be composed visually while the underlying builder keeps width behavior, defaults, and exports predictable.",
    cta: "Forms course",
    variant: "canvas",
  },
  {
    title: "Works out of the box",
    heading:
      "Move from builder to deployment without rewriting the form logic.",
    body: "Generated code includes styling, validation behavior, Google Sheets delivery, and webhook payload handling, so the shipped form behaves like the preview.",
    cta: "Forms course",
    variant: "setup",
  },
  {
    title: "Effects & states",
    heading:
      "Design custom focus and validation states without losing consistency.",
    body: "Default, focused, invalid, loading, and success states are treated as first-class parts of the form system instead of one-off visual tweaks.",
    cta: "Forms course",
    variant: "effects",
  },
  {
    title: "Reuse inputs as components",
    heading: "Turn repeated field patterns into a reusable form design system.",
    body: "Normalize dropdowns, phone inputs, helper behavior, and button surfaces so every form on the site inherits the same language with fewer overrides.",
    cta: "Forms course",
    variant: "components",
  },
  {
    title: "Google Sheets integration",
    heading:
      "Send submissions into a clean sheet without breaking field mappings.",
    body: "Export payloads that line up with generated Apps Script, so the data collected in the browser lands in the right columns with minimal setup.",
    cta: "Forms course",
    variant: "sheets",
  },
  {
    title: "Webhooks",
    heading:
      "Connect forms to Zapier and downstream tools with structured payloads.",
    body: "Use webhooks to route submissions into CRMs, automations, notifications, and support flows while keeping export logic readable and production-ready.",
    cta: "Forms course",
    variant: "webhooks",
  },
];

function VisualMock({ variant }: { variant: string }) {
  if (variant === "inputs") {
    return (
      <div className={styles.mockPanel}>
        <BuilderFieldPreview />
      </div>
    );
  }

  if (variant === "editing") {
    return (
      <div className={styles.mockPanel}>
        <BuilderInspectorPreview />
      </div>
    );
  }

  if (variant === "delivery" || variant === "setup" || variant === "sheets") {
    return (
      <div className={styles.mockPanel}>
        <div className={styles.integrationCard}>
          <div className={styles.integrationHeader}>
            <span>Form Builder</span>
            <span className={styles.statusPill}>Ready</span>
          </div>
          <div className={styles.integrationFlow}>
            <div className={styles.flowNode}>Form</div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowNode}>Google Sheets</div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowNode}>Webhook</div>
          </div>
          <div className={styles.sheetPreview}>
            <div className={styles.sheetRow}>
              <span>Submitted At</span>
              <span>First Name</span>
              <span>Program</span>
            </div>
            <div className={styles.sheetRowMuted}>
              <span>2026-03-30</span>
              <span>Jane</span>
              <span>Growth Sprint</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "states" || variant === "effects") {
    return (
      <div className={styles.mockPanel}>
        <BuilderStatePreview />
      </div>
    );
  }

  if (variant === "canvas" || variant === "components") {
    return (
      <div className={styles.mockPanel}>
        <div className={styles.componentCard}>
          <div className={styles.componentSidebar}>
            <div>Form</div>
            <div>Component</div>
            <div>Variant</div>
          </div>
          <div className={styles.componentPreview}>
            <div className={styles.componentTitle}>Newsletter</div>
            <div className={styles.componentSubtitle}>
              Get the latest product updates and launch notes.
            </div>
            <div className={styles.mockInput}>Email</div>
            <div className={styles.mockSubmit}>Sign up</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mockPanel}>
      <div className={styles.webhookCard}>
        <div className={styles.webhookBlock}>
          <div className={styles.webhookTitle}>Webhook Trigger</div>
          <div className={styles.webhookText}>
            User submits a form on a Framer site.
          </div>
        </div>
        <div className={styles.flowArrowLarge}>→</div>
        <div className={styles.webhookBlock}>
          <div className={styles.webhookTitle}>Action</div>
          <div className={styles.webhookText}>
            Zapier adds the user’s information to the selected workflow.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductHomePage() {
  const referenceCardRef = useRef<HTMLElement | null>(null);
  const [referenceCardHeight, setReferenceCardHeight] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const referenceCard = referenceCardRef.current;

    if (!referenceCard) {
      return;
    }

    const updateHeight = () => {
      setReferenceCardHeight(referenceCard.getBoundingClientRect().height);
    };

    updateHeight();

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(referenceCard);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <main className={styles.page} id="top">
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
        <div
          className={styles.learnGrid}
          style={
            referenceCardHeight
              ? ({
                  "--learn-reference-height": `${referenceCardHeight}px`,
                } as CSSProperties)
              : undefined
          }
        >
          <article className={`${styles.learnCard} ${styles.learnCardMatchReference}`}>
            <div className={styles.learnCardCopy}>
              <h3 className={styles.learnCardTitle}>Build the field layer</h3>
              <p className={styles.learnCardBody}>
                Add text, email, phone, dropdowns, radios, checkboxes. Control
                widths, layout, and responsive structure with system-level
                logic.
              </p>
            </div>
            <div className={styles.learnCardVisual}>
              <BuilderFieldPreview />
            </div>
          </article>
          <article className={styles.learnCard} ref={referenceCardRef}>
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
          </article>
          <article className={`${styles.learnCard} ${styles.learnCardMatchReference}`}>
            <div className={styles.learnCardCopy}>
              <h3 className={styles.learnCardTitle}>Ship to destinations</h3>
              <p className={styles.learnCardBody}>
                Export production-ready Framer JSX. Route submissions to Google
                Sheets and webhooks without rebuilding payload logic.
              </p>
            </div>
            <div className={styles.learnCardVisual}>
              <BuilderIntegrationPreview />
            </div>
          </article>
        </div>
      </section>

      <section className={styles.storySection} id="made-by">
        {storySections.map((section, index) => (
          <article
            className={`${styles.storyRow} ${index % 2 === 1 ? styles.storyRowReverse : ""}`}
            key={section.heading}
          >
            <div className={styles.storyCopy}>
              <div className={styles.sectionEyebrow}>{section.title}</div>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
              <a className={styles.storyLink} href="#top">
                {section.cta}
              </a>
            </div>
            <div className={styles.storyVisual}>
              <VisualMock variant={section.variant} />
            </div>
          </article>
        ))}
      </section>

      <section className={styles.footerCta} id="updates">
        <div className={styles.footerCard}>
          <div className={styles.footerEyebrow}>Design bold. Launch fast.</div>
          <div className={styles.footerActions}>
            <Link className={styles.primaryButton} href="/builder">
              Start for free
            </Link>
            <Link className={styles.secondaryButton} href="/builder">
              Open builder
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
