"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";

import {
  getLayoutForPreview,
  resolveStylingForPreview,
  updateStylingForPreview,
  type BuilderConfig,
  type LayoutMode,
  type PreviewMode,
  type StylingValues,
} from "../../lib/builder-config";
import {
  ColorInputRow,
  ConfigInput,
  ConfigSelect,
  DualControlRow,
  InspectorCard,
  InspectorShell,
  SelectRow,
  TextareaRow,
  TextInputRow,
  ToggleRow,
} from "./inspector-primitives";
import { SystemButton } from "../system-button";
import type { RightPanelTab } from "./types";

function updateConfigForPreview(
  current: BuilderConfig,
  previewMode: PreviewMode,
  patch: Partial<StylingValues>,
): BuilderConfig {
  return {
    ...current,
    styling: updateStylingForPreview(current.styling, previewMode, patch),
  };
}

const FONT_WEIGHT_OPTIONS = [
  { value: 300, label: "300" },
  { value: 400, label: "400" },
  { value: 500, label: "500" },
  { value: 600, label: "600" },
  { value: 700, label: "700" },
];

function PaddingAllIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="2.25"
        y="2.25"
        width="11.5"
        height="11.5"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function PaddingSplitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5 2.75H3.75C3.198 2.75 2.75 3.198 2.75 3.75V5M11 2.75H12.25C12.802 2.75 13.25 3.198 13.25 3.75V5M13.25 11V12.25C13.25 12.802 12.802 13.25 12.25 13.25H11M5 13.25H3.75C3.198 13.25 2.75 12.802 2.75 12.25V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="6.25"
        y="6.25"
        width="3.5"
        height="3.5"
        rx="1"
        fill="currentColor"
      />
    </svg>
  );
}

