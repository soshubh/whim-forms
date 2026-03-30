import type { ReactNode } from "react";

import { landingNavItems } from "./nav-items";
import styles from "./subpage.module.css";
import { LandingTopbar } from "./topbar";

type LandingSubpageShellProps = {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
};

export function LandingSubpageShell({
  eyebrow,
  title,
  lede,
  children,
}: LandingSubpageShellProps) {
  return (
    <main className={styles.page}>
      <LandingTopbar items={landingNavItems} />
      <div className={styles.main}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lede}>{lede}</p>
        </header>
        <div className={styles.sections}>{children}</div>
      </div>
    </main>
  );
}
