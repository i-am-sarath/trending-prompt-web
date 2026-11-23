import type { APIRoute } from 'astro';
import { publishedPosts, publishedPrompts, subjectsOf, tagIndex } from '../lib/content';
import { absolute } from '../lib/site';
import { HUBS } from '../lib/taxonomy';
import { isoDate } from '../lib/prompt';

const xml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const prompts = await publishedPrompts();
  const posts = await publishedPosts();
  const newestPrompt = prompts[0] ? isoDate(prompts[0].data.date) : undefined;
  const newestPost = posts[0] ? isoDate(posts[0].data.date) : undefined;
  const subjects = subjectsOf(prompts);
  const tags = tagIndex(prompts).filter((tag) => tag.prompts.length >= 2);

  const entries: { loc: string; lastmod?: string; changefreq: string; priority: string }[] = [
    { loc: absolute('/'), lastmod: newestPrompt, changefreq: 'daily', priority: '1.0' },
    { loc: absolute('/blog'), lastmod: newestPost, changefreq: 'weekly', priority: '0.9' },
    { loc: absolute('/about'), changefreq: 'yearly', priority: '0.5' },
    { loc: absolute('/contact'), changefreq: 'yearly', priority: '0.3' },
    { loc: absolute('/privacy'), changefreq: 'yearly', priority: '0.3' },
    { loc: absolute('/terms'), changefreq: 'yearly', priority: '0.3' },
    ...posts.map((post) => ({
      loc: absolute(`/blog/${post.slug}`),
      lastmod: isoDate(post.data.updated ?? post.data.date),
      changefreq: 'monthly',
      priority: '0.8',
    })),
    ...prompts.map((prompt) => ({
      loc: absolute(`/prompts/${prompt.slug}`),
      lastmod: isoDate(prompt.data.date),
      changefreq: 'monthly',
      priority: '0.7',
    })),
    ...HUBS.map((hub) => ({
      loc: absolute(`/category/${hub.slug}`),
      lastmod: newestPrompt,
      changefreq: 'weekly',
      priority: '0.6',
    })),
    ...subjects.map((subject) => ({
      loc: absolute(`/category/${subject}`),
      lastmod: newestPrompt,
      changefreq: 'weekly',
      priority: '0.6',
    })),
    ...tags.map((tag) => ({
      loc: absolute(`/tag/${tag.slug}`),
      lastmod: tag.prompts[0] ? isoDate(tag.prompts[0].data.date) : undefined,
      changefreq: 'weekly',
      priority: '0.4',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((entry) => {
    const lastmod = entry.lastmod ? `    <lastmod>${xml(entry.lastmod)}</lastmod>\n` : '';
    return `  <url>\n    <loc>${xml(entry.loc)}</loc>\n${lastmod}    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`;
  })
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
