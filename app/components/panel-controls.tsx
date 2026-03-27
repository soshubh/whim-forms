import type { HTMLInputTypeAttribute, ReactNode } from "react";

import { BuilderSectionHeader } from "./section-header";

export function BuilderSection({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="builder-card">
      <BuilderSectionHeader title={title} description={description} action={action} />
      {children}
    </section>
  );
}

export function BuilderFieldControl({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <span>{label}</span>
      {children}
    </label>
  );
}

export function BuilderTextInput({
  label,
  value,
  onChange,
  className,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  type?: HTMLInputTypeAttribute;
}) {
  return (
    <BuilderFieldControl label={label} className={className}>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </BuilderFieldControl>
  );
}

export function BuilderTextarea({
  label,
  value,
  onChange,
  rows,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  className?: string;
}) {
  return (
    <BuilderFieldControl label={label} className={className}>
      <textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
    </BuilderFieldControl>
  );
}

export function BuilderSelect({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  className?: string;
}) {
  return (
    <BuilderFieldControl label={label} className={className}>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </BuilderFieldControl>
  );
}

export function BuilderCheckbox({
  label,
  checked,
  onChange,
  className = "builder-checkbox-row",
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <label className={className}>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

export function BuilderRange({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <BuilderFieldControl label={`${label}: ${value}px`}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </BuilderFieldControl>
  );
}

export function BuilderToggleCard({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return <BuilderCheckbox label={label} checked={checked} onChange={onChange} className="builder-toggle" />;
}
