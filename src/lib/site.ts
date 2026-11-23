/** Single source of truth for the details that appear in metadata and legal pages. */
export const SITE = {
  url: 'https://trendingprompt.org',
  name: 'trendingprompt',
  legalName: 'trendingprompt.org',
  tagline: 'AI prompts, with the picture they made',
  /** Update this to a mailbox you actually read — it appears on Contact and Privacy. */
  email: 'hello@trendingprompt.org',
  /** Shown on the privacy policy as the last review date. */
  policyUpdated: '11 August 2026',
} as const;

/** Absolute canonical URL. Directory routes keep a trailing slash; files do not. */
export function absolute(pathname: string): string {
  let path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const isFile = /\.[a-z0-9]+$/i.test(path);
  if (!isFile && !path.endsWith('/')) path += '/';
  return new URL(path, SITE.url).href;
}
