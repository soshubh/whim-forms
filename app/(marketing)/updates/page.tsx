import { UpdatesFeed } from "../components/updates-feed";
import { LandingSubpageShell } from "../components/subpage-shell";
import { formatUpdateDate, getAllUpdates } from "./_content/updates";
import styles from "../page.module.css";

export default async function UpdatesPage() {
  const updates = (await getAllUpdates()).map((item) => ({
    ...item,
    formattedDate: formatUpdateDate(item.date),
  }));

  return (
    <LandingSubpageShell
      eyebrow="Updates"
      title="What's new."
      lede="Recent changes, one card at a time."
      heroClassName={styles.subpageHeroShifted}
      titleClassName={styles.subpageHeroTitleFixed}
      ledeClassName={styles.subpageHeroLedeFixed}
    >
      <UpdatesFeed updates={updates} />
    </LandingSubpageShell>
  );
}
