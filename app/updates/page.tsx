import { LandingSubpageShell } from "../components/landing/subpage-shell";
import styles from "../components/landing/subpage.module.css";

const updates = [
  {
    date: "Latest update",
    title: "Landing page, routes, and top navigation refined",
    body:
      "The public surface was reorganized so the homepage lives at `/`, the builder lives at `/builder`, and the top navigation now maps to dedicated product pages.",
    tags: ["Routing", "Navigation", "Landing"],
  },
  {
    date: "Recent update",
    title: "Generated forms now validate and export more reliably",
    body:
      "Validation behavior, helper-text handling, webhook transport, and Google Apps Script field mapping were tightened so the exported Framer code behaves closer to the builder preview.",
    tags: ["Validation", "Framer export", "Apps Script"],
  },
  {
    date: "Recent update",
    title: "Phone input system upgraded",
    body:
      "Phone fields now support split country code and local number behavior, custom dropdown styling, digit-only input, and controlled length handling.",
    tags: ["Phone field", "Custom controls", "Input system"],
  },
];

export default function UpdatesPage() {
  return (
    <LandingSubpageShell
      eyebrow="Updates"
      title="What changed most recently."
      lede="This page surfaces product changes in a simple card rhythm, similar to the clean update style you pointed to, while staying consistent with this product’s darker visual system."
    >
      <section className={styles.stack}>
        {updates.map((item) => (
          <article className={styles.updateCard} key={item.title}>
            <p className={styles.updateMeta}>{item.date}</p>
            <h2 className={styles.updateTitle}>{item.title}</h2>
            <p className={styles.updateBody}>{item.body}</p>
            <div className={styles.updateTags}>
              {item.tags.map((tag) => (
                <span className={styles.updateTag} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </LandingSubpageShell>
  );
}
