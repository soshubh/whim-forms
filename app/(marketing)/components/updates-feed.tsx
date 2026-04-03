"use client";

import { useState } from "react";

import type { UpdateEntry } from "../updates/_content/updates";
import styles from "../page.module.css";
import { UpdateCard } from "./update-card";
import { UpdateMarkdown } from "./update-markdown";

type UpdatesFeedProps = {
  updates: Array<UpdateEntry & { formattedDate: string }>;
};

export function UpdatesFeed({ updates }: UpdatesFeedProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <section className={styles.subpageStack}>
      {updates.map((item) => {
        const isOpen = openSlug === item.slug;

        return (
          <UpdateCard
            date={item.formattedDate}
            expanded={isOpen}
            key={item.slug}
            onToggle={() => setOpenSlug((current) => (current === item.slug ? null : item.slug))}
            title={item.title}
          >
            {isOpen ? (
              <div className={styles.subpageUpdateContent}>
                <UpdateMarkdown content={item.content} />
              </div>
            ) : null}
          </UpdateCard>
        );
      })}
    </section>
  );
}
