import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "../services.module.css";

export type Heading = { id: string; text: string };

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const INLINE_TOKEN = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\([^)\s]+\))/g;
const LINK_TOKEN = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

export function stripInline(text: string) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*\s][^*]*)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");
}

export function renderInline(text: string, keyBase = "i"): ReactNode[] {
  return text
    .split(INLINE_TOKEN)
    .filter(Boolean)
    .map((part, index) => {
      const key = `${keyBase}-${index}`;
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={key}>{part.slice(2, -2)}</strong>;
      }
      const link = part.match(LINK_TOKEN);
      if (link) {
        const [, label, href] = link;
        return href.startsWith("/") ? (
          <Link key={key} href={href}>{label}</Link>
        ) : (
          <a key={key} href={href} target="_blank" rel="noreferrer">{label}</a>
        );
      }
      if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
        return <em key={key}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
}

type Block =
  | { kind: "h2" | "h3" | "p"; text: string }
  | { kind: "ul" | "ol" | "check"; items: string[] }
  | { kind: "table"; caption?: string; rows: string[][] }
  | { kind: "callout"; lines: string[] }
  | { kind: "figure"; alt: string; src: string; caption?: string };

const FIGURE = /^!\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)$/;

function parse(markdown: string): Block[] {
  const blocks: Block[] = [];
  const lines = markdown.trim().split(/\r?\n/);
  let paragraph: string[] = [];
  let pendingCaption: string | undefined;

  const flush = () => {
    if (paragraph.length) blocks.push({ kind: "p", text: paragraph.join(" ") });
    paragraph = [];
  };

  const pushItem = (kind: "ul" | "ol" | "check", item: string) => {
    const last = blocks.at(-1);
    if (last && last.kind === kind) last.items.push(item);
    else blocks.push({ kind, items: [item] });
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flush(); continue; }

    const figure = line.match(FIGURE);
    let match: RegExpMatchArray | null;

    if (line.startsWith("## ")) { flush(); blocks.push({ kind: "h2", text: line.slice(3) }); }
    else if (line.startsWith("### ")) { flush(); blocks.push({ kind: "h3", text: line.slice(4) }); }
    else if (figure) { flush(); blocks.push({ kind: "figure", alt: figure[1], src: figure[2], caption: figure[3] }); }
    else if (line.startsWith("Table: ")) { flush(); pendingCaption = line.slice(7); }
    else if (line.startsWith("|")) {
      flush();
      if (/^\|[\s:|-]+\|$/.test(line)) continue;
      const cells = line.slice(1, -1).split("|").map((cell) => cell.trim());
      const last = blocks.at(-1);
      if (last && last.kind === "table") last.rows.push(cells);
      else { blocks.push({ kind: "table", caption: pendingCaption, rows: [cells] }); pendingCaption = undefined; }
    }
    else if (line.startsWith("> ")) {
      flush();
      const last = blocks.at(-1);
      if (last && last.kind === "callout") last.lines.push(line.slice(2));
      else blocks.push({ kind: "callout", lines: [line.slice(2)] });
    }
    else if ((match = line.match(/^- \[[ x]\] (.*)$/))) { flush(); pushItem("check", match[1]); }
    else if (line.startsWith("- ")) { flush(); pushItem("ul", line.slice(2)); }
    else if ((match = line.match(/^\d+\.\s+(.*)$/))) { flush(); pushItem("ol", match[1]); }
    else paragraph.push(line);
  }
  flush();
  return blocks;
}

export function extractHeadings(markdown: string): Heading[] {
  return parse(markdown)
    .filter((block): block is { kind: "h2"; text: string } => block.kind === "h2")
    .map((block) => ({ id: slugify(block.text), text: block.text }));
}

export function renderMarkdown(markdown: string): ReactNode[] {
  let section = 0;

  return parse(markdown).map((block, index) => {
    const key = `b-${index}`;
    switch (block.kind) {
      case "h2":
        section += 1;
        return (
          <h2 key={key} id={slugify(block.text)} data-index={String(section).padStart(2, "0")}>
            {block.text}
          </h2>
        );
      case "h3":
        return <h3 key={key}>{renderInline(block.text, key)}</h3>;
      case "p":
        return <p key={key}>{renderInline(block.text, key)}</p>;
      case "ul":
      case "ol": {
        const List = block.kind;
        return (
          <List key={key}>
            {block.items.map((item, i) => <li key={i}>{renderInline(item, `${key}-${i}`)}</li>)}
          </List>
        );
      }
      case "check":
        return (
          <ul key={key} className={styles.checklist}>
            {block.items.map((item, i) => <li key={i}>{renderInline(item, `${key}-${i}`)}</li>)}
          </ul>
        );
      case "table": {
        const [head, ...rows] = block.rows;
        return (
          <div key={key} className={styles.tableWrap} role="region" aria-label={block.caption ?? "Comparison table"} tabIndex={0}>
            <table>
              {block.caption && <caption>{block.caption}</caption>}
              <thead><tr>{head.map((cell, i) => <th key={i} scope="col">{renderInline(cell, `${key}-h${i}`)}</th>)}</tr></thead>
              <tbody>
                {rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => c === 0
                      ? <th key={c} scope="row">{renderInline(cell, `${key}-${r}-${c}`)}</th>
                      : <td key={c} data-label={head[c]?.replace(/[*_`]/g, "")}>{renderInline(cell, `${key}-${r}-${c}`)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      case "callout":
        return (
          <aside key={key} className={styles.callout}>
            {block.lines.map((line, i) => <p key={i}>{renderInline(line, `${key}-${i}`)}</p>)}
          </aside>
        );
      case "figure":
        return (
          <figure key={key} className={styles.figure}>
            <div className={styles.figureFrame}>
              <Image src={block.src} alt={block.alt} fill sizes="(max-width: 900px) 92vw, 760px" />
            </div>
            {block.caption && <figcaption>{block.caption}</figcaption>}
          </figure>
        );
    }
  });
}
