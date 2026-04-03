import type { ReactNode } from "react";

import styles from "../page.module.css";

type UpdateCardProps = {
  date: string;
  title: string;
  expanded?: boolean;
  onToggle?: () => void;
  children?: ReactNode;
};

export function UpdateCard({
  date,
  title,
  expanded = false,
  onToggle,
  children,
}: UpdateCardProps) {
  return (
    <article className={styles.subpageUpdateCard}>
      <button
        className={styles.subpageUpdateCardButton}
        onClick={onToggle}
        type="button"
      >
        <p className={styles.subpageUpdateMeta}>{date}</p>
        <h2 className={styles.subpageUpdateTitle}>{title}</h2>
        <span className={styles.subpageAccordionChevron} aria-hidden="true">
          {expanded ? "−" : "+"}
        </span>
      </button>
      {children}
    </article>
  );
}
