import type { Dispatch, SetStateAction } from "react";
import InfoOutlineRounded from "@mui/icons-material/InfoOutlineRounded";
import { XIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import {
  BuilderCheckbox,
  BuilderRange,
  BuilderSection,
  BuilderSelect,
  BuilderTextInput,
  BuilderTextarea,
  BuilderToggleCard,
} from "./panel-controls";
import {
  FIELD_LIBRARY,
  getLayoutForPreview,
  type BuilderConfig,
  type ControlPanel,
  type LayoutMode,
  type PreviewMode,
} from "../lib/builder-config";
import type { Field, FieldType } from "./form/types";

type ControlSheetProps = {
  activePanel: ControlPanel;
  config: BuilderConfig;
  selectedField?: Field;
  addField: (type: FieldType) => void;
  updateField: <K extends keyof Field>(id: string, key: K, value: Field[K]) => void;
  setConfig: Dispatch<SetStateAction<BuilderConfig>>;
  onClose: () => void;
  previewMode: PreviewMode;
};

export function ControlSheet({
  activePanel,
  config,
  selectedField,
  addField,
  updateField,
  setConfig,
  onClose,
  previewMode,
}: ControlSheetProps) {
  const closeAction = (
    <Button
      variant="ghost"
      size="icon-sm"
      className="builder-section-close builder-surface builder-icon-button"
      aria-label="Close controls"
      onClick={onClose}
    >
      <XIcon />
    </Button>
  );

  if (activePanel === "add") {
    return (
      <BuilderSection
        title="Add Field"
        description="Choose the next field you want to insert into the form."
        action={closeAction}
      >
        <div className="builder-library">
          {FIELD_LIBRARY.map((item) => (
            <button key={item.type} type="button" className="builder-library-item builder-surface" onClick={() => addField(item.type)}>
              <span className="builder-library-item-row">
                <span>{item.label}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className="builder-library-item-info builder-icon-button"
                      aria-label={item.description}
                    >
                      <InfoOutlineRounded fontSize="inherit" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={8}>
                    {item.description}
                  </TooltipContent>
                </Tooltip>
              </span>
            </button>
          ))}
        </div>
      </BuilderSection>
    );
  }

  if (activePanel === "edit" && selectedField) {
    return (
      <BuilderSection
        title="Field Settings"
        description="Edit copy, validation, and choice options for the selected field."
        action={closeAction}
      >
        <div className="builder-form-grid">
          <BuilderTextInput label="Label" value={selectedField.label} onChange={(value) => updateField(selectedField.id, "label", value)} />
          {selectedField.type !== "checkbox" ? (
            <BuilderTextInput
              label="Placeholder"
              value={selectedField.placeholder ?? ""}
              onChange={(value) => updateField(selectedField.id, "placeholder", value)}
            />
          ) : null}
          <BuilderTextInput
            label="Validation Message"
            value={selectedField.validationMessage ?? ""}
            onChange={(value) => updateField(selectedField.id, "validationMessage", value)}
          />
          <BuilderCheckbox
            label="Required field"
            checked={selectedField.required}
            onChange={(checked) => updateField(selectedField.id, "required", checked)}
          />
          <BuilderCheckbox
            label="Show label"
            checked={selectedField.isLabelVisible ?? true}
            onChange={(checked) =>
              updateField(selectedField.id, "isLabelVisible", checked)
            }
          />
          <BuilderCheckbox
            label="Show required star"
            checked={selectedField.isRequiredVisible ?? true}
            onChange={(checked) =>
              updateField(selectedField.id, "isRequiredVisible", checked)
            }
          />
          <BuilderCheckbox
            label="Show helper text"
            checked={selectedField.isHelperTextVisible ?? true}
            onChange={(checked) =>
              updateField(selectedField.id, "isHelperTextVisible", checked)
            }
          />
          {selectedField.type === "select" || selectedField.type === "radio" ? (
            <BuilderTextarea
              label="Options"
              rows={4}
              className="builder-full-span"
              value={(selectedField.options ?? []).join("\n")}
              onChange={(value) =>
                updateField(
                  selectedField.id,
                  "options",
                  value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean),
                )
              }
            />
          ) : null}
        </div>
      </BuilderSection>
    );
  }

  if (activePanel === "integrations") {
    return (
      <BuilderSection
        title="Integrations"
        description="Keep delivery targets close to the form configuration so exports stay aligned."
        action={closeAction}
      >
        <div className="builder-form-grid">
          <BuilderToggleCard
            label="Enable OTP verification"
            checked={config.integrations.otpEnabled}
            onChange={(checked) =>
              setConfig((current) => ({
                ...current,
                integrations: { ...current.integrations, otpEnabled: checked },
              }))
            }
          />
          <BuilderToggleCard
            label="Enable Google Sheets"
            checked={config.integrations.sheetsEnabled}
            onChange={(checked) =>
              setConfig((current) => ({
                ...current,
                integrations: { ...current.integrations, sheetsEnabled: checked },
              }))
            }
          />
          <BuilderToggleCard
            label="Enable data webhook"
            checked={config.integrations.webhookEnabled}
            onChange={(checked) =>
              setConfig((current) => ({
                ...current,
                integrations: { ...current.integrations, webhookEnabled: checked },
              }))
            }
          />
          <BuilderToggleCard
            label="Enable redirect on submit"
            checked={config.integrations.redirectEnabled}
            onChange={(checked) =>
              setConfig((current) => ({
                ...current,
                integrations: { ...current.integrations, redirectEnabled: checked },
              }))
            }
          />
        </div>
      </BuilderSection>
    );
  }

  if (activePanel === "form") {
    return (
      <BuilderSection
        title="Form Settings"
        description="Define the top-level content that gets reused in the export output."
        action={closeAction}
      >
        <div className="builder-form-grid">
          <BuilderTextInput
            label="Page Name"
            value={config.formSettings.pageName}
            onChange={(value) =>
              setConfig((current) => ({
                ...current,
                formSettings: { ...current.formSettings, pageName: value },
              }))
            }
          />
          <BuilderTextInput
            label="Button Text"
            value={config.formSettings.buttonText}
            onChange={(value) =>
              setConfig((current) => ({
                ...current,
                formSettings: { ...current.formSettings, buttonText: value },
              }))
            }
          />
          <BuilderTextarea
            label="Success Message"
            rows={3}
            className="builder-full-span"
            value={config.formSettings.successMessage}
            onChange={(value) =>
              setConfig((current) => ({
                ...current,
                formSettings: { ...current.formSettings, successMessage: value },
              }))
            }
          />
        </div>
      </BuilderSection>
    );
  }

  if (activePanel === "style") {
    const effectiveLayout = getLayoutForPreview(config.styling, previewMode);

    return (
      <BuilderSection
        title="Styling Controls"
        description="These tokens drive both the preview and generated code defaults."
        action={closeAction}
      >
        <div className="builder-form-grid">
          <BuilderSelect
            label="Layout"
            value={effectiveLayout}
            onChange={(value) =>
              setConfig((current) => ({
                ...current,
                styling:
                  previewMode === "tablet"
                    ? { ...current.styling, tabletLayout: value as LayoutMode }
                    : previewMode === "mobile"
                      ? { ...current.styling, mobileLayout: value as LayoutMode }
                      : { ...current.styling, layout: value as LayoutMode },
              }))
            }
            options={[
              { value: "1-col", label: "1 column" },
              { value: "2-col", label: "2 column" },
            ]}
          />
          <BuilderSelect
            label="Button Style"
            value={config.styling.buttonStyle}
            onChange={(value) =>
              setConfig((current) => ({
                ...current,
                styling: {
                  ...current.styling,
                  buttonStyle: value as BuilderConfig["styling"]["buttonStyle"],
                },
              }))
            }
            options={[
              { value: "solid", label: "Solid" },
              { value: "outline", label: "Outline" },
            ]}
          />
          <BuilderTextInput
            label="Primary"
            type="color"
            value={config.styling.primaryColor}
            onChange={(value) =>
              setConfig((current) => ({
                ...current,
                styling: { ...current.styling, primaryColor: value },
              }))
            }
          />
          <BuilderTextInput
            label="Surface"
            type="color"
            value={config.styling.surfaceColor}
            onChange={(value) =>
              setConfig((current) => ({
                ...current,
                styling: { ...current.styling, surfaceColor: value },
              }))
            }
          />
          <BuilderTextInput
            label="Border"
            type="color"
            value={config.styling.borderColor}
            onChange={(value) =>
              setConfig((current) => ({
                ...current,
                styling: { ...current.styling, borderColor: value },
              }))
            }
          />
          <BuilderTextInput
            label="Text"
            type="color"
            value={config.styling.textColor}
            onChange={(value) =>
              setConfig((current) => ({
                ...current,
                styling: { ...current.styling, textColor: value },
              }))
            }
          />
          <BuilderTextInput
            label="Label"
            type="color"
            value={config.styling.labelColor}
            onChange={(value) =>
              setConfig((current) => ({
                ...current,
                styling: { ...current.styling, labelColor: value },
              }))
            }
          />
          <BuilderTextInput
            label="Placeholder"
            type="color"
            value={config.styling.placeholderColor}
            onChange={(value) =>
              setConfig((current) => ({
                ...current,
                styling: { ...current.styling, placeholderColor: value },
              }))
            }
          />
          <BuilderRange
            label="Radius"
            value={config.styling.radius}
            min={0}
            max={32}
            onChange={(value) =>
              setConfig((current) => ({
                ...current,
                styling: { ...current.styling, radius: value },
              }))
            }
          />
        </div>
      </BuilderSection>
    );
  }

  return null;
}
