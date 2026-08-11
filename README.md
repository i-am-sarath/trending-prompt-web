# trendingprompt.org

A fast, static, image-first gallery of AI prompts. Each entry is one AI image + the prompt text + copy/download actions, on its own shareable URL with correct social-preview meta.

No visitor accounts, no backend, no database. A single editor adds prompts through `/admin`.

**Stack:** Astro (static) · Cloudflare Pages · GitHub · Sveltia CMS · images in-repo (`public/uploads`)

---

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve dist/ locally
```

## Structure

```
src/content/prompts/     one .md per prompt (the CMS writes here)
src/content/posts/       one .md per blog guide (the CMS writes here)
src/content/config.ts    schemas for both collections
src/lib/prompt.ts        clause splitting, excerpts, dates, reading time
src/lib/site.ts          site URL, name, contact email, policy date
src/pages/index.astro    intro + latest drop + archive grid
src/pages/prompts/[slug] single prompt page (image, specimen, notes, copy)
src/pages/category/[c]   filtered gallery
src/pages/blog/          guide index and article template (TOC, prev/next)
src/pages/about|contact|privacy|terms   static pages
src/pages/404.astro      not-found page (Cloudflare serves it automatically)
src/pages/sitemap.xml.ts generated sitemap
src/pages/rss.xml.ts     generated RSS feed
src/components/          PromptCard, PromptSpecimen, CopyButton, CategoryNav
src/styles/global.css    design tokens + all page styles
public/uploads/          images (the CMS uploads here)
public/fonts/            self-hosted woff2 (no third-party font requests)
public/admin/            Sveltia CMS (index.html + config.yml)
public/robots.txt        crawl rules + sitemap pointer
public/og-default.jpg    fallback social preview image
```

### Before you launch — three edits only you can make

1. **`src/lib/site.ts`** — set `email` to a mailbox you actually read. It appears on
   Contact, Privacy and Terms.
2. **`src/pages/about.astro`** — there is a `TODO` comment in the "Who runs this"
   section. Put your name and a line of background there. Ad reviewers and readers
   both look for a real person, and it is the highest-value edit on the site.
3. **Delete the example content** (see the placeholder section at the end of this file).

### SEO surface

Every page carries a canonical URL, Open Graph and Twitter card tags, and
`max-image-preview:large`. Structured data is emitted per page type: `WebSite` and
`ItemList` on the home page, `Article` + `BreadcrumbList` on guides, `ImageObject` +
`BreadcrumbList` on prompts, `CollectionPage` on categories, and `AboutPage` /
`ContactPage` on those pages. Visible breadcrumbs match the schema. `sitemap.xml` and
`rss.xml` are generated at build time from the collections, so new entries appear
without touching anything.

## Design

**Daylight gallery.** The UI is deliberately achromatic — gallery-white walls, ink
captions, mount-board grey behind the artwork — so the only colour on a page comes
from the images themselves. One accent, ultramarine (`--klein`, #002FA7), is reserved
for things you can act on: the copy button, the clause separators, the active nav item,
and focus rings.

The signature element is the **specimen panel**: a prompt is split on its commas and
each clause is set on its own line, so the structure of a well-built prompt is legible
at a glance. It is a display layer only — copy and download always emit the original
unmodified string.

Typography does three jobs: **Anybody** (variable width) for the wordmark and display
headings, **Instrument Sans** for UI and card titles, **DM Mono** for prompt text and
every piece of metadata. All three are self-hosted in `public/fonts/` and preloaded, so
the site makes no third-party requests.

To re-skin, edit the `:root` block at the top of `src/styles/global.css` — the palette
is nine tokens and nothing hardcodes a colour outside them.

### Adding a prompt by hand

Create `src/content/prompts/my-slug.md`:

```md
---
title: "Cyberpunk City at Night"
prompt: "A sprawling cyberpunk megacity at night, neon signs..."
image: "/uploads/cyberpunk-city.jpg"
category: "sci-fi"
tool: "Midjourney"
date: 2026-01-15
---
```

The filename is the URL slug: `/prompts/my-slug/`. `category` must be URL-safe (it becomes `/category/<value>/`). Everything after the frontmatter is optional body text and is currently not rendered.

---

## 1. Deploy to Cloudflare Pages

1. Push this repo to GitHub on the `main` branch.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick the repo.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy. Every push to `main` now auto-rebuilds and publishes.
5. Pages → **Custom domains** → add `trendingprompt.org`.

If the production domain ever changes, update `site` in `astro.config.mjs` — the Open Graph tags are absolute URLs built from it.

## 2. Point the CMS at your repo

In `public/admin/config.yml`, set:

```yaml
backend:
  repo: YOUR_GITHUB_USERNAME/trendingprompt   # <-- your actual repo
  branch: main
