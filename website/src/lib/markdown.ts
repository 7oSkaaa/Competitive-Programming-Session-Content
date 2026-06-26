/** Normalize repo README markdown for rich session page rendering. */

function isTableSeparator(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes("-")) return false;
  return /^(\|?\s*[-: ]+)+\|?\s*$/.test(trimmed);
}

function isTableRow(line: string, prevIsTable: boolean, nextIsSeparator: boolean): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes("|")) return false;
  if (trimmed.startsWith("|")) return true;
  if (prevIsTable || nextIsSeparator) return true;
  return /^[^|\n]+\|/.test(trimmed);
}

function padTableRow(line: string): string {
  let row = line.trim();
  if (!row.startsWith("|")) row = `|${row}`;
  if (!row.endsWith("|")) row = `${row}|`;
  return row;
}

function normalizeSeparatorRow(line: string): string {
  const padded = padTableRow(line);
  const cells = padded
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim())
    .filter((_, i, arr) => i < arr.length);
  const count = Math.max(cells.length, 1);
  return `|${Array(count).fill(" --- ").join("|")}|`;
}

export function normalizeMarkdownTables(markdown: string): string {
  const lines = markdown.split("\n");
  const output: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const prev = output[output.length - 1] ?? "";
    const next = lines[i + 1] ?? "";
    const prevIsTable = prev.trim().includes("|");
    const nextIsSeparator = isTableSeparator(next);

    if (isTableSeparator(line)) {
      output.push(normalizeSeparatorRow(line));
      continue;
    }

    if (isTableRow(line, prevIsTable, nextIsSeparator)) {
      output.push(padTableRow(line));
      continue;
    }

    output.push(line);
  }

  return output.join("\n");
}

export function normalizeMarkdownForRender(markdown: string): string {
  let md = markdown.replace(/\r\n/g, "\n");

  md = md
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?[iI]>/g, "*")
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "# $1\n\n")
    .replace(
      /<summary>\s*<h3>([\s\S]*?)<\/h3>\s*<\/summary>/gi,
      "<summary>$1</summary>",
    )
    .replace(/<code>([\s\S]*?)<\/code>/gi, (_, code) => `\`${code.trim()}\``);

  md = normalizeMarkdownTables(md);
  md = md.replace(/\n{4,}/g, "\n\n\n");

  return md.trim();
}

/** @deprecated use normalizeMarkdownForRender */
export const preprocessMarkdownForDisplay = normalizeMarkdownForRender;
