/**
 * Writes the display JPEG and the 2:3 Pinterest crop for every prompt that has
 * an image on disk. Commit the files this creates. The site build does not run
 * this, so Cloudflare does not need the native image library.
 *
 *   npm install --no-save sharp
 *   node scripts/generate-images.mjs
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { slug as githubSlug } from 'github-slugger';

const sharp = (await import('sharp')).default;

const root = process.cwd();
const promptsDir = path.join(root, 'src/content/prompts');
const mediaDir = path.join(root, 'public/media');
const pinsDir = path.join(root, 'public/pins');
const manifestPath = path.join(root, 'src/generated/media.json');

const field = (frontmatter, key) => {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!match) return undefined;
  const value = match[1].trim().replace(/^['"]|['"]$/g, '');
  return value === '' ? undefined : value;
};

await mkdir(mediaDir, { recursive: true });
await mkdir(pinsDir, { recursive: true });
await mkdir(path.dirname(manifestPath), { recursive: true });

const manifest = {};
const files = (await readdir(promptsDir)).filter((name) => name.endsWith('.md')).sort();

for (const file of files) {
  const raw = await readFile(path.join(promptsDir, file), 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`No frontmatter in ${file}`);
  const frontmatter = match[1];
  const draft = field(frontmatter, 'draft') === 'true';
  const image = field(frontmatter, 'image');
  const category = field(frontmatter, 'category');
  const pinImage = field(frontmatter, 'pinImage');
  const slug = githubSlug(file.replace(/\.md$/, ''));
  if (!image) throw new Error(`${file} is missing image`);

  const source = path.join(root, 'public', image.replace(/^\//, ''));
  let input;
  try {
    input = await readFile(source);
  } catch {
    if (draft) {
      console.log('skip draft without image', slug);
      continue;
    }
    throw new Error(`Published prompt ${slug} is missing ${image}`);
  }

  const display = await sharp(input)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  const displayMeta = await sharp(display).metadata();
  await writeFile(path.join(mediaDir, `${slug}.jpg`), display);

  const entry = {
    width: displayMeta.width,
    height: displayMeta.height,
    pin: false,
  };

  if (category === 'image-editing' && !pinImage) {
    const pin = await sharp(input)
      .rotate()
      .resize(1000, 1500, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
    await writeFile(path.join(pinsDir, `${slug}.jpg`), pin);
    entry.pin = true;
    entry.pinWidth = 1000;
    entry.pinHeight = 1500;
  } else if (pinImage) {
    const custom = await sharp(path.join(root, 'public', pinImage.replace(/^\//, ''))).metadata();
    entry.pin = true;
    entry.pinWidth = custom.width;
    entry.pinHeight = custom.height;
    entry.pinImage = pinImage;
  }

  manifest[slug] = entry;
  console.log(slug, entry.width, entry.height, entry.pin ? 'pin' : 'no pin');
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`wrote ${Object.keys(manifest).length} images`);
