"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { ControlSheet } from "./components/control-sheet";
import { BuilderExportPanel } from "./components/export-panel";
import { Navigation } from "./components/navigation";
import { BuilderPreviewPanel } from "./components/preview-panel";
import type { FormButtonState } from "./components/form/button/types";
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
  const [previewSubmitState] = useState<FormButtonState>("idle");
  const [workspaceOrientation, setWorkspaceOrientation] = useState<
    "horizontal" | "vertical"
  >("horizontal");

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

  useEffect(() => {
    const updateOrientation = () => {
      setWorkspaceOrientation(window.innerWidth <= 1180 ? "vertical" : "horizontal");
    };

    updateOrientation();
    window.addEventListener("resize", updateOrientation);

    return () => window.removeEventListener("resize", updateOrientation);
  }, []);

  const sheetMeta = (() => {
    switch (activePanel) {
      case "add":
        return {
          title: "Add Field",
          description: "Choose the next field you want to insert into the form.",
        };
      case "edit":
        return {
          title: "Field Settings",
          description:
            "Edit copy, validation, and choice options for the selected field.",
        };
      case "integrations":
        return {
          title: "Integrations",
          description:
            "Keep delivery targets close to the form configuration so exports stay aligned.",
        };
      case "form":
        return {
          title: "Form Settings",
          description:
            "Define the top-level content that gets reused in the export output.",
        };
      case "style":
        return {
          title: "Styling Controls",
          description:
            "These tokens drive both the preview and generated code defaults.",
        };
      default:
        return null;
    }
  })();

  return (
    <main className="builder-shell">
      <div className="builder-workspace">
        <ResizablePanelGroup
          orientation={workspaceOrientation}
          className="builder-preview-panel"
        >
          <ResizablePanel
            defaultSize={workspaceOrientation === "horizontal" ? 58 : 60}
            minSize={workspaceOrientation === "horizontal" ? 40 : 30}
          >
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
              onFieldDrop={(sourceFieldId, targetFieldId) => {
                moveFieldTo(sourceFieldId, targetFieldId);
                setDraggingFieldId(null);
              }}
              onFieldRemove={removeField}
              onFieldWidthSet={setFieldWidth}
              getFieldWidthClass={fieldWidthClass}
              styling={config.styling}
              integrations={config.integrations}
              formSettings={config.formSettings}
              submitState={previewSubmitState}
            />
          </ResizablePanel>
          <ResizableHandle className="builder-workspace-handle" />
          <ResizablePanel
            defaultSize={workspaceOrientation === "horizontal" ? 42 : 40}
            minSize={workspaceOrientation === "horizontal" ? 28 : 24}
          >
            <BuilderExportPanel
              copiedState={copiedState}
              onCopy={copyText}
              generatedFramerCode={generatedFramerCode}
              generatedAppsScript={generatedAppsScript}
              generatedSetup={generatedSetup}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <Sheet open={Boolean(activePanel)} onOpenChange={(open) => !open && setActivePanel(null)}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="builder-control-modal-sheet"
        >
          {sheetMeta ? (
            <>
              <SheetTitle className="sr-only">{sheetMeta.title}</SheetTitle>
              <SheetDescription className="sr-only">
                {sheetMeta.description}
              </SheetDescription>
            </>
          ) : null}
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
        </SheetContent>
      </Sheet>

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