```

## 3. Sveltia GitHub OAuth (one-time)

Sveltia commits to GitHub on your behalf, which needs an OAuth relay. Sveltia offers a hosted authenticator; the self-hosted route below keeps the client secret under your control.

1. GitHub → Settings → Developer settings → **OAuth Apps** → **New OAuth App**
   - Homepage URL: `https://trendingprompt.org`
   - Authorization callback URL: your auth worker URL, e.g. `https://sveltia-auth.YOURNAME.workers.dev/callback`
2. Note the **Client ID** and **Client Secret**.
3. Deploy the `sveltia-cms-auth` Cloudflare Worker (Sveltia's documented auth relay) and set env vars:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `ALLOWED_DOMAINS = trendingprompt.org`
4. Uncomment `base_url` in `public/admin/config.yml` and point it at the worker origin (no `/callback` suffix). Check current Sveltia docs — the key is `base_url` (plus `auth_endpoint` only if you changed the worker's route).
5. Test: visit `https://trendingprompt.org/admin`, log in with GitHub, create a test prompt, confirm a commit lands in `src/content/prompts/` and Cloudflare rebuilds.

**Note:** `/admin` writes to GitHub via the API, so it only works on the deployed site with the OAuth app configured — not against `npm run dev` out of the box.

## 4. AdSense

The structural prerequisites are in place: About, Contact, Privacy and Terms pages,
16 long-form guides, per-prompt editorial notes, working navigation, a sitemap and a
feed. What remains is content volume and the application itself.

**Before applying**

- Publish real prompts. Reviewers reject galleries that are thin, and three example
  entries is thin. Aim for 25–30 real entries with genuine notes on each.
- Delete the example content and placeholder images.
- Fill in the three edits listed at the top of this file — an anonymous site with a
  generic contact address is a common rejection reason.
- Verify the site in Google Search Console and submit `https://trendingprompt.org/sitemap.xml`.
  Being indexed is what produces the traffic that makes the account worth having.

**Applying**

1. Sign up at adsense.com, add the site, paste the verification snippet.
2. Review typically takes a few days to a couple of weeks.
3. On approval, uncomment the AdSense `<script>` in `src/layouts/BaseLayout.astro` and
   set your `ca-pub-` publisher id.

**`ads.txt` — deliberately not included.** An `ads.txt` file that does not list Google
as an authorised seller is worse than having no file at all, because it actively
declares that nobody is authorised to sell your inventory. Create `public/ads.txt`
*after* approval, containing the exact line AdSense gives you:

```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

**Placement.** Use manual units — after the specimen panel on a prompt page, and
between archive rows. Avoid auto-ads: they inject blocks that shift layout, which
costs Core Web Vitals on exactly the pages you want ranking.

**EEA/UK consent.** Serving personalised ads to European visitors requires a consent
mechanism. You do not need to build one: enable Google's own GDPR message under
Privacy & messaging in the AdSense dashboard. The privacy policy already describes
the arrangement.

> The Privacy and Terms pages are a solid, honest starting template written for this
> site's actual setup — no analytics, no accounts, ads via Google. They are not legal
> advice. Have them reviewed if the site becomes commercially significant, and update
> the review date in `src/lib/site.ts` whenever they change.

---

## Placeholder content — delete before launch

Three example entries ship with the repo so the archive grid, category nav, and
"more in this category" section have something to render:

- `src/content/prompts/example-cyberpunk-city.md`
- `src/content/prompts/example-neon-rain-alley.md`
- `src/content/prompts/example-ceramic-still-life.md`

Their images in `public/uploads/` and `public/og-default.jpg` are generated
placeholders, not real AI output. Delete the three `example-*.md` files and their
images once you have real prompts, and replace `og-default.jpg` with a real card.

## Out of scope (v1)

Visitor accounts / submissions · search (later: client-side over a generated JSON index) · Cloudflare R2 image storage (migrate when `public/uploads` gets large) · comments, likes, ratings.
