import { BuilderSection } from "./panel-controls";

type ExportPanelProps = {
  copiedState: string;
  onCopy: (label: string, value: string) => void;
  generatedFramerCode: string;
  generatedAppsScript: string;
  generatedSetup: string;
};

export function BuilderExportPanel({
  copiedState,
  onCopy,
  generatedFramerCode,
  generatedAppsScript,
  generatedSetup,
}: ExportPanelProps) {
  return (
    <BuilderSection title="Export Output" description="Copy the exact artifacts a Framer user needs to ship.">
      <div className="builder-code-grid">
        <article className="builder-code-card">
          <header>
            <div className="builder-code-card-title">
              <h3>Framer Component.jsx</h3>
              <span>Live generated</span>
            </div>
            <button
              type="button"
              className="builder-code-copy"
              onClick={() => onCopy("framer", generatedFramerCode)}
              aria-label="Copy Framer component code"
              title={copiedState === "framer" ? "Copied" : "Copy code"}
            >
              {copiedState === "framer" ? "✓" : "⧉"}
            </button>
          </header>
          <pre>{generatedFramerCode}</pre>
        </article>
        <article className="builder-code-card">
          <header>
            <div className="builder-code-card-title">
              <h3>GoogleScript.gs</h3>
              <span>Conditional export</span>
            </div>
            <button
              type="button"
              className="builder-code-copy"
              onClick={() => onCopy("script", generatedAppsScript)}
              aria-label="Copy Google Apps Script"
              title={copiedState === "script" ? "Copied" : "Copy code"}
            >
              {copiedState === "script" ? "✓" : "⧉"}
            </button>
          </header>
          <pre>{generatedAppsScript}</pre>
        </article>
        <article className="builder-code-card">
          <header>
            <div className="builder-code-card-title">
              <h3>Setup Instructions.md</h3>
              <span>Hand-off ready</span>
            </div>
            <button
              type="button"
              className="builder-code-copy"
              onClick={() => onCopy("setup", generatedSetup)}
              aria-label="Copy setup instructions"
              title={copiedState === "setup" ? "Copied" : "Copy code"}
            >
              {copiedState === "setup" ? "✓" : "⧉"}
            </button>
          </header>
          <pre>{generatedSetup}</pre>
        </article>
      </div>
    </BuilderSection>
  );
}
