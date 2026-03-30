"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import { landingNavItems } from "./components/landing/nav-items";
import { LandingTopbar } from "./components/landing/topbar";
import { CustomActionButton } from "./components/form/button/custom-action-button";
import {
  CustomSelectControl,
  CustomTextControl,
} from "./components/form/custom-field-control";
import { Shell } from "./components/form/fields/Shell";
import styles from "./home/page.module.css";
import basicsIcon from "./03/Asset → VdjblkbBOk1T2C7rNsuElAuo3A.png.png";
import stylingIcon from "./03/Asset → fxMAHzmjNjLk3k2lQIJ0LBNRjo.png.png";
import inputsIcon from "./03/Asset → pyGJZoHZM5ovVoKUfsx4V9LJzA4.png.png";
import effectsIcon from "./03/Asset → KkC8eoTJqXzCDWuMDfb8sLZI.png.png";
import variantsIcon from "./03/Asset → tzMLs6pZFGPgfkaKLJI4EFJYsw.png.png";

const learnLinks = [
  "Basics",
  "Styling",
  "Inputs",
  "Effects",
  "Variants",
];

const learnAssets = [
  basicsIcon,
  stylingIcon,
  inputsIcon,
  effectsIcon,
  variantsIcon,
];

const previewSurfaceStyle = {
  "--preview-field-border": "rgb(255 255 255 / 0.08)",
  "--preview-field-surface": "rgb(255 255 255 / 0.03)",
  "--preview-field-text": "#f5f7fb",
  "--preview-field-label": "rgb(245 247 251 / 0.62)",
  "--preview-field-helper": "#a7dcff",
  "--preview-field-placeholder": "rgb(245 247 251 / 0.34)",
  "--preview-field-focus": "#0a62ff",
  "--preview-field-border-width": "1px",
  "--preview-field-focus-width": "1px",
  "--preview-field-radius": "16px",
  "--preview-input-padding-top": "12px",
  "--preview-input-padding-right": "14px",
  "--preview-input-padding-bottom": "12px",
  "--preview-input-padding-left": "14px",
  "--preview-input-size": "14px",
  "--preview-input-weight": "400",
  "--preview-label-size": "11px",
  "--preview-label-weight": "600",
  "--preview-helper-size": "11px",
  "--preview-helper-weight": "400",
  "--preview-control-icon-size": "13px",
  "--preview-button-radius": "999px",
  "--preview-button-border-width": "1px",
  "--preview-button-border-color": "rgb(255 255 255 / 0.72)",
  "--preview-button-text-color": "#050608",
  "--preview-primary": "#ffffff",
  "--preview-button-padding-top": "12px",
  "--preview-button-padding-right": "18px",
  "--preview-button-padding-bottom": "12px",
  "--preview-button-padding-left": "18px",
  "--preview-button-text-size": "14px",
  "--preview-button-text-weight": "600",
} as CSSProperties;

function BuilderFieldPreview() {
  return (
    <div className={styles.realBuilderSurface} style={previewSurfaceStyle}>
      <Shell label="Program" isHelperTextVisible={false}>
        <CustomSelectControl
          placeholder="Select an option"
          options={["Growth Sprint", "Performance Creative", "Product Advisory"]}
        />
      </Shell>
    </div>
  );
}

