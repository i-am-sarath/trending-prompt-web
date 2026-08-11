import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';

/** Build output uses directory format, so canonicals carry a trailing slash. */
const abs = (path: string) => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${clean === '/' ? '/' : clean.replace(/\/?$/, '/')}`;
};

const iso = (date: Date) => date.toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
  const prompts = (await getCollection('prompts')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  const categories = [...new Set(prompts.map((p) => p.data.category))].sort();

  const newestPrompt = prompts[0] ? iso(prompts[0].data.date) : undefined;
  const newestPost = posts[0] ? iso(posts[0].data.date) : undefined;

  const entries: { loc: string; lastmod?: string; changefreq: string; priority: string }[] = [
    { loc: abs('/'), lastmod: newestPrompt, changefreq: 'daily', priority: '1.0' },
    { loc: abs('/blog'), lastmod: newestPost, changefreq: 'weekly', priority: '0.9' },
    { loc: abs('/about'), changefreq: 'yearly', priority: '0.5' },
    { loc: abs('/contact'), changefreq: 'yearly', priority: '0.3' },
    { loc: abs('/privacy'), changefreq: 'yearly', priority: '0.3' },
    { loc: abs('/terms'), changefreq: 'yearly', priority: '0.3' },
    ...posts.map((p) => ({
      loc: abs(`/blog/${p.slug}`),
      lastmod: iso(p.data.updated ?? p.data.date),
      changefreq: 'monthly',
      priority: '0.8',
    })),
    ...prompts.map((p) => ({
      loc: abs(`/prompts/${p.slug}`),
      lastmod: iso(p.data.date),
      changefreq: 'monthly',
      priority: '0.7',
    })),
    ...categories.map((c) => ({
      loc: abs(`/category/${c}`),
      lastmod: newestPrompt,
      changefreq: 'weekly',
      priority: '0.6',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url>\n    <loc>${e.loc}</loc>\n${
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : ''
      }    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
