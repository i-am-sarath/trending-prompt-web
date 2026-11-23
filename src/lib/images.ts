import { existsSync } from 'node:fs';
import path from 'node:path';
import manifest from '../generated/media.json';

export type MediaRecord = {
  width: number;
  height: number;
  pin: boolean;
  pinWidth?: number;
  pinHeight?: number;
  /** Set when the prompt supplies its own pinImage instead of the generated crop. */
  pinImage?: string;
};

const media = manifest as Record<string, MediaRecord>;

export function mediaRecord(slug: string): MediaRecord | undefined {
  return media[slug];
}

export function mediaUrl(slug: string): string {
  return `/media/${slug}.jpg`;
}

export function pinUrl(slug: string): string {
  return `/pins/${slug}.jpg`;
}

export function publicFileExists(urlPath: string | undefined): boolean {
  if (!urlPath || urlPath.includes('..')) return false;
  return existsSync(path.join(process.cwd(), 'public', urlPath.replace(/^\//, '')));
}