function BuilderStatePreview() {
  return (
    <div className={styles.realBuilderSurface} style={previewSurfaceStyle}>
      <div className={styles.statePreviewGrid}>
        <Shell label="Email" isHelperTextVisible={false}>
          <CustomTextControl type="email" placeholder="Enter your work email" />
        </Shell>
        <Shell
          label="Email"
          requiredMessage="Please enter a valid email address."
          isHelperTextVisible
        >
          <CustomTextControl type="email" placeholder="Enter your work email" />
        </Shell>
      </div>
      <div className={styles.realBuilderButton}>
        <CustomActionButton
          actionType="submit"
          isLabelVisible
          label="Submit Application"
          state="idle"
          variant="solid"
        />
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
            <input className="builder-app-config-input builder-app-config-color-code" value="#222222" readOnly />
            <input className="builder-app-config-input builder-app-config-color-opacity" value="100" readOnly />
            <button className="builder-app-config-color-swatch" type="button">
              <span className="builder-app-config-color-swatch-fill" style={{ background: "#222222" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
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
    body:
      "Use a broad set of inputs while keeping spacing, border logic, typography, and field states systemized. The result feels like one form product, not separate widgets stitched together.",
    cta: "Forms course",
    variant: "inputs",
  },
  {
    title: "Freeform editing",
    heading:
      "Use the canvas to shape layout, then let the system carry the details.",
    body:
      "Fields, helper copy, buttons, and integrations can be composed visually while the underlying builder keeps width behavior, defaults, and exports predictable.",
    cta: "Forms course",
    variant: "canvas",
  },
  {
    title: "Works out of the box",
    heading:
      "Move from builder to deployment without rewriting the form logic.",
    body:
      "Generated code includes styling, validation behavior, Google Sheets delivery, and webhook payload handling, so the shipped form behaves like the preview.",
    cta: "Forms course",
    variant: "setup",
  },
  {
    title: "Effects & states",
    heading:
      "Design custom focus and validation states without losing consistency.",
    body:
      "Default, focused, invalid, loading, and success states are treated as first-class parts of the form system instead of one-off visual tweaks.",
    cta: "Forms course",
    variant: "effects",
  },
  {
    title: "Reuse inputs as components",
    heading:
      "Turn repeated field patterns into a reusable form design system.",
    body:
      "Normalize dropdowns, phone inputs, helper behavior, and button surfaces so every form on the site inherits the same language with fewer overrides.",
    cta: "Forms course",
    variant: "components",
  },
  {
    title: "Google Sheets integration",
    heading:
      "Send submissions into a clean sheet without breaking field mappings.",
    body:
      "Export payloads that line up with generated Apps Script, so the data collected in the browser lands in the right columns with minimal setup.",
    cta: "Forms course",
    variant: "sheets",
  },
  {
    title: "Webhooks",
    heading:
      "Connect forms to Zapier and downstream tools with structured payloads.",
    body:
      "Use webhooks to route submissions into CRMs, automations, notifications, and support flows while keeping export logic readable and production-ready.",
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
  return (
    <main className={styles.page} id="top">
      <section className={styles.hero}>
        <LandingTopbar items={landingNavItems} />

        <div className={styles.heroCopy}>
          <h1>
            <span className={styles.heroFill}>Build Framer</span>{" "}
            <span className={styles.heroOutline}>Forms,</span>{" "}
            <span className={styles.heroFill}>ship production-ready.</span>
          </h1>
          <p>
            Design, preview, and export polished Framer forms with real validation,
            Google Sheets support, webhook delivery, and cleaner code from one builder.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/builder">
              Form Builder
            </Link>
            <span className={styles.freeChip}>Totally free</span>
          </div>
        </div>

        <div className={styles.heroStage}>
          <div className={styles.heroArtwork}>
            <div className={styles.heroGlow} />

            <div className={styles.learnOverlay}>
              <div className={styles.learnColumn}>
                <div className={styles.overlayLabel}>Watch and learn</div>
              </div>
              <div className={styles.learnColumn}>
                <div className={styles.overlayLabel}>Start in seconds</div>
              </div>
            </div>

            <div className={styles.learnCards}>
              {learnLinks.map((item, index) => (
                <div className={styles.learnCard} key={item}>
                  <div className={styles.learnCardIcon}>
                    <Image
                      alt=""
                      className={styles.learnCardImage}
                      src={learnAssets[index]}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.learnCardLabels}>
              {learnLinks.map((item) => (
                <div className={styles.learnCardLabel} key={item}>
                  <span className={styles.playMark}>▷</span>
                  {item}
                </div>
              ))}
            </div>

            <div className={styles.heroDevice}>
              <div className={styles.heroDeviceTop} />
              <div className={styles.heroDeviceCanvas}>
                <VisualMock variant="setup" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.learnSection} id="how-it-works">
        <div className={styles.learnIntro}>
          <div className={styles.sectionEyebrow}>Watch and learn</div>
          <div className={styles.sectionTitle}>Start in seconds</div>
        </div>
        <div className={styles.learnLinks}>
          {learnLinks.map((item) => (
            <a className={styles.learnPill} href="#story" key={item}>
              {item}
            </a>
          ))}
        </div>
      </section>

      <section className={styles.featureStripSection} id="made-for">
        {featureStrip.map((item) => (
          <article className={styles.featureStripCard} key={item.title}>
            <div className={styles.cardEyebrow}>{item.eyebrow}</div>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            <div className={styles.featureVisual}>
              <VisualMock variant={item.variant} />
            </div>
          </article>
        ))}
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
