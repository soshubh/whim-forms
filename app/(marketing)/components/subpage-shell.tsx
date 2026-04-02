import type { ReactNode } from "react";

import { LandingFooter } from "./footer";
import { marketingDisplay, marketingSans } from "./marketing-fonts";
import { landingNavItems } from "./nav-items";
import styles from "../page.module.css";
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
    <main
      className={`${styles.page} ${marketingSans.variable} ${marketingDisplay.variable}`}
    >
      <LandingTopbar items={landingNavItems} />
      <div className={styles.subpageMain}>
        <header className={styles.subpageHero}>
          <p className={styles.subpageEyebrow}>{eyebrow}</p>
          <h1 className={styles.subpageTitle}>{title}</h1>
          <p className={styles.subpageLede}>{lede}</p>
        </header>
        <div className={styles.subpageSections}>{children}</div>
      </div>
      <LandingFooter />
    </main>
  );
}
