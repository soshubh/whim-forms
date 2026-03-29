"use client";

import { useMemo, useState } from "react";

import { BuilderCenterPanel } from "./components/builder-center-panel";
import { BuilderLeftPanel } from "./components/builder-left-panel";
import { BuilderRightPanel } from "./components/builder-right-panel";
import { BuilderTopbar } from "./components/builder-topbar";
import type {
  FormActionButton,
  FormButtonState,
  FormButtonType,
} from "./components/form/button/types";
import type { Field, FieldType, WidthOption } from "./components/form/types";
import {
  defaultButton,
  DEFAULT_CONFIG,
  defaultField,
  fieldWidthClass,
  getLayoutForPreview,
  normalizeBuilderConfig,
  resolveStylingForPreview,
  type BuilderConfig,
  type PreviewMode,
} from "./lib/builder-config";
import { getDefaultButtonIcons } from "./lib/button-icons";
import { generateAppsScript, generateFramerComponent } from "./lib/code-generators";

type TopbarTab = "builder" | "code" | "settings" | "advanced";
type RightPanelTab =
  | "component"
  | "sheets"
  | "field"
  | "button"
  | "style"
  | "integrations";

function cloneDefaultConfig(): BuilderConfig {
  return {
    ...DEFAULT_CONFIG,
    fields: DEFAULT_CONFIG.fields.map((field) => ({
      ...field,
      options: field.options ? [...field.options] : undefined,
    })),
    buttons: DEFAULT_CONFIG.buttons.map((button) => ({ ...button })),
    styling: { ...DEFAULT_CONFIG.styling },
    integrations: { ...DEFAULT_CONFIG.integrations },
    formSettings: { ...DEFAULT_CONFIG.formSettings },
  };
}

