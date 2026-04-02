import Link from "next/link";

import styles from "../page.module.css";
import { landingNavItems } from "./nav-items";

export function LandingFooter() {
  return (
    <section className={styles.footerCta} id="updates">
      <div className={styles.footerCard}>
        <div className={styles.footerTop}>
          <div className={styles.footerLead}>
            <div className={styles.footerEyebrow}>Design Bold.</div>
            <div className={styles.footerEyebrow}>Launch Fast.</div>
          </div>
          <nav aria-label="Footer" className={styles.footerNav}>
            {landingNavItems.map((item) => (
              <Link className={styles.footerNavLink} href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.footerMeta}>© 2026 WHIM</div>
          <div className={styles.footerMeta}>By Shubh</div>
        </div>
      </div>
    </section>
  );
}