function PaddingRow({
  label,
  mode,
  allValue,
  max,
  mainAriaLabel,
  topValue,
  rightValue,
  bottomValue,
  leftValue,
  topAriaLabel,
  rightAriaLabel,
  bottomAriaLabel,
  leftAriaLabel,
  onAllChange,
  onUseAll,
  onUseIndividual,
  onTopChange,
  onRightChange,
  onBottomChange,
  onLeftChange,
}: {
  label: string;
  mode: "all" | "individual";
  allValue: number;
  max: number;
  mainAriaLabel: string;
  topValue: number;
  rightValue: number;
  bottomValue: number;
  leftValue: number;
  topAriaLabel: string;
  rightAriaLabel: string;
  bottomAriaLabel: string;
  leftAriaLabel: string;
  onAllChange: (value: number) => void;
  onUseAll: () => void;
  onUseIndividual: () => void;
  onTopChange: (value: number) => void;
  onRightChange: (value: number) => void;
  onBottomChange: (value: number) => void;
  onLeftChange: (value: number) => void;
}) {
  const isIndividual = mode === "individual";

  return (
    <>
      <div className="builder-app-config-row">
        <span className="builder-app-config-row-label">{label}</span>
        <div className="builder-app-config-padding-inline">
          <ConfigInput
            className="builder-app-config-padding-main-input"
            type="number"
            min={0}
            max={max}
            value={isIndividual ? "" : allValue}
            aria-label={mainAriaLabel}
            onChange={(event) => onAllChange(Number(event.target.value || 0))}
          />
          <div className="builder-app-config-padding-toggle">
            <SystemButton
              variant="segment"
              size="sm"
              active={!isIndividual}
              className="builder-app-config-padding-toggle-button"
              aria-label="Use one padding value for all sides"
              title="Use one padding value for all sides"
              onClick={onUseAll}
            >
              <PaddingAllIcon />
            </SystemButton>
            <SystemButton
              variant="segment"
              size="sm"
              active={isIndividual}
              className="builder-app-config-padding-toggle-button"
              aria-label="Use four padding values"
              title="Use four padding values"
              onClick={onUseIndividual}
            >
              <PaddingSplitIcon />
            </SystemButton>
          </div>
        </div>
      </div>

      {isIndividual ? (
        <div className="builder-app-config-row builder-app-config-row--padding-sides">
          <span className="builder-app-config-row-label" aria-hidden="true">
            &nbsp;
          </span>
          <div className="builder-app-config-padding-sides">
            <div className="builder-app-config-padding-sides-inputs">
              <ConfigInput
                className="builder-app-config-padding-side-input"
                type="number"
                min={0}
                max={max}
                value={topValue}
                aria-label={topAriaLabel}
                onChange={(event) => onTopChange(Number(event.target.value || 0))}
              />
              <ConfigInput
                className="builder-app-config-padding-side-input"
                type="number"
                min={0}
                max={max}
                value={rightValue}
                aria-label={rightAriaLabel}
                onChange={(event) => onRightChange(Number(event.target.value || 0))}
              />
              <ConfigInput
                className="builder-app-config-padding-side-input"
                type="number"
                min={0}
                max={max}
                value={bottomValue}
                aria-label={bottomAriaLabel}
                onChange={(event) => onBottomChange(Number(event.target.value || 0))}
              />
              <ConfigInput
                className="builder-app-config-padding-side-input"
                type="number"
                min={0}
                max={max}
                value={leftValue}
                aria-label={leftAriaLabel}
                onChange={(event) => onLeftChange(Number(event.target.value || 0))}
              />
            </div>
            <div className="builder-app-config-padding-sides-labels" aria-hidden="true">
              <span>T</span>
              <span>R</span>
              <span>B</span>
              <span>L</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function FormPaddingRow({
  config,
  previewMode,
  onConfigChange,
}: {
  config: BuilderConfig;
  previewMode: PreviewMode;
  onConfigChange: Dispatch<SetStateAction<BuilderConfig>>;
}) {
  const styling = resolveStylingForPreview(config.styling, previewMode);

  return (
    <PaddingRow
      label="Form padding"
      mode={styling.formPaddingMode}
      allValue={styling.formPadding}
      max={64}
      mainAriaLabel="Form padding all sides"
      topValue={styling.formPaddingTop}
      rightValue={styling.formPaddingRight}
      bottomValue={styling.formPaddingBottom}
      leftValue={styling.formPaddingLeft}
      topAriaLabel="Form padding top"
      rightAriaLabel="Form padding right"
      bottomAriaLabel="Form padding bottom"
      leftAriaLabel="Form padding left"
      onAllChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { formPadding: value }))
      }
      onUseAll={() =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { formPaddingMode: "all" }))
      }
      onUseIndividual={() =>
        onConfigChange((current) =>
          updateConfigForPreview(current, previewMode, {
            formPaddingMode: "individual",
            formPaddingTop: resolveStylingForPreview(current.styling, previewMode).formPadding,
            formPaddingRight: resolveStylingForPreview(current.styling, previewMode).formPadding,
            formPaddingBottom: resolveStylingForPreview(current.styling, previewMode).formPadding,
            formPaddingLeft: resolveStylingForPreview(current.styling, previewMode).formPadding,
          }),
        )
      }
      onTopChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { formPaddingTop: value }))
      }
      onRightChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { formPaddingRight: value }))
      }
      onBottomChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { formPaddingBottom: value }))
      }
      onLeftChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { formPaddingLeft: value }))
      }
    />
  );
}