export default function Home() {
  const [config, setConfig] = useState<BuilderConfig>(() => cloneDefaultConfig());
  const [selectedFieldId, setSelectedFieldId] = useState(
    DEFAULT_CONFIG.fields[0]?.id ?? "",
  );
  const [selectedButtonId, setSelectedButtonId] = useState("");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [copiedState, setCopiedState] = useState("");
  const [topbarTab, setTopbarTab] = useState<TopbarTab>("builder");
  const [rightPanelTab, setRightPanelTab] = useState<RightPanelTab>("field");
  const [previewSubmitState] = useState<FormButtonState>("idle");
  const resolvedConfig = useMemo(() => normalizeBuilderConfig(config), [config]);

  const selectedField =
    resolvedConfig.fields.find((field) => field.id === selectedFieldId) ??
    resolvedConfig.fields[0];
  const selectedButton =
    resolvedConfig.buttons.find((button) => button.id === selectedButtonId) ??
    resolvedConfig.buttons[0];
  const activeLayout = getLayoutForPreview(resolvedConfig.styling, previewMode);
  const activeStyling = resolveStylingForPreview(resolvedConfig.styling, previewMode);

  const generatedFramerCode = useMemo(
    () => generateFramerComponent(resolvedConfig),
    [resolvedConfig],
  );
  const generatedAppsScript = useMemo(
    () => generateAppsScript(resolvedConfig),
    [resolvedConfig],
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

  const changeFieldType = (id: string, nextType: FieldType) => {
    setConfig((current) => {
      const fieldIndex = current.fields.findIndex((field) => field.id === id);
      if (fieldIndex < 0) {
        return current;
      }

      const previousField = current.fields[fieldIndex];
      const replacement = defaultField(nextType, fieldIndex);
      const nextField: Field = {
        ...replacement,
        id: previousField.id,
        label: previousField.label,
        required: previousField.required,
        width: previousField.width,
        tabletWidth: previousField.tabletWidth,
        mobileWidth: previousField.mobileWidth,
        isLabelVisible: previousField.isLabelVisible ?? true,
        isRequiredVisible: previousField.isRequiredVisible ?? true,
        isHelperTextVisible: previousField.isHelperTextVisible ?? true,
      };

      return {
        ...current,
        fields: current.fields.map((field) => (field.id === id ? nextField : field)),
      };
    });
  };

  const addField = () => {
    const newField = defaultField("text", resolvedConfig.fields.length);
    setConfig((current) => ({
      ...current,
      fields: [...current.fields, newField],
    }));
    setTopbarTab("builder");
    setSelectedFieldId(newField.id);
    setSelectedButtonId("");
    setRightPanelTab("field");
  };

  const moveFieldTo = (sourceId: string, targetId: string) => {
    setConfig((current) => {
      const sourceIndex = current.fields.findIndex((field) => field.id === sourceId);
      const targetIndex = current.fields.findIndex((field) => field.id === targetId);

      if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) {
        return current;
      }

      const fields = [...current.fields];
      const [field] = fields.splice(sourceIndex, 1);
      fields.splice(targetIndex, 0, field);

      return { ...current, fields };
    });
  };

  const removeField = (id: string) => {
    const fields = resolvedConfig.fields.filter((field) => field.id !== id);
    setConfig((current) => ({ ...current, fields }));

    if (selectedFieldId === id) {
      setSelectedFieldId(fields[0]?.id ?? "");
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

  const updateButton = <K extends keyof FormActionButton>(
    id: string,
    key: K,
    value: FormActionButton[K],
  ) => {
    setConfig((current) => ({
      ...current,
      buttons: current.buttons.map((button) =>
        button.id === id ? { ...button, [key]: value } : button,
      ),
    }));
  };

  const changeButtonType = (id: string, nextType: FormButtonType) => {
    setConfig((current) => ({
      ...current,
      buttons: current.buttons.map((button, index) => {
        if (button.id !== id) {
          return button;
        }

        const replacement = defaultButton(index);
        const defaultLabels: Record<FormButtonType, string> = {
          submit: "Submit",
          back: "Back",
          otp: "Verify OTP",
        };
        const shouldResetLabel =
          button.label === "Button" || button.label === defaultLabels[button.type];
        const previousDefaultIcons = getDefaultButtonIcons(button.type);
        const nextDefaultIcons = getDefaultButtonIcons(nextType);
        const shouldResetLeftIcon =
          !button.leftIcon || button.leftIcon === previousDefaultIcons.left;
        const shouldResetRightIcon =
          !button.rightIcon || button.rightIcon === previousDefaultIcons.right;

        return {
          ...replacement,
          id: button.id,
          type: nextType,
          label: shouldResetLabel ? defaultLabels[nextType] : button.label,
          width: button.width,
          tabletWidth: button.tabletWidth,
          mobileWidth: button.mobileWidth,
          isLabelVisible: button.isLabelVisible ?? true,
          isLeftIconVisible: button.isLeftIconVisible ?? false,
          isRightIconVisible: button.isRightIconVisible ?? false,
          leftIcon: shouldResetLeftIcon ? nextDefaultIcons.left : button.leftIcon,
          rightIcon: shouldResetRightIcon ? nextDefaultIcons.right : button.rightIcon,
        };
      }),
    }));
  };

  const addButton = () => {
    const newButton = defaultButton(resolvedConfig.buttons.length);
    setConfig((current) => ({
      ...current,
      buttons: [...current.buttons, newButton],
    }));
    setSelectedButtonId(newButton.id);
    setSelectedFieldId("");
    setTopbarTab("builder");
    setRightPanelTab("button");
  };

  const moveButtonTo = (sourceId: string, targetId: string) => {
    setConfig((current) => {
      const sourceIndex = current.buttons.findIndex((button) => button.id === sourceId);
      const targetIndex = current.buttons.findIndex((button) => button.id === targetId);

      if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) {
        return current;
      }

      const buttons = [...current.buttons];
      const [button] = buttons.splice(sourceIndex, 1);
      buttons.splice(targetIndex, 0, button);

      return { ...current, buttons };
    });
  };

  const removeButton = (id: string) => {
    const buttons = resolvedConfig.buttons.filter((button) => button.id !== id);
    setConfig((current) => ({ ...current, buttons }));

    if (selectedButtonId === id) {
      setSelectedButtonId(buttons[0]?.id ?? "");
      if (buttons.length === 0 && rightPanelTab === "button") {
        setRightPanelTab("component");
      }
    }
  };

  const setButtonWidth = (id: string, nextWidth: WidthOption) => {
    setConfig((current) => ({
      ...current,
      buttons: current.buttons.map((button) => {
        if (button.id !== id) {
          return button;
        }

        if (previewMode === "tablet") {
          return { ...button, tabletWidth: nextWidth };
        }

        if (previewMode === "mobile") {
          return { ...button, mobileWidth: nextWidth };
        }

        return { ...button, width: nextWidth };
      }),
    }));
  };

  const copyText = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedState(label);
    window.setTimeout(() => setCopiedState(""), 1800);
  };

  const resetBuilder = () => {
    const nextConfig = cloneDefaultConfig();
    setConfig(nextConfig);
    setSelectedFieldId(nextConfig.fields[0]?.id ?? "");
    setSelectedButtonId("");
    setPreviewMode("desktop");
    setTopbarTab("builder");
    setRightPanelTab("field");
  };

  const handleTopbarTabChange = (tab: TopbarTab) => {
    setTopbarTab(tab);

    if (tab === "settings" || tab === "advanced") {
      setRightPanelTab("style");
      return;
    }

    if (tab === "code") {
      setRightPanelTab((current) => (current === "sheets" ? "sheets" : "component"));
      return;
    }

    setRightPanelTab(selectedButtonId ? "button" : "field");
  };

  const handleFieldSelect = (fieldId: string) => {
    setTopbarTab("builder");
    setSelectedFieldId(fieldId);
    setSelectedButtonId("");
    setRightPanelTab("field");
  };

  const handleButtonSelect = (buttonId: string) => {
    setTopbarTab("builder");
    setSelectedFieldId("");
    setSelectedButtonId(buttonId);
    setRightPanelTab("button");
  };

  return (
    <main className="builder-app-shell">
      <div className="builder-app">
        <BuilderTopbar
          activeTab={topbarTab}
          onTabChange={handleTopbarTabChange}
          onNewForm={resetBuilder}
        />

        <BuilderLeftPanel
          fields={resolvedConfig.fields}
          buttons={resolvedConfig.buttons}
          previewMode={previewMode}
          selectedFieldId={selectedFieldId}
          selectedButtonId={selectedButtonId}
          onFieldSelect={handleFieldSelect}
          onFieldRemove={removeField}
          onMoveField={moveFieldTo}
          onAddField={addField}
          onButtonSelect={handleButtonSelect}
          onButtonRemove={removeButton}
          onMoveButton={moveButtonTo}
          onAddButton={addButton}
        />

        <BuilderCenterPanel
          fields={resolvedConfig.fields}
          buttons={resolvedConfig.buttons}
          previewMode={previewMode}
          layout={activeLayout}
          styling={activeStyling}
          formSettings={resolvedConfig.formSettings}
          submitState={previewSubmitState}
          onPreviewModeChange={setPreviewMode}
          onFieldSelect={handleFieldSelect}
          selectedFieldId={selectedFieldId}
          onButtonSelect={handleButtonSelect}
          selectedButtonId={selectedButtonId}
          getFieldWidthClass={fieldWidthClass}
        />

        <BuilderRightPanel
          mode={topbarTab}
          activeTab={rightPanelTab}
          config={resolvedConfig}
          copiedState={copiedState}
          generatedAppsScript={generatedAppsScript}
          generatedFramerCode={generatedFramerCode}
          previewMode={previewMode}
          selectedField={selectedField}
          selectedButton={selectedButton}
          onCopy={copyText}
          onTabChange={setRightPanelTab}
          onConfigChange={setConfig}
          onFieldUpdate={updateField}
          onFieldTypeChange={changeFieldType}
          onFieldWidthSet={setFieldWidth}
          onButtonUpdate={updateButton}
          onButtonTypeChange={changeButtonType}
          onButtonWidthSet={setButtonWidth}
        />
      </div>
    </main>
  );
}
