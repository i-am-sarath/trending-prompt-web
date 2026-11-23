import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DISPLAY_MAX = 1600;
const PIN_WIDTH = 1000;
const PIN_HEIGHT = 1500;

export function publicAbs(urlPath: string): string {
  const rel = urlPath.replace(/^\//, '');
  if (!rel || rel.includes('..') || path.isAbsolute(rel)) {
    throw new Error(`Invalid public image path: ${urlPath}`);
  }
  return path.join(process.cwd(), 'public', rel);
}

export function imageExists(urlPath: string | undefined): boolean {
  if (!urlPath) return false;
  try {
    return existsSync(publicAbs(urlPath));
  } catch {
    return false;
  }
}

export function mediaUrl(slug: string): string {
  return `/media/${slug}.jpg`;
}

export function pinUrl(slug: string): string {
  return `/pins/${slug}.jpg`;
}

export async function orientedSize(urlPath: string): Promise<{ width: number; height: number }> {
  const meta = await sharp(publicAbs(urlPath)).metadata();
  let width = meta.width ?? 0;
  let height = meta.height ?? 0;
  if ((meta.orientation ?? 1) >= 5) [width, height] = [height, width];
  if (!width || !height) throw new Error(`Could not read dimensions for ${urlPath}`);
  return { width, height };
}

export function fitInside(width: number, height: number, max = DISPLAY_MAX) {
  const scale = Math.min(1, max / Math.max(width, height));
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

const sizeCache = new Map<string, Promise<{ width: number; height: number }>>();

/** Pixel size of the derived display JPEG (max 1600px on the long edge). */
export function displaySize(urlPath: string): Promise<{ width: number; height: number }> {
  let pending = sizeCache.get(urlPath);
  if (!pending) {
    pending = orientedSize(urlPath).then((size) => fitInside(size.width, size.height));
    sizeCache.set(urlPath, pending);
  }
  return pending;
}

export async function renderDisplay(urlPath: string): Promise<Buffer> {
  const input = await readFile(publicAbs(urlPath));
  return sharp(input)
    .rotate()
    .resize({ width: DISPLAY_MAX, height: DISPLAY_MAX, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}

/** Centre-weighted 2:3 crop for Pinterest. Attention bias keeps faces when it can. */
export async function renderPin(urlPath: string): Promise<Buffer> {
  const input = await readFile(publicAbs(urlPath));
  return sharp(input)
    .rotate()
    .resize(PIN_WIDTH, PIN_HEIGHT, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
}

export const PIN_SIZE = { width: PIN_WIDTH, height: PIN_HEIGHT };
