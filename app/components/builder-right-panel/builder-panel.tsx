"use client";

import { useEffect, useState } from "react";

import { ButtonTypeIcon, FieldTypeIcon } from "../builder-item-icon";
import type {
  FormActionButton,
  FormButtonIcon,
  FormButtonType,
} from "../form/button/types";
import type { Field, FieldType, WidthOption } from "../form/types";
import { getButtonWidthForPreview, getFieldWidthForPreview, type PreviewMode } from "../../lib/builder-config";
import { BUTTON_ICON_OPTIONS } from "../../lib/button-icons";
import {
  BUTTON_TYPE_OPTIONS,
  FIELD_TYPE_OPTIONS,
  getButtonTypeLabel,
  getFieldTypeLabel,
} from "../../lib/field-ui";
import {
  InspectorCard,
  InspectorShell,
  SelectRow,
  TextareaRow,
  TextInputRow,
  ToggleRow,
} from "./inspector-primitives";
import { ItemLayoutCard } from "./item-layout-card";
import type { RightPanelTab } from "./types";

function FieldOptionsTextarea({
  field,
  onFieldUpdate,
}: {
  field: Field;
  onFieldUpdate: <K extends keyof Field>(id: string, key: K, value: Field[K]) => void;
}) {
  const [draftValue, setDraftValue] = useState((field.options ?? []).join("\n"));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setDraftValue((field.options ?? []).join("\n"));
    }
  }, [field.id, field.options, isEditing]);

  const commitOptions = (value: string) => {
    onFieldUpdate(
      field.id,
      "options",
      value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    );
  };

  return (
    <TextareaRow
      label="Options"
      rows={4}
      value={draftValue}
      onFocus={() => setIsEditing(true)}
      onChange={(event) => {
        const nextValue = event.target.value;
        setDraftValue(nextValue);
        commitOptions(nextValue);
      }}
      onBlur={(event) => {
        setIsEditing(false);
        commitOptions(event.target.value);
      }}
    />
  );
}

