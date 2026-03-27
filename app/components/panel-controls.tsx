import type { HTMLInputTypeAttribute, ReactNode } from "react";

import { BuilderSectionHeader } from "./section-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

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
    <Card className="builder-card builder-surface">
      <CardHeader className="builder-card-header">
        <BuilderSectionHeader title={title} description={description} action={action} />
      </CardHeader>
      <CardContent className="builder-card-content">{children}</CardContent>
    </Card>
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
    <div className={className}>
      <Label className="builder-field-label">{label}</Label>
      {children}
    </div>
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
      <Input
        className="builder-ui-control builder-control-surface"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
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
      <Textarea
        className="builder-ui-control builder-ui-control--multiline builder-control-surface"
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
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
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="builder-ui-control builder-control-surface">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </BuilderFieldControl>
  );
}

export function BuilderCheckbox({
  label,
  checked,
  onChange,
  className = "builder-checkbox-row builder-surface",
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <label className={className}>
      <Checkbox checked={checked} onCheckedChange={(next) => onChange(next === true)} />
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
      <Slider
        className="builder-ui-slider"
        min={min}
        max={max}
        value={[value]}
        onValueChange={(next) => onChange(next[0] ?? value)}
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
  return (
    <label className="builder-toggle builder-surface">
      <Switch checked={checked} onCheckedChange={onChange} />
      <span>{label}</span>
    </label>
  );
}
