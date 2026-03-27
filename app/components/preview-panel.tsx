import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FieldEditorFrame } from "./field-editor-frame";
import { BuilderSection } from "./panel-controls";
import { FORM_FIELD_COMPONENTS } from "./form/registry";
import { PrimaryButton } from "./form/button/PrimaryButton";
import { SecondaryButton } from "./form/button/SecondaryButton";
import type { FormButtonState, FormButtonStyle } from "./form/button/types";
import type { Field, WidthOption } from "./form/types";
import { getFieldWidthForPreview, type LayoutMode, type PreviewMode } from "../lib/builder-config";

type PreviewPanelProps = {
  fields: Field[];
  layout: LayoutMode;
  previewMode: PreviewMode;
  onPreviewModeChange: (mode: PreviewMode) => void;
  selectedFieldId: string;
  draggingFieldId: string | null;
  onFieldSelect: (fieldId: string) => void;
  onFieldDragStart: (fieldId: string) => void;
  onFieldDragEnd: () => void;
  onFieldDrop: (sourceFieldId: string, targetFieldId: string) => void;
  onFieldRemove: (fieldId: string) => void;
  onFieldWidthSet: (fieldId: string, width: WidthOption) => void;
  getFieldWidthClass: (width: WidthOption, layout: LayoutMode) => string;
  styling: {
    primaryColor: string;
    surfaceColor: string;
    borderColor: string;
    textColor: string;
    labelColor: string;
    placeholderColor: string;
    radius: number;
    buttonStyle: FormButtonStyle;
  };
  integrations: {
    otpEnabled: boolean;
    sheetsEnabled: boolean;
    webhookEnabled: boolean;
    redirectEnabled: boolean;
  };
  formSettings: {
    buttonText: string;
  };
  submitState: FormButtonState;
};

