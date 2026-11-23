/** Hub categories are the primary navigation. Slugs are stable URLs under /category/. */
export const HUBS = [
  {
    slug: 'image-generation',
    label: 'Image generation',
    blurb: 'Describe a scene from scratch',
    lede: 'Prompts that stand on their own. Paste the text into an image model and it builds the picture from the words: subject, setting, lens, light, and style. No source photo.',
    body: 'Use these when you do not have a picture yet. Every published prompt on the site today starts from a photo you upload, so it is filed under image editing instead. When a from-scratch prompt earns a page, it will show up here with the image it produced and a copy button.',
    guideSlugs: [
      'how-to-write-ai-image-prompts',
      'ai-art-style-prompts-list',
      'seeds-variations-and-reproducibility',
      'midjourney-vs-dalle-vs-stable-diffusion',
    ],
  },
  {
    slug: 'image-editing',
    label: 'Image editing',
    blurb: 'Restyle a photo you already have',
    lede: 'Prompts that start from a picture you upload. The model keeps the person or product recognisable and changes the era, the light, the medium, or the setting.',
    body: 'Copy the text, then swap the reference photo for your own. Each entry shows the example output. Image-editing prompts also get a tall 2:3 image and a Save button for Pinterest.',
    guideSlugs: [
      'ai-hug-your-younger-self-polaroid-prompt',
      'ai-90s-yearbook-photo-prompt',
      'ai-action-figure-and-figurine-prompts',
      'trending-ai-image-prompts-november-2026',
    ],
  },
  {
    slug: 'chatgpt',
    label: 'ChatGPT',
    blurb: 'ChatGPT and GPT Image',
    lede: 'Prompts run in ChatGPT, including GPT Image. Most of the entries here are image edits: upload a photo, paste the prompt, keep the face or the product.',
    body: 'A text prompt that is not about making a picture belongs here too. Set the tool to ChatGPT and the category to chatgpt when the prompt is only for the chat model.',
    guideSlugs: [
      'how-to-write-ai-image-prompts',
      'ai-action-figure-and-figurine-prompts',
      'trending-ai-image-prompts-november-2026',
    ],
  },
  {
    slug: 'claude',
    label: 'Claude',
    blurb: 'Prompts written for Claude',
    lede: 'A home for prompts meant to be pasted into Claude: briefs, rewrites, research passes, and structured tasks.',
    body: 'Nothing is filed here yet. A new Claude prompt is one markdown file. It gets its own page, the full text, and a copy button, the same as every other entry.',
    guideSlugs: ['how-to-write-ai-image-prompts', 'prompt-weighting-and-emphasis'],
  },
  {
    slug: 'grok',
    label: 'Grok',
    blurb: 'Prompts written for Grok',
    lede: 'Prompts for Grok. Image prompts and chat prompts both land here, with the model named on the entry so you know what was actually used.',
    body: 'Nothing is filed here yet. Add a file under src/content/prompts with category grok and tool Grok when the first one is ready.',
    guideSlugs: ['how-to-write-ai-image-prompts'],
  },
  {
    slug: 'gemini',
    label: 'Gemini',
    blurb: 'Gemini image edits and prompts',
    lede: 'Prompts run in Gemini. The current set is image editing: yearbook portraits, instant-film pictures, figurines, anime restyles, product shots, and night streets.',
    body: 'Each page has the example output next to the exact text. Gemini prompts that generate an image from scratch, with no upload, use category image-generation and tool Gemini so they stay listed here as well.',
    guideSlugs: [
      'ai-90s-yearbook-photo-prompt',
      'ai-hug-your-younger-self-polaroid-prompt',
      'ai-action-figure-and-figurine-prompts',
      'trending-ai-image-prompts-november-2026',
    ],
  },
  {
    slug: 'midjourney',
    label: 'Midjourney',
    blurb: 'Parameters, styles, and prompts',
    lede: 'Midjourney prompts, including the parameters that change the picture: --ar, --stylize, --seed, and the rest.',
    body: 'No Midjourney prompt is in the gallery yet. The guides below are the working reference for flags, negative prompts, and how Midjourney compares with other generators. A prompt file with tool Midjourney will join this page on the next build.',
    guideSlugs: [
      'midjourney-parameters-guide',
      'midjourney-vs-dalle-vs-stable-diffusion',
      'negative-prompts-explained',
      'prompt-weighting-and-emphasis',
      'ai-image-aspect-ratio-guide',
    ],
  },
  {
    slug: 'agents',
    label: 'Other AI agents',
    blurb: 'Every other tool and agent',
    lede: 'Prompts for tools other than ChatGPT, Claude, Grok, Gemini, and Midjourney. That includes other chat agents, local models, and newer apps.',
    body: 'If a prompt names one of those five, it is listed on that tool’s page. This page is for everything else. Set category to agents, or set category to image-generation or image-editing and name the tool.',
    guideSlugs: [
      'midjourney-vs-dalle-vs-stable-diffusion',
      'how-to-write-ai-image-prompts',
      'consistent-characters-across-ai-images',
    ],
  },
] as const;

export type HubSlug = (typeof HUBS)[number]['slug'];

export const HUB_SLUGS = HUBS.map((hub) => hub.slug) as [HubSlug, ...HubSlug[]];

const HUB_SET = new Set<string>(HUB_SLUGS);

export function isHubSlug(value: string | undefined): value is HubSlug {
  return !!value && HUB_SET.has(value);
}

export function hubBySlug(slug: string) {
  return HUBS.find((hub) => hub.slug === slug);
}

/** Which tool hub a free-text tool name should also appear on. */
export function toolHub(tool?: string): HubSlug | null {
  if (!tool) return null;
  const t = tool.toLowerCase();
  if (t.includes('chatgpt') || t.includes('dall') || t.includes('gpt')) return 'chatgpt';
  if (t.includes('claude')) return 'claude';
  if (t.includes('grok')) return 'grok';
  if (t.includes('gemini') || t.includes('imagen')) return 'gemini';
  if (t.includes('midjourney') || t.includes('niji')) return 'midjourney';
  return 'agents';
}

export function inHub(data: { category: string; tool?: string }, slug: string): boolean {
  if (data.category === slug) return true;
  if (slug === 'image-generation' || slug === 'image-editing') return false;
  return toolHub(data.tool) === slug;
}

export function subjectLabel(slug: string): string {
  if (slug === 'sci-fi') return 'Sci-fi';
  return slug
    .split('-')
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(' ');
}

export function categoryLabel(slug: string): string {
  return hubBySlug(slug)?.label ?? subjectLabel(slug);
}

/** URL slug for a free-text tag. ASCII, lowercase, hyphenated. */
export function tagSlug(tag: string): string {
  return tag
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Tags that repeat a hub or a subject archive link there, so we do not publish
 * a second page with the same listing.
 */
export function tagHref(tag: string, subjects: Iterable<string>): string {
  const slug = tagSlug(tag);
  if (isHubSlug(slug) || new Set(subjects).has(slug)) return `/category/${slug}`;
  return `/tag/${slug}`;
}
