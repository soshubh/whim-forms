import { useEffect, useRef, useState, type CSSProperties } from "react";
import DragIndicatorRounded from "@mui/icons-material/DragIndicatorRounded";

import { BuilderSection } from "./panel-controls";
import { FORM_FIELD_COMPONENTS } from "./form/registry";
import { SubmitButton, type SubmitButtonState, type SubmitButtonVariant } from "./form/SubmitButton";
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
  onFieldDrop: (targetFieldId: string) => void;
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
    buttonStyle: SubmitButtonVariant;
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
  submitState: SubmitButtonState;
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
  const [resizeState, setResizeState] = useState<{
    fieldId: string;
    startX: number;
    startWidth: WidthOption;
  } | null>(null);

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
        <div className="builder-segmented-control">
          <button type="button" className={previewMode === "desktop" ? "is-active" : ""} onClick={() => onPreviewModeChange("desktop")}>
            Desktop
          </button>
          <button type="button" className={previewMode === "tablet" ? "is-active" : ""} onClick={() => onPreviewModeChange("tablet")}>
            Tablet
          </button>
          <button type="button" className={previewMode === "mobile" ? "is-active" : ""} onClick={() => onPreviewModeChange("mobile")}>
            Mobile
          </button>
        </div>
      }
    >
      <div
        className={`builder-preview-surface ${previewMode === "tablet" ? "is-tablet" : ""} ${previewMode === "mobile" ? "is-mobile" : ""}`}
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
        <div className={`builder-preview-form ${layout === "2-col" ? "is-two-col" : ""}`}>
          {fields.map((field) => {
            const FieldComponent = FORM_FIELD_COMPONENTS[field.type];
            const effectiveWidth = getFieldWidthForPreview(field, previewMode);

            return (
              <div
                key={field.id}
                ref={(node) => {
                  fieldRefs.current[field.id] = node;
                }}
                className={`builder-field ${getFieldWidthClass(effectiveWidth, layout)} ${
                  selectedFieldId === field.id ? "is-selected" : ""
                } ${draggingFieldId === field.id ? "is-dragging" : ""}`}
                draggable={dragArmedFieldId === field.id}
                onClick={() => onFieldSelect(field.id)}
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
                  onFieldDragEnd();
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => onFieldDrop(field.id)}
              >
                <button
                  type="button"
                  className="builder-field-reorder-handle"
                  aria-label={`Drag ${field.label}`}
                  onClick={(event) => event.stopPropagation()}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                    setDragArmedFieldId(field.id);
                  }}
                  onPointerUp={() => setDragArmedFieldId(null)}
                  onPointerCancel={() => setDragArmedFieldId(null)}
                >
                  <DragIndicatorRounded fontSize="small" />
                </button>
                <button
                  type="button"
                  className={`builder-field-resize-handle ${
                    resizeState?.fieldId === field.id ? "is-active" : ""
                  }`}
                  aria-label={`Resize ${field.label}`}
                  onClick={(event) => event.stopPropagation()}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                    setResizeState({
                      fieldId: field.id,
                      startX: event.clientX,
                      startWidth: effectiveWidth,
                    });
                  }}
                >
                  <span />
                  <span />
                </button>
                <button
                  type="button"
                  className="builder-field-remove"
                  aria-label={`Remove ${field.label}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onFieldRemove(field.id);
                  }}
                >
                  ×
                </button>
                <FieldComponent field={field} />
              </div>
            );
          })}
        </div>

        <div className="builder-preview-footer">
          <SubmitButton label={formSettings.buttonText} variant={styling.buttonStyle} state={submitState} />
          <div className="builder-integration-pills">
            {integrations.otpEnabled ? <span>OTP</span> : null}
            {integrations.sheetsEnabled ? <span>Google Sheets</span> : null}
            {integrations.webhookEnabled ? <span>Webhook</span> : null}
            {integrations.redirectEnabled ? <span>Redirect</span> : null}
          </div>
        </div>
      </div>
    </BuilderSection>
  );
}