export function BuilderPreviewPanel({
  fields,
  layout,
  previewMode,
  onPreviewModeChange,
  selectedFieldId,
  draggingFieldId,
  onFieldSelect,
  onFieldDragStart,
  onFieldDragEnd,
  onFieldDrop,
  onFieldRemove,
  onFieldWidthSet,
  getFieldWidthClass,
  styling,
  integrations,
  formSettings,
  submitState,
}: PreviewPanelProps) {
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [dragArmedFieldId, setDragArmedFieldId] = useState<string | null>(null);
  const [dragTargetFieldId, setDragTargetFieldId] = useState<string | null>(null);
  const [resizeState, setResizeState] = useState<{
    fieldId: string;
    startX: number;
    startWidth: WidthOption;
  } | null>(null);

  const orderedFields = useMemo(() => {
    if (!draggingFieldId || !dragTargetFieldId || draggingFieldId === dragTargetFieldId) {
      return fields;
    }

    const sourceIndex = fields.findIndex((field) => field.id === draggingFieldId);
    const targetIndex = fields.findIndex((field) => field.id === dragTargetFieldId);

    if (sourceIndex < 0 || targetIndex < 0) {
      return fields;
    }

    const nextFields = [...fields];
    const [draggedField] = nextFields.splice(sourceIndex, 1);
    nextFields.splice(targetIndex, 0, draggedField);

    return nextFields;
  }, [dragTargetFieldId, draggingFieldId, fields]);

  useEffect(() => {
    if (!resizeState) {
      return;
    }

    const widthOrder: WidthOption[] = ["third", "half", "full"];

    const handlePointerMove = (event: PointerEvent) => {
      const startIndex = widthOrder.indexOf(resizeState.startWidth);
      const stepOffset = Math.round((event.clientX - resizeState.startX) / 120);
      const nextIndex = Math.max(
        0,
        Math.min(widthOrder.length - 1, startIndex + stepOffset),
      );

      onFieldWidthSet(resizeState.fieldId, widthOrder[nextIndex]);
    };

    const handlePointerUp = () => {
      setResizeState(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [onFieldWidthSet, resizeState]);

  return (
    <BuilderSection
      title="Live Preview"
      description="The right rail mirrors the builder state instead of a static mockup."
      action={
        <Tabs
          value={previewMode}
          onValueChange={(value) => onPreviewModeChange(value as PreviewMode)}
          className="builder-device-tabs"
        >
          <TabsList className="builder-segmented-control builder-control-surface">
            <TabsTrigger value="desktop">Desktop</TabsTrigger>
            <TabsTrigger value="tablet">Tablet</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
        </Tabs>
      }
    >
      <div
        className={`builder-preview-surface builder-surface ${previewMode === "tablet" ? "is-tablet" : ""} ${previewMode === "mobile" ? "is-mobile" : ""}`}
        style={
          {
            "--preview-primary": styling.primaryColor,
            "--preview-surface": styling.surfaceColor,
            "--preview-border": styling.borderColor,
            "--preview-text": styling.textColor,
            "--preview-label": styling.labelColor,
            "--preview-placeholder": styling.placeholderColor,
            "--preview-radius": `${styling.radius}px`,
          } as CSSProperties
        }
      >
        <ScrollArea className="builder-preview-scroll">
          <div className="builder-preview-scroll-content">
          <div className={`builder-preview-form ${layout === "2-col" ? "is-two-col" : ""}`}>
            {orderedFields.map((field) => {
              const FieldComponent = FORM_FIELD_COMPONENTS[field.type];
              const effectiveWidth = getFieldWidthForPreview(field, previewMode);

              return (
                <FieldEditorFrame
                  key={field.id}
                  ref={(node) => {
                    fieldRefs.current[field.id] = node;
                  }}
                  fieldId={field.id}
                  label={field.label}
                  widthClassName={getFieldWidthClass(effectiveWidth, layout)}
                  selected={selectedFieldId === field.id}
                  dragging={draggingFieldId === field.id}
                  dropTarget={
                    Boolean(draggingFieldId) &&
                    draggingFieldId !== field.id &&
                    dragTargetFieldId === field.id
                  }
                  dragArmed={dragArmedFieldId === field.id}
                  resizeActive={resizeState?.fieldId === field.id}
                  effectiveWidth={effectiveWidth}
                  onSelect={() => onFieldSelect(field.id)}
                  onDragStart={(event) => {
                    if (dragArmedFieldId !== field.id) {
                      event.preventDefault();
                      return;
                    }

                    event.dataTransfer.effectAllowed = "move";
                    event.dataTransfer.setData("text/plain", field.id);
                    const fieldNode = fieldRefs.current[field.id];

                    if (fieldNode) {
                      event.dataTransfer.setDragImage(
                        fieldNode,
                        24,
                        Math.min(28, fieldNode.offsetHeight / 2),
                      );
                    }

                    onFieldDragStart(field.id);
                  }}
                  onDragEnd={() => {
                    setDragArmedFieldId(null);
                    setDragTargetFieldId(null);
                    onFieldDragEnd();
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();

                    if (draggingFieldId && draggingFieldId !== field.id) {
                      setDragTargetFieldId(field.id);
                    }
                  }}
                  onDrop={() => {
                    if (draggingFieldId) {
                      onFieldDrop(draggingFieldId, dragTargetFieldId ?? field.id);
                    }

                    setDragTargetFieldId(null);
                  }}
                  onArmDrag={(event) => {
                    event.stopPropagation();
                    setDragArmedFieldId(field.id);
                  }}
                  onDisarmDrag={() => setDragArmedFieldId(null)}
                  onStartResize={(event, startWidth) => {
                    event.stopPropagation();
                    setResizeState({
                      fieldId: field.id,
                      startX: event.clientX,
                      startWidth,
                    });
                  }}
                  onRemove={(event) => {
                    event.stopPropagation();
                    onFieldRemove(field.id);
                  }}
                >
                  <FieldComponent field={field} />
                </FieldEditorFrame>
              );
            })}
          </div>

          <div className="builder-preview-footer">
            {styling.buttonStyle === "outline" ? (
              <SecondaryButton label={formSettings.buttonText} state={submitState} />
            ) : (
              <PrimaryButton label={formSettings.buttonText} state={submitState} />
            )}
            <div className="builder-integration-pills">
              {integrations.otpEnabled ? <span>OTP</span> : null}
              {integrations.sheetsEnabled ? <span>Google Sheets</span> : null}
              {integrations.webhookEnabled ? <span>Webhook</span> : null}
              {integrations.redirectEnabled ? <span>Redirect</span> : null}
            </div>
          </div>
          </div>
        </ScrollArea>
      </div>
    </BuilderSection>
  );
}
