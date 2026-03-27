import DragIndicatorRounded from "@mui/icons-material/DragIndicatorRounded";
import {
  forwardRef,
  type DragEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

import type { WidthOption } from "./form/types";

type FieldEditorFrameProps = {
  fieldId: string;
  label: string;
  widthClassName: string;
  selected: boolean;
  dragging: boolean;
  dropTarget: boolean;
  dragArmed: boolean;
  resizeActive: boolean;
  effectiveWidth: WidthOption;
  children: ReactNode;
  onSelect: () => void;
  onDragStart: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDrop: () => void;
  onArmDrag: (event: PointerEvent<HTMLButtonElement>) => void;
  onDisarmDrag: () => void;
  onStartResize: (event: PointerEvent<HTMLButtonElement>, width: WidthOption) => void;
  onRemove: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const FieldEditorFrame = forwardRef<HTMLDivElement, FieldEditorFrameProps>(
  function FieldEditorFrame(
    {
      fieldId,
      label,
      widthClassName,
      selected,
      dragging,
      dropTarget,
      dragArmed,
      resizeActive,
      effectiveWidth,
      children,
      onSelect,
      onDragStart,
      onDragEnd,
      onDragOver,
      onDrop,
      onArmDrag,
      onDisarmDrag,
      onStartResize,
      onRemove,
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={`builder-field ${widthClassName} ${
          selected ? "is-selected" : ""
        } ${dragging ? "is-dragging" : ""} ${dropTarget ? "is-drop-target" : ""}`}
        draggable={dragArmed}
        data-field-id={fieldId}
        onClick={onSelect}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <button
          type="button"
          className="builder-field-reorder-handle builder-surface builder-icon-button"
          aria-label={`Drag ${label}`}
          onClick={(event) => event.stopPropagation()}
          onPointerDown={onArmDrag}
          onPointerUp={onDisarmDrag}
          onPointerCancel={onDisarmDrag}
        >
          <DragIndicatorRounded fontSize="small" />
        </button>
        <button
          type="button"
          className={`builder-field-resize-handle builder-surface builder-icon-button ${
            resizeActive ? "is-active" : ""
          }`}
          aria-label={`Resize ${label}`}
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => onStartResize(event, effectiveWidth)}
        >
          <span />
          <span />
        </button>
        <button
          type="button"
          className="builder-field-remove builder-surface builder-icon-button"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
        >
          ×
        </button>
        {children}
      </div>
    );
  },
);