function InputPaddingRow({
  config,
  previewMode,
  onConfigChange,
}: {
  config: BuilderConfig;
  previewMode: PreviewMode;
  onConfigChange: Dispatch<SetStateAction<BuilderConfig>>;
}) {
  const styling = resolveStylingForPreview(config.styling, previewMode);

  return (
    <PaddingRow
      label="Input padding"
      mode={styling.inputPaddingMode}
      allValue={styling.inputPadding}
      max={32}
      mainAriaLabel="Input padding all sides"
      topValue={styling.inputPaddingTop}
      rightValue={styling.inputPaddingRight}
      bottomValue={styling.inputPaddingBottom}
      leftValue={styling.inputPaddingLeft}
      topAriaLabel="Input padding top"
      rightAriaLabel="Input padding right"
      bottomAriaLabel="Input padding bottom"
      leftAriaLabel="Input padding left"
      onAllChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { inputPadding: value }))
      }
      onUseAll={() =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { inputPaddingMode: "all" }))
      }
      onUseIndividual={() =>
        onConfigChange((current) =>
          updateConfigForPreview(current, previewMode, {
            inputPaddingMode: "individual",
            inputPaddingTop: resolveStylingForPreview(current.styling, previewMode).inputPadding,
            inputPaddingRight: resolveStylingForPreview(current.styling, previewMode).inputPadding,
            inputPaddingBottom: resolveStylingForPreview(current.styling, previewMode).inputPadding,
            inputPaddingLeft: resolveStylingForPreview(current.styling, previewMode).inputPadding,
          }),
        )
      }
      onTopChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { inputPaddingTop: value }))
      }
      onRightChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { inputPaddingRight: value }))
      }
      onBottomChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { inputPaddingBottom: value }))
      }
      onLeftChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { inputPaddingLeft: value }))
      }
    />
  );
}

function ButtonPaddingRow({
  config,
  previewMode,
  onConfigChange,
}: {
  config: BuilderConfig;
  previewMode: PreviewMode;
  onConfigChange: Dispatch<SetStateAction<BuilderConfig>>;
}) {
  const styling = resolveStylingForPreview(config.styling, previewMode);

  return (
    <PaddingRow
      label="Button padding"
      mode={styling.buttonPaddingMode}
      allValue={styling.buttonPadding}
      max={40}
      mainAriaLabel="Button padding all sides"
      topValue={styling.buttonPaddingTop}
      rightValue={styling.buttonPaddingRight}
      bottomValue={styling.buttonPaddingBottom}
      leftValue={styling.buttonPaddingLeft}
      topAriaLabel="Button padding top"
      rightAriaLabel="Button padding right"
      bottomAriaLabel="Button padding bottom"
      leftAriaLabel="Button padding left"
      onAllChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { buttonPadding: value }))
      }
      onUseAll={() =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { buttonPaddingMode: "all" }))
      }
      onUseIndividual={() =>
        onConfigChange((current) =>
          updateConfigForPreview(current, previewMode, {
            buttonPaddingMode: "individual",
            buttonPaddingTop: resolveStylingForPreview(current.styling, previewMode).buttonPadding,
            buttonPaddingRight: resolveStylingForPreview(current.styling, previewMode).buttonPadding,
            buttonPaddingBottom: resolveStylingForPreview(current.styling, previewMode).buttonPadding,
            buttonPaddingLeft: resolveStylingForPreview(current.styling, previewMode).buttonPadding,
          }),
        )
      }
      onTopChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { buttonPaddingTop: value }))
      }
      onRightChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { buttonPaddingRight: value }))
      }
      onBottomChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { buttonPaddingBottom: value }))
      }
      onLeftChange={(value) =>
        onConfigChange((current) => updateConfigForPreview(current, previewMode, { buttonPaddingLeft: value }))
      }
    />
  );
}

