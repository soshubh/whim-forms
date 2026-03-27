"use client";

import { useMemo, useState } from "react";

import { ControlSheet } from "./components/control-sheet";
import { BuilderExportPanel } from "./components/export-panel";
import { Navigation } from "./components/navigation";
import { BuilderPreviewPanel } from "./components/preview-panel";
import type { SubmitButtonState } from "./components/form/SubmitButton";
import type { Field, FieldType, WidthOption } from "./components/form/types";
import {
  DEFAULT_CONFIG,
  defaultField,
  fieldWidthClass,
  getLayoutForPreview,
  type ControlPanel,
  type PreviewMode,
} from "./lib/builder-config";
import {
  generateAppsScript,
  generateFramerComponent,
  generateSetupInstructions,
} from "./lib/code-generators";

export default function Home() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [selectedFieldId, setSelectedFieldId] = useState(
    DEFAULT_CONFIG.fields[0]?.id ?? "",
  );
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [copiedState, setCopiedState] = useState("");
  const [draggingFieldId, setDraggingFieldId] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<ControlPanel>(null);
  const [previewSubmitState] = useState<SubmitButtonState>("idle");

  const selectedField =
    config.fields.find((field) => field.id === selectedFieldId) ??
    config.fields[0];
  const activeLayout = getLayoutForPreview(config.styling, previewMode);

  const generatedFramerCode = useMemo(
    () => generateFramerComponent(config),
    [config],
  );
  const generatedAppsScript = useMemo(
    () => generateAppsScript(config),
    [config],
  );
  const generatedSetup = useMemo(
    () => generateSetupInstructions(config),
    [config],
  );

  const updateField = <K extends keyof Field>(
    id: string,
    key: K,
    value: Field[K],
  ) => {
    setConfig((current) => ({
      ...current,
      fields: current.fields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field,
      ),
    }));
  };

  const addField = (type: FieldType) => {
    const newField = defaultField(type, config.fields.length);
    setConfig((current) => ({
      ...current,
      fields: [...current.fields, newField],
    }));
    setSelectedFieldId(newField.id);
  };

  const moveFieldTo = (sourceId: string, targetId: string) => {
    const sourceIndex = config.fields.findIndex(
      (field) => field.id === sourceId,
    );
    const targetIndex = config.fields.findIndex(
      (field) => field.id === targetId,
    );

    if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) {
      return;
    }

    const fields = [...config.fields];
    const [field] = fields.splice(sourceIndex, 1);
    fields.splice(targetIndex, 0, field);

    setConfig((current) => ({ ...current, fields }));
  };

  const removeField = (id: string) => {
    const fields = config.fields.filter((field) => field.id !== id);
    setConfig((current) => ({ ...current, fields }));

    if (selectedFieldId === id && fields.length > 0) {
      setSelectedFieldId(fields[0].id);
    }
  };

  const setFieldWidth = (id: string, nextWidth: WidthOption) => {
    setConfig((current) => ({
      ...current,
      fields: current.fields.map((field) => {
        if (field.id !== id) {
          return field;
        }

        if (previewMode === "tablet") {
          return { ...field, tabletWidth: nextWidth };
        }

        if (previewMode === "mobile") {
          return { ...field, mobileWidth: nextWidth };
        }

        return { ...field, width: nextWidth };
      }),
    }));
  };

  const copyText = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedState(label);
    window.setTimeout(() => setCopiedState(""), 1800);
  };

  return (
    <main className="builder-shell">
      <div className="builder-workspace">
        <div className="builder-preview-panel">
          <BuilderPreviewPanel
            fields={config.fields}
            layout={activeLayout}
            previewMode={previewMode}
            onPreviewModeChange={setPreviewMode}
            selectedFieldId={selectedFieldId}
            draggingFieldId={draggingFieldId}
            onFieldSelect={setSelectedFieldId}
            onFieldDragStart={(fieldId) => {
              setDraggingFieldId(fieldId);
              setSelectedFieldId(fieldId);
            }}
            onFieldDragEnd={() => setDraggingFieldId(null)}
            onFieldDrop={(targetFieldId) => {
              if (draggingFieldId) {
                moveFieldTo(draggingFieldId, targetFieldId);
                setDraggingFieldId(null);
              }
            }}
            onFieldRemove={removeField}
            onFieldWidthSet={setFieldWidth}
            getFieldWidthClass={fieldWidthClass}
            styling={config.styling}
            integrations={config.integrations}
            formSettings={config.formSettings}
            submitState={previewSubmitState}
          />

          <BuilderExportPanel
            copiedState={copiedState}
            onCopy={copyText}
            generatedFramerCode={generatedFramerCode}
            generatedAppsScript={generatedAppsScript}
            generatedSetup={generatedSetup}
          />
        </div>
      </div>

      {activePanel ? (
        <div className="builder-control-modal">
          <ControlSheet
            activePanel={activePanel}
            config={config}
            selectedField={selectedField}
            addField={addField}
            updateField={updateField}
            setConfig={setConfig}
            onClose={() => setActivePanel(null)}
            previewMode={previewMode}
          />
        </div>
      ) : null}

      <Navigation
        activePanel={activePanel}
        hasSelectedField={Boolean(selectedField)}
        onChange={(panel) =>
          setActivePanel((current) => (current === panel ? null : panel))
        }
      />
    </main>
  );
}
