import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const updatesDirectory = path.join(process.cwd(), "app/(marketing)/updates/_content");

type UpdateFrontmatter = {
  title: string;
  date: string;
  summary: string;
};

export type UpdateMeta = UpdateFrontmatter & {
  slug: string;
};

export type UpdateEntry = UpdateMeta & {
  content: string;
};

function parseFrontmatter(source: string): { frontmatter: UpdateFrontmatter; content: string } {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    throw new Error("Invalid update markdown. Missing frontmatter block.");
  }

  const [, rawFrontmatter, rawContent] = match;
  const values = rawFrontmatter.split("\n").reduce<Record<string, string>>((acc, line) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return acc;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^"(.*)"$/, "$1");

    acc[key] = value;
    return acc;
  }, {});

  return {
    frontmatter: {
      title: values.title ?? "",
      date: values.date ?? "",
      summary: values.summary ?? "",
    },
    content: rawContent.trim(),
  };
}

function sortByDateDesc<T extends { date: string }>(items: T[]) {
  return [...items].sort((left, right) => right.date.localeCompare(left.date));
}

export function formatUpdateDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export async function getAllUpdatesMeta(): Promise<UpdateMeta[]> {
  const files = await readdir(updatesDirectory);
  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const source = await readFile(path.join(updatesDirectory, file), "utf8");
        const { frontmatter } = parseFrontmatter(source);

        return {
          slug: file.replace(/\.md$/, ""),
          ...frontmatter,
        };
      }),
  );

  return sortByDateDesc(entries);
}

export async function getAllUpdates(): Promise<UpdateEntry[]> {
  const files = await readdir(updatesDirectory);
  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const source = await readFile(path.join(updatesDirectory, file), "utf8");
        const { frontmatter, content } = parseFrontmatter(source);

        return {
          slug: file.replace(/\.md$/, ""),
          content,
          ...frontmatter,
        };
      }),
  );

  return sortByDateDesc(entries);
}

export async function getUpdateBySlug(slug: string): Promise<UpdateEntry | null> {
  const filePath = path.join(updatesDirectory, `${slug}.md`);

  try {
    const source = await readFile(filePath, "utf8");
    const { frontmatter, content } = parseFrontmatter(source);

    return {
      slug,
      ...frontmatter,
      content,
    };
  } catch {
    return null;
  }
}
