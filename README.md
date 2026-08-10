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
src/content/config.ts    content schema (title, prompt, image, category, tool, date)
src/lib/prompt.ts        clause splitting, excerpts, date formatting
src/pages/index.astro    latest drop + archive grid
src/pages/prompts/[slug] single prompt page (image, specimen, copy, download)
src/pages/category/[c]   filtered gallery
src/components/          PromptCard (archive plate), PromptSpecimen, CopyButton
src/styles/global.css    design tokens + all page styles
public/uploads/          images (the CMS uploads here)
public/fonts/            self-hosted woff2 (no third-party font requests)
public/admin/            Sveltia CMS (index.html + config.yml)
public/og-default.jpg    fallback social preview image
```

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

## 4. AdSense (later, after traffic)

1. Do **not** add ad code until AdSense approves the domain (it needs original content + real traffic).
2. On approval, uncomment the AdSense `<script>` in `src/layouts/BaseLayout.astro` and set your `ca-pub-` publisher id.
3. Use manual ad units in the gallery and prompt pages. Avoid auto-ads — the layout shift hurts Core Web Vitals.

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
