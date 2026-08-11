/** Single source of truth for the details that appear in metadata and legal pages. */
export const SITE = {
  url: 'https://trendingprompt.org',
  name: 'trendingprompt',
  legalName: 'trendingprompt.org',
  tagline: 'One AI prompt a day',
  /** Update this to a mailbox you actually read — it appears on Contact and Privacy. */
  email: 'hello@trendingprompt.org',
  /** Shown on the privacy policy as the last review date. */
  policyUpdated: '11 August 2026',
} as const;