function FieldConfigPanel({
  field,
  previewMode,
  onFieldUpdate,
  onFieldTypeChange,
  onFieldWidthSet,
}: {
  field: Field;
  previewMode: PreviewMode;
  onFieldUpdate: <K extends keyof Field>(id: string, key: K, value: Field[K]) => void;
  onFieldTypeChange: (id: string, type: FieldType) => void;
  onFieldWidthSet: (id: string, width: WidthOption) => void;
}) {
  const currentWidth = getFieldWidthForPreview(field, previewMode);
  const handleRequiredChange = (checked: boolean) => {
    onFieldUpdate(field.id, "required", checked);
    onFieldUpdate(field.id, "isRequiredVisible", checked);
  };

  return (
    <InspectorShell
      titleClassName="builder-app-field-config-title"
      title={
        <>
          <div className="builder-app-field-config-icon">
            <FieldTypeIcon type={field.type} />
          </div>
          <span>{field.label}</span>
        </>
      }
      badge={getFieldTypeLabel(field.type)}
    >
      <InspectorCard title="Basic">
        <SelectRow
          label="Type"
          value={field.type}
          onChange={(event) => onFieldTypeChange(field.id, event.target.value as FieldType)}
        >
          {FIELD_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectRow>
        <TextInputRow
          label="Label"
          value={field.label}
          onChange={(event) => onFieldUpdate(field.id, "label", event.target.value)}
        />
        {field.type !== "checkbox" ? (
          <TextInputRow
            label="Placeholder"
            value={field.placeholder ?? ""}
            onChange={(event) => onFieldUpdate(field.id, "placeholder", event.target.value)}
          />
        ) : null}
        <TextInputRow
          label="Error message"
          value={field.validationMessage ?? ""}
          onChange={(event) => onFieldUpdate(field.id, "validationMessage", event.target.value)}
        />
        {field.type === "select" || field.type === "radio" || field.type === "checkbox" ? (
          <FieldOptionsTextarea field={field} onFieldUpdate={onFieldUpdate} />
        ) : null}
      </InspectorCard>

      <InspectorCard title="Visibility">
        <ToggleRow
          label="Required"
          checked={field.required}
          onChange={handleRequiredChange}
        />
        <ToggleRow
          label="Show label"
          checked={field.isLabelVisible ?? true}
          onChange={(checked) => onFieldUpdate(field.id, "isLabelVisible", checked)}
        />
        {field.required ? (
          <ToggleRow
            label="Show required *"
            checked={field.isRequiredVisible ?? true}
            onChange={(checked) => onFieldUpdate(field.id, "isRequiredVisible", checked)}
          />
        ) : null}
        <ToggleRow
          label="Show helper text"
          checked={field.isHelperTextVisible ?? true}
          onChange={(checked) => onFieldUpdate(field.id, "isHelperTextVisible", checked)}
        />
      </InspectorCard>

      <ItemLayoutCard
        previewMode={previewMode}
        width={currentWidth}
        onWidthChange={(value) => onFieldWidthSet(field.id, value)}
      />

    </InspectorShell>
  );
}

function ButtonConfigPanel({
  button,
  previewMode,
  onButtonUpdate,
  onButtonTypeChange,
  onButtonWidthSet,
}: {
  button: FormActionButton;
  previewMode: PreviewMode;
  onButtonUpdate: <K extends keyof FormActionButton>(
    id: string,
    key: K,
    value: FormActionButton[K],
  ) => void;
  onButtonTypeChange: (id: string, type: FormButtonType) => void;
  onButtonWidthSet: (id: string, width: WidthOption) => void;
}) {
  const currentWidth = getButtonWidthForPreview(button, previewMode);

  return (
    <InspectorShell
      titleClassName="builder-app-field-config-title"
      title={
        <>
          <div className="builder-app-field-config-icon">
            <ButtonTypeIcon type={button.type} />
          </div>
          <span>{button.label}</span>
        </>
      }
      badge={getButtonTypeLabel(button.type)}
    >
      <InspectorCard title="Basic">
        <TextInputRow
          label="Label"
          value={button.label}
          onChange={(event) => onButtonUpdate(button.id, "label", event.target.value)}
        />
        <SelectRow
          label="Action"
          value={button.type}
          onChange={(event) =>
            onButtonTypeChange(button.id, event.target.value as FormButtonType)
          }
        >
          {BUTTON_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectRow>
      </InspectorCard>

      <InspectorCard title="Visibility">
        <ToggleRow
          label="Show button label"
          checked={button.isLabelVisible ?? true}
          onChange={(checked) => onButtonUpdate(button.id, "isLabelVisible", checked)}
        />
        <ToggleRow
          label="Show left icon"
          checked={button.isLeftIconVisible ?? false}
          onChange={(checked) => onButtonUpdate(button.id, "isLeftIconVisible", checked)}
        />
        <ToggleRow
          label="Show right icon"
          checked={button.isRightIconVisible ?? false}
          onChange={(checked) => onButtonUpdate(button.id, "isRightIconVisible", checked)}
        />
      </InspectorCard>

      {button.isLeftIconVisible || button.isRightIconVisible ? (
        <InspectorCard title="Icons">
          {button.isLeftIconVisible ? (
            <SelectRow
              label="Left icon"
              value={button.leftIcon}
              onChange={(event) =>
                onButtonUpdate(button.id, "leftIcon", event.target.value as FormButtonIcon)
              }
            >
              {BUTTON_ICON_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectRow>
          ) : null}
          {button.isRightIconVisible ? (
            <SelectRow
              label="Right icon"
              value={button.rightIcon}
              onChange={(event) =>
                onButtonUpdate(button.id, "rightIcon", event.target.value as FormButtonIcon)
              }
            >
              {BUTTON_ICON_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectRow>
          ) : null}
        </InspectorCard>
      ) : null}

      <ItemLayoutCard
        previewMode={previewMode}
        width={currentWidth}
        onWidthChange={(value) => onButtonWidthSet(button.id, value)}
      />
    </InspectorShell>
  );
}

type BuilderModePanelProps = {
  activeTab: RightPanelTab;
  previewMode: PreviewMode;
  selectedField?: Field;
  selectedButton?: FormActionButton;
  onTabChange: (tab: RightPanelTab) => void;
  onFieldUpdate: <K extends keyof Field>(id: string, key: K, value: Field[K]) => void;
  onFieldTypeChange: (id: string, type: FieldType) => void;
  onFieldWidthSet: (id: string, width: WidthOption) => void;
  onButtonUpdate: <K extends keyof FormActionButton>(
    id: string,
    key: K,
    value: FormActionButton[K],
  ) => void;
  onButtonTypeChange: (id: string, type: FormButtonType) => void;
  onButtonWidthSet: (id: string, width: WidthOption) => void;
};

export function BuilderModePanel({
  activeTab,
  previewMode,
  selectedField,
  selectedButton,
  onTabChange,
  onFieldUpdate,
  onFieldTypeChange,
  onFieldWidthSet,
  onButtonUpdate,
  onButtonTypeChange,
  onButtonWidthSet,
}: BuilderModePanelProps) {
  return (
    <>
      <div className="builder-app-code-tabs">
        <button
          type="button"
          className={`builder-app-code-tab ${activeTab === "field" ? "is-active" : ""}`}
          onClick={() => onTabChange("field")}
        >
          Field
        </button>
        <button
          type="button"
          className={`builder-app-code-tab ${activeTab === "button" ? "is-active" : ""}`}
          onClick={() => onTabChange("button")}
        >
          Button
        </button>
      </div>

      {activeTab === "field" && selectedField ? (
        <FieldConfigPanel
          field={selectedField}
          previewMode={previewMode}
          onFieldUpdate={onFieldUpdate}
          onFieldTypeChange={onFieldTypeChange}
          onFieldWidthSet={onFieldWidthSet}
        />
      ) : null}

      {activeTab === "button" && selectedButton ? (
        <ButtonConfigPanel
          button={selectedButton}
          previewMode={previewMode}
          onButtonUpdate={onButtonUpdate}
          onButtonTypeChange={onButtonTypeChange}
          onButtonWidthSet={onButtonWidthSet}
        />
      ) : null}
    </>
  );
}
