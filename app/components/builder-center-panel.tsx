import type { CSSProperties } from "react";

import { PreviewDeviceTabs } from "./preview-device-tabs";
import { FORM_FIELD_COMPONENTS } from "./form/registry";
import { PrimaryButton } from "./form/button/PrimaryButton";
import { SecondaryButton } from "./form/button/SecondaryButton";
import type {
  FormActionButton,
  FormButtonState,
  FormButtonStyle,
} from "./form/button/types";
import type { Field, WidthOption } from "./form/types";
import type { BuilderConfig, LayoutMode, PreviewMode, StylingValues } from "../lib/builder-config";
import {
  getButtonPaddingValues,
  getButtonWidthForPreview,
  getFieldWidthForPreview,
  getFormPaddingValue,
  getInputPaddingValues,
} from "../lib/builder-config";

type BuilderCenterPanelProps = {
  fields: Field[];
  buttons: FormActionButton[];
  previewMode: PreviewMode;
  layout: LayoutMode;
  styling: StylingValues & { buttonStyle: FormButtonStyle };
  formSettings: {
    pageName: string;
    successMessage: string;
  };
  submitState: FormButtonState;
  onPreviewModeChange: (mode: PreviewMode) => void;
  onFieldSelect: (fieldId: string) => void;
  selectedFieldId: string;
  onButtonSelect: (buttonId: string) => void;
  selectedButtonId: string;
  getFieldWidthClass: (width: WidthOption, layout: LayoutMode) => string;
};

