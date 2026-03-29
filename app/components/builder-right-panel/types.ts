"use client";

import type { Dispatch, SetStateAction } from "react";

import type { BuilderConfig, PreviewMode } from "../../lib/builder-config";
import type {
  FormActionButton,
  FormButtonType,
} from "../form/button/types";
import type { Field, FieldType, WidthOption } from "../form/types";

export type SettingsTab = "style" | "integrations";
export type RightPanelTab =
  | "component"
  | "sheets"
  | "field"
  | "button"
  | SettingsTab;

export type BuilderRightPanelProps = {
  mode: "builder" | "code" | "settings" | "advanced";
  activeTab: RightPanelTab;
  config: BuilderConfig;
  copiedState: string;
  generatedAppsScript: string;
  generatedFramerCode: string;
  previewMode: PreviewMode;
  selectedField?: Field;
  selectedButton?: FormActionButton;
  onCopy: (label: string, value: string) => void;
  onTabChange: (tab: RightPanelTab) => void;
  onConfigChange: Dispatch<SetStateAction<BuilderConfig>>;
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
