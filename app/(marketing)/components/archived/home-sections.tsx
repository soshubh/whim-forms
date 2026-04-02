import type { ReactNode } from "react";

import styles from "../../page.module.css";

import { BuilderStatePreview } from "../builder-state-preview";

export function ArchivedBuilderInspectorPreview() {
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

export const archivedFeatureStrip = [
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
] as const;

export const archivedStorySections = [
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
] as const;

type ArchivedVisualMockProps = {
  variant: string;
  fieldPreview: ReactNode;
};

export function ArchivedVisualMock({
  variant,
  fieldPreview,
}: ArchivedVisualMockProps) {
  if (variant === "inputs") {
    return <div className={styles.mockPanel}>{fieldPreview}</div>;
  }

  if (variant === "editing") {
    return (
      <div className={styles.mockPanel}>
        <ArchivedBuilderInspectorPreview />
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
