import { defineCollection, z } from 'astro:content';

const prompts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    prompt: z.string(),
    image: z.string(),          // path under /uploads
    category: z.string().default('general'),
    tool: z.string().optional(), // e.g. Midjourney, DALL-E
    date: z.coerce.date(),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),     // also used as the meta description
    date: z.date(),
    updated: z.date().optional(),
    category: z.string().default('guides'),
    tags: z.array(z.string()).default([]),
    author: z.string().default('The trendingprompt desk'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { prompts, posts };
