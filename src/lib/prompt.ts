/**
 * Image prompts are written as comma-delimited clause chains
 * ("a cyberpunk city, rain-slicked streets, 8k"). Splitting on that
 * delimiter is what lets the specimen panel show how a prompt is built.
 * Display only — the copy and download actions always use the original string.
 */
export function toClauses(prompt: string): string[] {
  return prompt
    .split(',')
    .map((clause) => clause.trim())
    .filter(Boolean);
}

/** Trim to a word boundary for card hover previews and meta descriptions. */
export function excerpt(text: string, max = 120): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,.;:\s]+$/, '')}…`;
}

/** "15 Jan 2026" — UTC so a date-only frontmatter value never shifts a day. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
