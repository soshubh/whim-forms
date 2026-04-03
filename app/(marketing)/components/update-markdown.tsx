import styles from "../page.module.css";

type UpdateMarkdownProps = {
  content: string;
};

type MarkdownBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

function parseMarkdown(content: string): MarkdownBlock[] {
  const lines = content.split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "heading", level: 2, text: line.slice(3).trim() });
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "heading", level: 3, text: line.slice(4).trim() });
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2).trim());
        index += 1;
      }

      blocks.push({ type: "list", items });
      continue;
    }

    const paragraphLines: string[] = [];

    while (index < lines.length) {
      const current = lines[index].trim();

      if (!current || current.startsWith("## ") || current.startsWith("### ") || current.startsWith("- ")) {
        break;
      }

      paragraphLines.push(current);
      index += 1;
    }

    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks;
}

export function UpdateMarkdown({ content }: UpdateMarkdownProps) {
  const blocks = parseMarkdown(content);

  return (
    <article className={styles.updateArticle}>
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return block.level === 2 ? (
            <h2 className={styles.updateArticleH2} key={`${block.text}-${index}`}>
              {block.text}
            </h2>
          ) : (
            <h3 className={styles.updateArticleH3} key={`${block.text}-${index}`}>
              {block.text}
            </h3>
          );
        }

        if (block.type === "list") {
          return (
            <ul className={styles.updateArticleList} key={`list-${index}`}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p className={styles.updateArticleParagraph} key={`${block.text}-${index}`}>
            {block.text}
          </p>
        );
      })}
    </article>
  );
}
