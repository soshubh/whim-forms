import { notFound } from "next/navigation";

import { UpdateMarkdown } from "../../components/update-markdown";
import { LandingSubpageShell } from "../../components/subpage-shell";
import { formatUpdateDate, getAllUpdatesMeta, getUpdateBySlug } from "../_content/updates";
import styles from "../../page.module.css";

type UpdateDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const updates = await getAllUpdatesMeta();

  return updates.map((item) => ({
    slug: item.slug,
  }));
}

export default async function UpdateDetailPage({ params }: UpdateDetailPageProps) {
  const { slug } = await params;
  const update = await getUpdateBySlug(slug);

  if (!update) {
    notFound();
  }

  return (
    <LandingSubpageShell
      eyebrow="Updates"
      title={update.title}
      lede={formatUpdateDate(update.date)}
      heroClassName={styles.subpageHeroShifted}
      titleClassName={styles.subpageHeroTitleFixed}
      ledeClassName={styles.subpageHeroLedeFixed}
    >
      <section className={styles.subpageSection}>
        <UpdateMarkdown content={update.content} />
      </section>
    </LandingSubpageShell>
  );
}
