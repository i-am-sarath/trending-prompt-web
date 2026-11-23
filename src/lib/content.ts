import { getCollection, type CollectionEntry } from 'astro:content';
import { mediaRecord } from './images';
import { inHub, isHubSlug, tagSlug, type HubSlug } from './taxonomy';

export type PromptEntry = CollectionEntry<'prompts'>;
export type PostEntry = CollectionEntry<'posts'>;

export async function allPrompts(): Promise<PromptEntry[]> {
  const prompts = await getCollection('prompts');
  return prompts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Published prompts, newest first. Throws if a public entry is missing its image. */
export async function publishedPrompts(): Promise<PromptEntry[]> {
  const prompts = (await allPrompts()).filter((prompt) => !prompt.data.draft);
  for (const prompt of prompts) {
    const media = mediaRecord(prompt.slug);
    if (!media) {
      throw new Error(
        `Published prompt "${prompt.slug}" has no generated image. Run: npm install --no-save sharp && node scripts/generate-images.mjs`
      );
    }
    if (prompt.data.category === 'image-editing' && !prompt.data.pinImage && !media.pin) {
      throw new Error(
        `Published prompt "${prompt.slug}" has no Pinterest image. Run node scripts/generate-images.mjs.`
      );
    }
    if (prompt.data.pinImage && media.pinImage !== prompt.data.pinImage) {
      throw new Error(
        `Published prompt "${prompt.slug}" pinImage does not match src/generated/media.json. Run node scripts/generate-images.mjs.`
      );
    }
    if (prompt.data.subject && isHubSlug(prompt.data.subject)) {
      throw new Error(
        `Prompt "${prompt.slug}" uses subject "${prompt.data.subject}", which is a hub category. Use category for hubs and subject for a topic such as portrait or product.`
      );
    }
  }
  return prompts;
}

export async function publishedPosts(): Promise<PostEntry[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function promptsInHub(prompts: PromptEntry[], slug: HubSlug): PromptEntry[] {
  return prompts.filter((prompt) => inHub(prompt.data, slug));
}

export function subjectsOf(prompts: PromptEntry[]): string[] {
  return [...new Set(prompts.map((prompt) => prompt.data.subject).filter((s): s is string => !!s))].sort();
}

export function relatedPrompts(current: PromptEntry, prompts: PromptEntry[], limit = 3): PromptEntry[] {
  const tags = new Set(current.data.tags.map((tag) => tag.toLowerCase()));
  return prompts
    .filter((prompt) => prompt.slug !== current.slug)
    .map((prompt) => {
      let score = 0;
      if (prompt.data.category === current.data.category) score += 3;
      if (current.data.tool && prompt.data.tool === current.data.tool) score += 2;
      if (current.data.subject && prompt.data.subject === current.data.subject) score += 2;
      for (const tag of prompt.data.tags) {
        if (tags.has(tag.toLowerCase())) score += 1;
      }
      return { prompt, score };
    })
    .filter((row) => row.score > 0)
    .sort(
      (a, b) => b.score - a.score || b.prompt.data.date.valueOf() - a.prompt.data.date.valueOf()
    )
    .slice(0, limit)
    .map((row) => row.prompt);
}

export function relatedPosts(prompt: PromptEntry, posts: PostEntry[], limit = 3): PostEntry[] {
  const tags = new Set(prompt.data.tags.map((tag) => tag.toLowerCase()));
  const subject = prompt.data.subject?.toLowerCase();
  const tool = prompt.data.tool?.toLowerCase();
  return posts
    .map((post) => {
      let score = 0;
      if (post.body.includes(`/prompts/${prompt.slug}`)) score += 6;
      for (const tag of post.data.tags) {
        const value = tag.toLowerCase();
        if (tags.has(value)) score += 2;
        if (subject && value === subject) score += 2;
        if (tool && value === tool) score += 1;
      }
      if (post.data.relatedPrompts?.includes(prompt.slug)) score += 6;
      return { post, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.date.valueOf() - a.post.data.date.valueOf())
    .slice(0, limit)
    .map((row) => row.post);
}

export function promptsForPost(post: PostEntry, prompts: PromptEntry[], limit = 4): PromptEntry[] {
  const explicit = new Set(post.data.relatedPrompts ?? []);
  const linked = prompts.filter(
    (prompt) => explicit.has(prompt.slug) || post.body.includes(`/prompts/${prompt.slug}`)
  );
  if (linked.length > 0) return linked.slice(0, limit);

  const tags = new Set(post.data.tags.map((tag) => tag.toLowerCase()));
  return prompts
    .map((prompt) => {
      let score = 0;
      if (prompt.data.subject && tags.has(prompt.data.subject.toLowerCase())) score += 2;
      if (prompt.data.tool && tags.has(prompt.data.tool.toLowerCase())) score += 1;
      for (const tag of prompt.data.tags) {
        if (tags.has(tag.toLowerCase())) score += 1;
      }
      return { prompt, score };
    })
    .filter((row) => row.score > 0)
    .sort(
      (a, b) => b.score - a.score || b.prompt.data.date.valueOf() - a.prompt.data.date.valueOf()
    )
    .slice(0, limit)
    .map((row) => row.prompt);
}

export function tagIndex(prompts: PromptEntry[]) {
  const subjects = new Set(subjectsOf(prompts));
  const map = new Map<string, { label: string; prompts: PromptEntry[] }>();
  for (const prompt of prompts) {
    for (const tag of prompt.data.tags) {
      const slug = tagSlug(tag);
      if (!slug || isHubSlug(slug) || subjects.has(slug)) continue;
      const row = map.get(slug) ?? { label: tag, prompts: [] };
      if (!row.prompts.some((item) => item.slug === prompt.slug)) row.prompts.push(prompt);
      map.set(slug, row);
    }
  }
  return [...map.entries()]
    .map(([slug, row]) => ({ slug, label: row.label, prompts: row.prompts }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
