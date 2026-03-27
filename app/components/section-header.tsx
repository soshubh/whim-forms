import type { ReactNode } from "react";

type BuilderSectionHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function BuilderSectionHeader({
  title,
  description,
  action,
}: BuilderSectionHeaderProps) {
  return (
    <div className="builder-section-header-row">
      <div className="builder-section-header">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="builder-section-action">{action}</div> : null}
    </div>
  );
}
