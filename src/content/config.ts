import { defineCollection, z } from 'astro:content';

const prompts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    prompt: z.string(),
    image: z.string(),          // path under /uploads
    category: z.string().default('general'),
    tool: z.string().optional(), // e.g. Midjourney, DALL-E
    date: z.date(),
  }),
});

export const collections = { prompts };