export function BuilderCenterPanel({
  fields,
  buttons,
  previewMode,
  layout,
  styling,
  formSettings,
  submitState,
  onPreviewModeChange,
  onFieldSelect,
  selectedFieldId,
  onButtonSelect,
  selectedButtonId,
  getFieldWidthClass,
}: BuilderCenterPanelProps) {
  const inputPadding = getInputPaddingValues(styling);
  const buttonPadding = getButtonPaddingValues(styling);
  const shouldShowHeader = styling.showHeading || styling.showSubtext;

  return (
    <section className="builder-app-center-panel">
      <div className="builder-app-preview-toolbar">
        <span className="builder-app-panel-title">Preview</span>
        <PreviewDeviceTabs
          previewMode={previewMode}
          onPreviewModeChange={onPreviewModeChange}
        />
        <span className="builder-app-toolbar-meta">
          {fields.length} fields · {buttons.length} buttons · {layout} layout
        </span>
      </div>

      <div className="builder-app-preview-canvas">
        <div
          className={`builder-app-form-shell is-${previewMode}`}
          style={
            {
              "--preview-primary": styling.primaryColor,
              "--preview-section-surface": styling.sectionSurfaceColor,
              "--preview-section-border": styling.sectionBorderColor,
              "--preview-section-title": styling.sectionTitleColor,
              "--preview-section-body": styling.sectionBodyColor,
              "--preview-section-border-width": `${styling.sectionBorderWidth}px`,
              "--preview-field-surface": styling.fieldSurfaceColor,
              "--preview-field-border": styling.fieldBorderColor,
              "--preview-field-text": styling.fieldTextColor,
              "--preview-field-label": styling.fieldLabelColor,
              "--preview-field-helper": styling.fieldHelperColor,
              "--preview-field-placeholder": styling.fieldPlaceholderColor,
              "--preview-field-focus": styling.fieldFocusColor,
              "--preview-field-border-width": `${styling.fieldBorderWidth}px`,
              "--preview-field-focus-width": `${styling.fieldFocusWidth}px`,
              "--preview-button-border-color": styling.buttonBorderColor,
              "--preview-button-text-color": styling.buttonTextColor,
              "--preview-form-padding": getFormPaddingValue(styling),
              "--preview-input-padding-top": `${inputPadding.top}px`,
              "--preview-input-padding-right": `${inputPadding.right}px`,
              "--preview-input-padding-bottom": `${inputPadding.bottom}px`,
              "--preview-input-padding-left": `${inputPadding.left}px`,
              "--preview-button-padding-top": `${buttonPadding.top}px`,
              "--preview-button-padding-right": `${buttonPadding.right}px`,
              "--preview-button-padding-bottom": `${buttonPadding.bottom}px`,
              "--preview-button-padding-left": `${buttonPadding.left}px`,
              "--preview-section-gap": `${styling.sectionGap}px`,
              "--preview-field-gap": `${styling.fieldGap}px`,
              "--preview-title-size": `${styling.titleSize}px`,
              "--preview-title-weight": styling.titleWeight,
              "--preview-body-size": `${styling.bodySize}px`,
              "--preview-body-weight": styling.bodyWeight,
              "--preview-label-size": `${styling.labelSize}px`,
              "--preview-label-weight": styling.labelWeight,
              "--preview-helper-size": `${styling.helperSize}px`,
              "--preview-helper-weight": styling.helperWeight,
              "--preview-input-size": `${styling.inputTextSize}px`,
              "--preview-input-weight": styling.inputTextWeight,
              "--preview-button-text-size": `${styling.buttonTextSize}px`,
              "--preview-button-text-weight": styling.buttonTextWeight,
              "--preview-section-radius": `${styling.sectionRadius}px`,
              "--preview-field-radius": `${styling.fieldRadius}px`,
              "--preview-button-radius": `${styling.buttonRadius}px`,
              "--preview-button-border-width": `${styling.buttonBorderWidth}px`,
            } as CSSProperties
          }
        >
          {shouldShowHeader ? (
            <div className="builder-app-form-shell-header">
              {styling.showHeading ? (
                <div className="builder-app-form-shell-title">{formSettings.pageName}</div>
              ) : null}
              {styling.showSubtext ? (
                <div className="builder-app-form-shell-subtitle">
                  {formSettings.successMessage}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className={`builder-preview-form ${layout === "2-col" ? "is-two-col" : ""}`}>
            {fields.map((field) => {
              const FieldComponent = FORM_FIELD_COMPONENTS[field.type];
              const effectiveWidth = getFieldWidthForPreview(field, previewMode);

              return (
                <div
                  key={field.id}
                  className={`builder-app-preview-item ${getFieldWidthClass(effectiveWidth, layout)} ${
                    field.id === selectedFieldId ? "is-selected" : ""
                  }`}
                  onClick={() => onFieldSelect(field.id)}
                >
                  <FieldComponent field={field} />
                </div>
              );
            })}
          </div>

          {buttons.length > 0 ? (
            <div className={`builder-preview-actions ${layout === "2-col" ? "is-two-col" : ""}`}>
              {buttons.map((button) => {
                const buttonWidth = getButtonWidthForPreview(button, previewMode);
                const buttonState = button.type === "submit" ? submitState : "idle";

                return (
                  <div
                    key={button.id}
                    className={`builder-app-preview-action ${getFieldWidthClass(buttonWidth, layout)} ${
                      button.id === selectedButtonId ? "is-selected" : ""
                    }`}
                    onClick={() => onButtonSelect(button.id)}
                  >
                    {styling.buttonStyle === "outline" ? (
                      <SecondaryButton
                        label={button.label}
                        state={buttonState}
                        actionType={button.type}
                        isLabelVisible={button.isLabelVisible}
                        isLeftIconVisible={button.isLeftIconVisible}
                        isRightIconVisible={button.isRightIconVisible}
                        leftIcon={button.leftIcon}
                        rightIcon={button.rightIcon}
                      />
                    ) : (
                      <PrimaryButton
                        label={button.label}
                        state={buttonState}
                        actionType={button.type}
                        isLabelVisible={button.isLabelVisible}
                        isLeftIconVisible={button.isLeftIconVisible}
                        isRightIconVisible={button.isRightIconVisible}
                        leftIcon={button.leftIcon}
                        rightIcon={button.rightIcon}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
