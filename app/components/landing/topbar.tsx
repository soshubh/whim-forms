"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import styles from "./topbar.module.css";

type NavItem = {
  label: string;
  href: string;
};

type LandingTopbarProps = {
  items: readonly NavItem[];
  profileLabel?: string;
};

export function LandingTopbar({
  items,
  profileLabel = "Shubh",
}: LandingTopbarProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarInner}>
        <Link aria-label="Go to homepage" className={styles.brand} href="/">
          <span className={styles.brandGlyph}>
            <span />
            <span />
          </span>
        </Link>
        <nav className={styles.topbarNav}>
          {items.map((item) => (
            <Link
              className={`${styles.topbarNavLink} ${pathname === item.href ? styles.topbarNavLinkActive : ""}`}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.topbarActions}>
          <span className={styles.profileName}>{profileLabel}</span>
          <span className={styles.profileAvatar} aria-hidden="true">
            D
          </span>
        </div>
        <button
          aria-expanded={isNavOpen}
          aria-label="Open navigation"
          className={styles.topbarMenuButton}
          onClick={() => setIsNavOpen((current) => !current)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {isNavOpen ? (
        <div className={styles.mobileNavPanel}>
          {items.map((item) => (
            <Link
              className={`${styles.mobileNavLink} ${pathname === item.href ? styles.mobileNavLinkActive : ""}`}
              href={item.href}
              key={item.label}
              onClick={() => setIsNavOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