function TypographyRow({
  label,
  sizeValue,
  sizeMin,
  sizeMax,
  weightValue,
  onSizeChange,
  onWeightChange,
}: {
  label: ReactNode;
  sizeValue: number;
  sizeMin: number;
  sizeMax: number;
  weightValue: number;
  onSizeChange: (value: number) => void;
  onWeightChange: (value: number) => void;
}) {
  return (
    <DualControlRow label={label}>
      <ConfigInput
        type="number"
        min={sizeMin}
        max={sizeMax}
        value={sizeValue}
        aria-label={`${typeof label === "string" ? label : "Typography"} size`}
        onChange={(event) => onSizeChange(Number(event.target.value || 0))}
      />
      <ConfigSelect
        value={String(weightValue)}
        aria-label={`${typeof label === "string" ? label : "Typography"} weight`}
        onChange={(event) => onWeightChange(Number(event.target.value))}
      >
        {FONT_WEIGHT_OPTIONS.map((option) => (
          <option key={`${option.value}-${option.label}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </ConfigSelect>
    </DualControlRow>
  );
}

function StylePanel({
  variant,
  config,
  previewMode,
  onConfigChange,
}: {
  variant: "basic" | "advanced";
  config: BuilderConfig;
  previewMode: PreviewMode;
  onConfigChange: Dispatch<SetStateAction<BuilderConfig>>;
}) {
  const effectiveLayout = getLayoutForPreview(config.styling, previewMode);
  const styling = resolveStylingForPreview(config.styling, previewMode);

  if (variant === "basic") {
    return (
      <InspectorShell title="Settings" badge="essentials">
        <InspectorCard title="Layout">
          <SelectRow
            label={
              previewMode === "desktop"
                ? "Desktop layout"
                : previewMode === "tablet"
                  ? "Tablet layout"
                  : "Mobile layout"
            }
            value={effectiveLayout}
            onChange={(event) =>
              onConfigChange((current) =>
                updateConfigForPreview(current, previewMode, {
                  layout: event.target.value as LayoutMode,
                }),
              )
            }
          >
            <option value="1-col">1 column</option>
            <option value="2-col">2 column</option>
          </SelectRow>
          <SelectRow
            label="Button style"
            value={styling.buttonStyle}
            onChange={(event) =>
              onConfigChange((current) =>
                updateConfigForPreview(current, previewMode, {
                  buttonStyle: event.target.value as BuilderConfig["styling"]["buttonStyle"],
                }),
              )
            }
          >
            <option value="solid">Solid</option>
            <option value="outline">Outline</option>
          </SelectRow>
        </InspectorCard>

        <InspectorCard title="Theme">
          <ColorInputRow
            label="Section surface"
            value={styling.sectionSurfaceColor}
            onChange={(value) =>
              onConfigChange((current) =>
                updateConfigForPreview(current, previewMode, { sectionSurfaceColor: value }),
              )
            }
          />
          <ColorInputRow
            label="Field surface"
            value={styling.fieldSurfaceColor}
            onChange={(value) =>
              onConfigChange((current) =>
                updateConfigForPreview(current, previewMode, { fieldSurfaceColor: value }),
              )
            }
          />
          <ColorInputRow
            label="Button color"
            value={styling.primaryColor}
            onChange={(value) =>
              onConfigChange((current) =>
                updateConfigForPreview(current, previewMode, {
                  primaryColor: value,
                  fieldFocusColor: value,
                  buttonBorderColor: value,
                }),
              )
            }
          />
        </InspectorCard>

        <InspectorCard title="Shape">
          <TextInputRow
            label="Radius"
            type="number"
            min={0}
            max={48}
            value={styling.fieldRadius}
            onChange={(event) =>
              onConfigChange((current) =>
                updateConfigForPreview(current, previewMode, {
                  sectionRadius: Number(event.target.value || 0),
                  fieldRadius: Number(event.target.value || 0),
                  buttonRadius: Number(event.target.value || 0),
                }),
              )
            }
          />
        </InspectorCard>
      </InspectorShell>
    );
  }

  const tinyControlTextMessage =
    "Native input and button controls may still render larger in some browsers below 10px.";

  const getControlTextLabel = (label: string, shouldWarn: boolean) => (
    <span className="builder-app-config-label-with-hint">
      <span>{label}</span>
      {shouldWarn ? (
        <button
          type="button"
          className="builder-app-config-hint"
          aria-label={tinyControlTextMessage}
          title={tinyControlTextMessage}
        >
          <VisibilityOutlined fontSize="inherit" />
        </button>
      ) : null}
    </span>
  );

  return (
    <InspectorShell title="Styling Controls" badge="preview + export">
      <InspectorCard title="Layout">
        <SelectRow
          label={
            previewMode === "desktop"
              ? "Desktop layout"
              : previewMode === "tablet"
                ? "Tablet layout"
                : "Mobile layout"
          }
          value={effectiveLayout}
          onChange={(event) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, {
                layout: event.target.value as LayoutMode,
              }),
            )
          }
        >
          <option value="1-col">1 column</option>
          <option value="2-col">2 column</option>
        </SelectRow>
      </InspectorCard>

      <InspectorCard title="Section">
        <FormPaddingRow config={config} previewMode={previewMode} onConfigChange={onConfigChange} />
        <TextInputRow
          label="Section gap"
          type="number"
          min={0}
          max={48}
          value={styling.sectionGap}
          onChange={(event) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, {
                sectionGap: Number(event.target.value || 0),
              }),
            )
          }
        />
        <TextInputRow
          label="Section radius"
          type="number"
          min={0}
          max={48}
          value={styling.sectionRadius}
          onChange={(event) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, {
                sectionRadius: Number(event.target.value || 0),
              }),
            )
          }
        />
        <TextInputRow
          label="Border width"
          type="number"
          min={0}
          max={12}
          step={0.1}
          value={styling.sectionBorderWidth}
          onChange={(event) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, {
                sectionBorderWidth: Number(event.target.value || 0),
              }),
            )
          }
        />
        <ToggleRow
          label="Show heading"
          checked={styling.showHeading}
          onChange={(checked) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { showHeading: checked }),
            )
          }
        />
        <ToggleRow
          label="Show subtext"
          checked={styling.showSubtext}
          onChange={(checked) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { showSubtext: checked }),
            )
          }
        />
        {styling.showHeading ? (
          <TextInputRow
            label="Heading text"
            value={config.formSettings.pageName}
            onChange={(event) =>
              onConfigChange((current) => ({
                ...current,
                formSettings: {
                  ...current.formSettings,
                  pageName: event.target.value,
                },
              }))
            }
          />
        ) : null}
        {styling.showSubtext ? (
          <TextareaRow
            label="Subtext"
            rows={3}
            value={config.formSettings.successMessage}
            onChange={(event) =>
              onConfigChange((current) => ({
                ...current,
                formSettings: {
                  ...current.formSettings,
                  successMessage: event.target.value,
                },
              }))
            }
          />
        ) : null}
        <TypographyRow
          label="Heading"
          sizeValue={styling.titleSize}
          sizeMin={10}
          sizeMax={40}
          weightValue={styling.titleWeight}
          onSizeChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { titleSize: value }),
            )
          }
          onWeightChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { titleWeight: value }),
            )
          }
        />
        <TypographyRow
          label="Subtext"
          sizeValue={styling.bodySize}
          sizeMin={8}
          sizeMax={24}
          weightValue={styling.bodyWeight}
          onSizeChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { bodySize: value }),
            )
          }
          onWeightChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { bodyWeight: value }),
            )
          }
        />
        <ColorInputRow
          label="Surface"
          value={styling.sectionSurfaceColor}
          onChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { sectionSurfaceColor: value }),
            )
          }
        />
        <ColorInputRow
          label="Border"
          value={styling.sectionBorderColor}
          onChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { sectionBorderColor: value }),
            )
          }
        />
        <ColorInputRow
          label="Heading color"
          value={styling.sectionTitleColor}
          onChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { sectionTitleColor: value }),
            )
          }
        />
        <ColorInputRow
          label="Subtext color"
          value={styling.sectionBodyColor}
          onChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { sectionBodyColor: value }),
            )
          }
        />
      </InspectorCard>

      <InspectorCard title="Fields">
        <TextInputRow
          label="Field gap"
          type="number"
          min={0}
          max={40}
          value={styling.fieldGap}
          onChange={(event) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, {
                fieldGap: Number(event.target.value || 0),
              }),
            )
          }
        />
        <InputPaddingRow config={config} previewMode={previewMode} onConfigChange={onConfigChange} />
        <TextInputRow
          label="Field radius"
          type="number"
          min={0}
          max={32}
          value={styling.fieldRadius}
          onChange={(event) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, {
                fieldRadius: Number(event.target.value || 0),
              }),
            )
          }
        />
        <TextInputRow
          label="Border width"
          type="number"
          min={0}
          max={12}
          step={0.1}
          value={styling.fieldBorderWidth}
          onChange={(event) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, {
                fieldBorderWidth: Number(event.target.value || 0),
              }),
            )
          }
        />
        <TextInputRow
          label="Focus width"
          type="number"
          min={0}
          max={12}
          step={0.1}
          value={styling.fieldFocusWidth}
          onChange={(event) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, {
                fieldFocusWidth: Number(event.target.value || 0),
              }),
            )
          }
        />
        <TypographyRow
          label="Label"
          sizeValue={styling.labelSize}
          sizeMin={8}
          sizeMax={20}
          weightValue={styling.labelWeight}
          onSizeChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { labelSize: value }),
            )
          }
          onWeightChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { labelWeight: value }),
            )
          }
        />
        <TypographyRow
          label="Helper text"
          sizeValue={styling.helperSize}
          sizeMin={8}
          sizeMax={20}
          weightValue={styling.helperWeight}
          onSizeChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { helperSize: value }),
            )
          }
          onWeightChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { helperWeight: value }),
            )
          }
        />
        <TypographyRow
          label={getControlTextLabel("Input text", styling.inputTextSize < 10)}
          sizeValue={styling.inputTextSize}
          sizeMin={8}
          sizeMax={24}
          weightValue={styling.inputTextWeight}
          onSizeChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { inputTextSize: value }),
            )
          }
          onWeightChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { inputTextWeight: value }),
            )
          }
        />
        <ColorInputRow
          label="Surface"
          value={styling.fieldSurfaceColor}
          onChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { fieldSurfaceColor: value }),
            )
          }
        />
        <ColorInputRow
          label="Border"
          value={styling.fieldBorderColor}
          onChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { fieldBorderColor: value }),
            )
          }
        />
        <ColorInputRow
          label="Text"
          value={styling.fieldTextColor}
          onChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { fieldTextColor: value }),
            )
          }
        />
        <ColorInputRow
          label="Label color"
          value={styling.fieldLabelColor}
          onChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { fieldLabelColor: value }),
            )
          }
        />
        <ColorInputRow
          label="Helper color"
          value={styling.fieldHelperColor}
          onChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { fieldHelperColor: value }),
            )
          }
        />
        <ColorInputRow
          label="Placeholder"
          value={styling.fieldPlaceholderColor}
          onChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { fieldPlaceholderColor: value }),
            )
          }
        />
        <ColorInputRow
          label="Focus"
          value={styling.fieldFocusColor}
          onChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { fieldFocusColor: value }),
            )
          }
        />
      </InspectorCard>

      <InspectorCard title="Buttons">
        <SelectRow
          label="Button style"
          value={styling.buttonStyle}
          onChange={(event) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, {
                buttonStyle: event.target.value as BuilderConfig["styling"]["buttonStyle"],
              }),
            )
          }
        >
          <option value="solid">Solid</option>
          <option value="outline">Outline</option>
        </SelectRow>
        <ButtonPaddingRow config={config} previewMode={previewMode} onConfigChange={onConfigChange} />
        <TextInputRow
          label="Button radius"
          type="number"
          min={0}
          max={32}
          value={styling.buttonRadius}
          onChange={(event) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, {
                buttonRadius: Number(event.target.value || 0),
              }),
            )
          }
        />
        <TextInputRow
          label="Border width"
          type="number"
          min={0}
          max={12}
          step={0.1}
          value={styling.buttonBorderWidth}
          onChange={(event) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, {
                buttonBorderWidth: Number(event.target.value || 0),
              }),
            )
          }
        />
        <TypographyRow
          label={getControlTextLabel("Button text", styling.buttonTextSize < 10)}
          sizeValue={styling.buttonTextSize}
          sizeMin={8}
          sizeMax={24}
          weightValue={styling.buttonTextWeight}
          onSizeChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { buttonTextSize: value }),
            )
          }
          onWeightChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { buttonTextWeight: value }),
            )
          }
        />
        <ColorInputRow
          label="Button color"
          value={styling.primaryColor}
          onChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { primaryColor: value }),
            )
          }
        />
        <ColorInputRow
          label="Border"
          value={styling.buttonBorderColor}
          onChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { buttonBorderColor: value }),
            )
          }
        />
        <ColorInputRow
          label="Text color"
          value={styling.buttonTextColor}
          onChange={(value) =>
            onConfigChange((current) =>
              updateConfigForPreview(current, previewMode, { buttonTextColor: value }),
            )
          }
        />
      </InspectorCard>
    </InspectorShell>
  );
}

function IntegrationsPanel({
  config,
  onConfigChange,
}: {
  config: BuilderConfig;
  onConfigChange: Dispatch<SetStateAction<BuilderConfig>>;
}) {
  return (
    <InspectorShell title="Integrations" badge="delivery">
      <InspectorCard title="Destinations">
        <ToggleRow
          label="Enable OTP verification"
          checked={config.integrations.otpEnabled}
          onChange={(checked) =>
            onConfigChange((current) => ({
              ...current,
              integrations: { ...current.integrations, otpEnabled: checked },
            }))
          }
        />
        <ToggleRow
          label="Enable Google Sheets"
          checked={config.integrations.sheetsEnabled}
          onChange={(checked) =>
            onConfigChange((current) => ({
              ...current,
              integrations: { ...current.integrations, sheetsEnabled: checked },
            }))
          }
        />
        <ToggleRow
          label="Enable data webhook"
          checked={config.integrations.webhookEnabled}
          onChange={(checked) =>
            onConfigChange((current) => ({
              ...current,
              integrations: { ...current.integrations, webhookEnabled: checked },
            }))
          }
        />
        <ToggleRow
          label="Enable redirect on submit"
          checked={config.integrations.redirectEnabled}
          onChange={(checked) =>
            onConfigChange((current) => ({
              ...current,
              integrations: { ...current.integrations, redirectEnabled: checked },
            }))
          }
        />
      </InspectorCard>
    </InspectorShell>
  );
}

type SettingsModePanelProps = {
  variant: "basic" | "advanced";
  activeTab: RightPanelTab;
  config: BuilderConfig;
  previewMode: PreviewMode;
  onTabChange: (tab: RightPanelTab) => void;
  onConfigChange: Dispatch<SetStateAction<BuilderConfig>>;
};

export function SettingsModePanel({
  variant,
  activeTab,
  config,
  previewMode,
  onTabChange,
  onConfigChange,
}: SettingsModePanelProps) {
  return (
    <>
      <div className="builder-app-code-tabs">
        <button
          type="button"
          className={`builder-app-code-tab ${activeTab === "style" ? "is-active" : ""}`}
          onClick={() => onTabChange("style")}
        >
          Style
        </button>
        <button
          type="button"
          className={`builder-app-code-tab ${activeTab === "integrations" ? "is-active" : ""}`}
          onClick={() => onTabChange("integrations")}
        >
          Integrations
        </button>
      </div>

      {activeTab === "style" ? (
        <StylePanel
          variant={variant}
          config={config}
          previewMode={previewMode}
          onConfigChange={onConfigChange}
        />
      ) : null}

      {activeTab === "integrations" ? (
        <IntegrationsPanel config={config} onConfigChange={onConfigChange} />
      ) : null}
    </>
  );
}
