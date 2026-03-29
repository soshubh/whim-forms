"use client";

import { BuilderModePanel } from "./builder-panel";
import { CodeModePanel } from "./code-panel";
import { SettingsModePanel } from "./settings-panel";
import type { BuilderRightPanelProps } from "./types";

export function BuilderRightPanel({
  mode,
  activeTab,
  config,
  copiedState,
  generatedAppsScript,
  generatedFramerCode,
  previewMode,
  selectedField,
  selectedButton,
  onCopy,
  onTabChange,
  onConfigChange,
  onFieldUpdate,
  onFieldTypeChange,
  onFieldWidthSet,
  onButtonUpdate,
  onButtonTypeChange,
  onButtonWidthSet,
}: BuilderRightPanelProps) {
  return (
    <aside className="builder-app-right-panel">
      {mode === "builder" ? (
        <BuilderModePanel
          activeTab={activeTab}
          previewMode={previewMode}
          selectedField={selectedField}
          selectedButton={selectedButton}
          onTabChange={onTabChange}
          onFieldUpdate={onFieldUpdate}
          onFieldTypeChange={onFieldTypeChange}
          onFieldWidthSet={onFieldWidthSet}
          onButtonUpdate={onButtonUpdate}
          onButtonTypeChange={onButtonTypeChange}
          onButtonWidthSet={onButtonWidthSet}
        />
      ) : null}

      {mode === "code" ? (
        <CodeModePanel
          activeTab={activeTab}
          copiedState={copiedState}
          generatedAppsScript={generatedAppsScript}
          generatedFramerCode={generatedFramerCode}
          onCopy={onCopy}
          onTabChange={onTabChange}
        />
      ) : null}

      {mode === "settings" || mode === "advanced" ? (
        <SettingsModePanel
          variant={mode === "advanced" ? "advanced" : "basic"}
          activeTab={activeTab}
          config={config}
          previewMode={previewMode}
          onTabChange={onTabChange}
          onConfigChange={onConfigChange}
        />
      ) : null}
    </aside>
  );
}
