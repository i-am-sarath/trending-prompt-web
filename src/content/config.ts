import { defineCollection, z } from 'astro:content';
import { HUB_SLUGS } from '../lib/taxonomy';

const slug = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase hyphenated slug with no spaces');

const prompts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    /** One or two sentences. Also used as the meta description. Aim for under 160 characters. */
    description: z.string().min(40).max(220),
    /** The exact text to copy. Parameters and line breaks included. */
    prompt: z.string().min(1),
    /** Example output. A path under /uploads, for example /uploads/my-prompt.jpg */
    image: z.string().regex(/^\/uploads\/.+/, 'image must be a path starting with /uploads/'),
    /**
     * Optional hand-made 2:3 Pinterest image (1000×1500). When omitted, image-editing
     * prompts get an automatic cover crop at /pins/<slug>.jpg during the build.
     */
    pinImage: z
      .string()
      .regex(/^\/uploads\/.+/, 'pinImage must be a path starting with /uploads/')
      .optional(),
    /** Primary hub. This is the category breadcrumb and the main /category/<slug>/ listing. */
    category: z.enum(HUB_SLUGS),
    /**
     * Optional topic archive, preserved from the original gallery (portrait, product, sci-fi).
     * Must not be a hub slug. Publishes /category/<subject>/ as well as the hub page.
     */
    subject: slug.optional(),
    /** Product the prompt was written for. ChatGPT, Claude, Grok, Gemini, Midjourney, or another name. */
    tool: z.string().min(1),
    tags: z.array(z.string().min(1)).default([]),
    /** Where the prompt or example came from, if it needs a credit. */
    credit: z.string().min(1).optional(),
    date: z.coerce.date(),
    /** Editorial flag for the Trending row. Newest entries are surfaced separately. */
    trending: z.boolean().default(false),
    /** Hidden from the site, sitemap, and feeds. The file is still validated. */
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(320),
    date: z.date(),
    updated: z.date().optional(),
    category: z.string().default('guides'),
    tags: z.array(z.string()).default([]),
    author: z.string().default('The trendingprompt desk'),
    /** Prompt filenames (without .md) to feature at the bottom of the guide. */
    relatedPrompts: z.array(z.string().min(1)).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { prompts, posts };
