# Adding a prompt or a blog post

trendingprompt is a static Astro site. A new prompt or guide goes live when its file is on `main` and the site rebuilds. You do not edit HTML. A file that breaks the rules below fails `npm run build`, so a bad entry never publishes.

The filename is the URL slug. Do not put a `slug` field in the frontmatter.

| File | URL |
| --- | --- |
| `src/content/prompts/red-noir-portrait.md` | `https://trendingprompt.org/prompts/red-noir-portrait/` |
| `src/content/posts/how-to-write-ai-image-prompts.md` | `https://trendingprompt.org/blog/how-to-write-ai-image-prompts/` |

Do not rename a file after it has been published. That changes the URL and drops the old address. To fix a title, edit the frontmatter and leave the filename alone.

## Prompt

Create `src/content/prompts/<slug>.md`.

```md
---
title: "90s Yearbook Portrait"
description: "Turn a selfie into a believable 1990s American high-school yearbook portrait."
prompt: |-
  The exact text to copy, including line breaks and parameters such as --ar 3:4.
image: /uploads/90s-yearbook-portrait.jpg
category: image-editing
subject: portrait
tool: Gemini
tags:
  - yearbook
  - 90s
  - gemini
credit: "trendingprompt"
date: 2026-11-23
trending: true
draft: false
---

Optional notes. This markdown is rendered on the prompt page under "Notes on this prompt".
```

### Fields

| Field | Required | What to put |
| --- | --- | --- |
| `title` | yes | Name of the prompt. Plain text. |
| `description` | yes | One or two sentences, 40–220 characters. This is the meta description. Aim for under 160. |
| `prompt` | yes | The exact model input. Use `prompt: \|-` when it has more than one line. Do not paraphrase. |
| `image` | yes | Example output. See images below. |
| `pinImage` | no | Your own 2:3 Pinterest image. Omit it to let the build crop one. |
| `category` | yes | One of the hub slugs in the list below. |
| `subject` | no | Topic archive such as `portrait` or `product`. Lowercase, hyphenated, and not a hub slug. Keeps `/category/<subject>/` working. |
| `tool` | yes | `ChatGPT`, `Claude`, `Grok`, `Gemini`, `Midjourney`, or another product name. |
| `tags` | no | Short lowercase labels. They become chips and, when two prompts share one, a tag page. |
| `credit` | no | Source or credit line, shown on the page and in structured data. |
| `date` | yes | `YYYY-MM-DD`. Newest dates appear in New. |
| `trending` | no | `true` or `false`. Default `false`. `true` puts it in the Trending row. |
| `draft` | no | `true` hides the prompt from the site, sitemap, and feeds. The file is still validated. Default `false`. |

### Categories

`category` must be exactly one of:

- `image-generation` — text-to-image, no source photo
- `image-editing` — starts from a photo or product shot the reader uploads
- `chatgpt`
- `claude`
- `grok`
- `gemini`
- `midjourney`
- `agents` — any other tool

A prompt is also listed on its tool page. `tool: Gemini` with `category: image-editing` appears under both Image editing and Gemini. `tool: Midjourney` appears under Midjourney. A tool name that is not one of those five also appears under Other AI agents.

`subject` is extra. `subject: portrait` also lists the prompt at `/category/portrait/`. Those topic URLs already exist; keep using the same slugs (`portrait`, `product`, `anime`, `sci-fi`, `general`, `logo`, `fantasy`) so old links stay valid. Do not invent a subject that matches a hub slug.

### Images

1. Put the example output in `public/uploads/`.
2. Name it after the slug: `public/uploads/red-noir-portrait.jpg`.
3. Set `image: /uploads/red-noir-portrait.jpg` (leading slash, no `public`).
4. Prefer JPEG or WebP. A published prompt whose image file is missing fails the build. Drafts may point at a file you have not uploaded yet.
5. Do not hotlink an external URL.

The build makes two derivatives and the pages use those, not the original file:

- `/media/<slug>.jpg` — display image, longest side at most 1600px
- `/pins/<slug>.jpg` — 1000×1500 (2:3) cover crop, for image-editing prompts

Pinterest reads the 2:3 image from the Open Graph tags. The prompt page shows the uncropped example and a Save button that pins the tall image. The crop is centred, with a bias toward the subject. If a face or product gets cut off, add your own file at 1000×1500 and set:

```yaml
pinImage: /uploads/red-noir-portrait-pin.jpg
```

`pinImage` must also live under `/uploads/` and must exist when `draft` is not `true`.

### Naming

- Slug: lowercase English, digits, and hyphens. `red-noir-portrait`, not `Red Noir`.
- One prompt per file.
- No spaces in the filename. Characters such as `é` or an em dash are valid in existing files; do not rename those. New files should stay within `a-z`, `0-9`, and `-`.

## Blog post

Create `src/content/posts/<slug>.md`.

```md
---
title: "How to write AI image prompts that actually work"
description: "A six-slot prompt structure that transfers between Midjourney, ChatGPT, and Gemini."
date: 2026-11-23
updated: 2026-11-23
category: guides
tags:
  - prompt structure
  - beginners
author: "The trendingprompt desk"
relatedPrompts:
  - 90s-yearbook-portrait
  - polaroid-with-my-younger-self
draft: false
---

The body is normal markdown. Link a prompt like this:

[90s Yearbook Portrait](/prompts/90s-yearbook-portrait/)

Link a category like this:

[Gemini prompts](/category/gemini/)
```

### Fields

| Field | Required | What to put |
| --- | --- | --- |
| `title` | yes | Headline. |
| `description` | yes | Standfirst and meta description. Keep it near 160 characters. |
| `date` | yes | `YYYY-MM-DD`. |
| `updated` | no | Set it when the meaning of the guide changes. |
| `category` | no | `guides`, `reference`, `comparisons`, `workflow`, `legal`, or `trends`. Default `guides`. |
| `tags` | no | Topical labels. Overlap them with prompt tags when the guide is about those prompts. |
| `author` | no | Default `The trendingprompt desk`. |
| `relatedPrompts` | no | Prompt slugs (filenames without `.md`). Unknown slugs fail the build. The guide also picks up any `/prompts/<slug>/` link in the body. |
| `draft` | no | `true` hides the post from the site, sitemap, and RSS. |

Write the body in markdown. Use `##` headings; the page builds a table of contents from them. Link out to the prompt pages and category hubs you mention. Those links are how guides and prompts point at each other.

Images inside a post can use a normal markdown image pointed at `/uploads/...`.

## Check before you push

```bash
npm install
npm run build
```

The build validates every prompt and post, including drafts. It fails if a category is not in the list, a description is missing or the wrong length, a published image path does not exist, or a `relatedPrompts` slug does not match a file.

`npm run dev` serves the site at `http://localhost:4321`. Search works in the browser: it filters the cards on the page and does not need a server.
