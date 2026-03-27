"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import LinkRounded from "@mui/icons-material/LinkRounded";
import PaletteRounded from "@mui/icons-material/PaletteRounded";
import TuneRounded from "@mui/icons-material/TuneRounded";
import type { ControlPanel } from "../lib/builder-config";

type NavigationProps = {
  activePanel: ControlPanel;
  hasSelectedField: boolean;
  onChange: (panel: Exclude<ControlPanel, null>) => void;
};

const NAV_ITEMS = [
  { id: "add", label: "Add", icon: AddRounded },
  { id: "integrations", label: "Integrations", icon: LinkRounded },
  { id: "style", label: "Style", icon: PaletteRounded },
  { id: "form", label: "Form Settings", icon: TuneRounded },
] as const;

export function Navigation({
  activePanel,
  hasSelectedField,
  onChange,
}: NavigationProps) {
  return (
    <div className="builder-liquid-nav">
      <nav className="builder-bottom-nav" aria-label="Builder navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`builder-bottom-nav-button ${isActive ? "is-active" : ""}`}
              aria-label={item.label}
              title={item.label}
              onClick={() => onChange(item.id)}
            >
              <Icon fontSize="small" />
            </button>
          );
        })}

        {hasSelectedField ? (
          <button
            type="button"
            className={`builder-bottom-nav-button ${activePanel === "edit" ? "is-active" : ""}`}
            aria-label="Edit Field"
            title="Edit Field"
            onClick={() => onChange("edit")}
          >
            <EditRounded fontSize="small" />
          </button>
        ) : null}
      </nav>
    </div>
  );
}
