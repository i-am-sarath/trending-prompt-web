---
title: "AI image aspect ratios: the sizes to use and what each one does to composition"
description: "Why aspect ratio changes what a model draws, not just how it is cropped, plus the ratios worth memorising for print, social platforms, web headers and video."
date: 2026-07-27
category: "reference"
tags: ["aspect ratio", "composition", "midjourney", "reference"]
author: "The trendingprompt desk"
draft: false
---

Aspect ratio looks like a delivery detail — the shape you need for the platform you are posting to. It is actually a composition instruction, and it is one of the strongest available. Change the ratio and the model does not crop the same picture differently; it draws a different picture.

That is the part most people miss, and it is why "add full body to the prompt" so often fails when "switch to a 2:3 canvas" would have worked immediately.

## Why the shape changes the content

Models learn from captioned images, and the images in those datasets are not shaped at random. Portraits of people are overwhelmingly vertical. Landscapes and film stills are overwhelmingly horizontal. Album art, avatars and product tiles are square. The shape of the canvas is therefore correlated with genre, subject distance and framing throughout the training data.

When you ask for a `2:3` canvas, you are implicitly asking for the kind of picture that tends to be `2:3`: a standing figure, a full-length portrait, a magazine cover. Ask for `21:9` and you get the kind of picture that tends to be `21:9`: an establishing shot, a horizon, a lot of environment and a small subject.

You can exploit this. Instead of adding words to force a framing, choose the canvas that already implies it:

| You want | Try | Rather than |
|---|---|---|
| A full-body figure | `--ar 2:3` or `9:16` | "full body shot" |
| A tight face | `--ar 1:1` or `4:5` | "close-up portrait" |
| Sweeping environment | `--ar 21:9` | "wide establishing shot" |
| Object isolated on a surface | `--ar 1:1` | "centred product shot" |
| Film still feel | `--ar 2.39:1` | "cinematic" |

That last row is worth dwelling on. "Cinematic" is one of the most overused words in prompting and one of the least specific — it usually just adds contrast and teal. An actual anamorphic ratio does more to make an image feel like a film frame than the adjective ever will.

## The ratios worth knowing

**1:1 — square.** The default in most tools. Best for single objects, tight portraits, icons and anything destined for a grid. Square is compositionally demanding: with no long axis, there is nowhere for the eye to travel, so the subject has to carry the frame. It is the right choice for product work, where that is exactly the intention.

**4:5 — portrait, mild.** The most efficient shape on most social feeds: it occupies more vertical space than a square without being cropped. Good for portraits that include some environment.

**2:3 — portrait, classic.** The 35mm film frame, stood on end. This is the default for full-length figures and fashion, and it is what most print photography uses.

**9:16 — portrait, tall.** Phone screens and vertical video. Compositionally difficult for stills — it wants either a standing figure filling the frame or a strong vertical element like a doorway, a waterfall or a tower. Prompts without a vertical anchor tend to produce a lot of dead space at top and bottom.

**3:2 — landscape, classic.** The 35mm frame the correct way up. A safe, neutral, unfashionable, extremely useful ratio. When in doubt for a horizontal image, use this.

**16:9 — landscape, widescreen.** Screens, video thumbnails, web headers, slide decks. Slightly wider than 3:2, and reads as "screen" rather than "photograph."

**21:9 and 2.39:1 — anamorphic.** Cinema. Excellent for environments and for compositions with a lot of horizontal separation between elements. Coherence starts to suffer at these extremes, and repeated background elements — the same window, the same tree, three times across the frame — become a common failure. Generate more candidates than usual.

## Platform sizes worth memorising

Ratios matter more than pixel dimensions for prompting, but the pixels matter when you deliver. Approximate current values:

| Use | Ratio | Pixels |
|---|---|---|
| Instagram feed, portrait | 4:5 | 1080 × 1350 |
| Instagram / TikTok story | 9:16 | 1080 × 1920 |
| X / Twitter in-stream | 16:9 | 1600 × 900 |
| Open Graph / link preview | 1.91:1 | 1200 × 630 |
| YouTube thumbnail | 16:9 | 1280 × 720 |
| Pinterest pin | 2:3 | 1000 × 1500 |
| A4 print, portrait | ~1:1.41 | 300 dpi as needed |
| Desktop wallpaper | 16:9 | 2560 × 1440 |

The Open Graph size is the one people most often get wrong. Link previews on messaging apps and social platforms use roughly 1.91:1, so a square image gets centre-cropped and a tall image gets brutalised. If an image exists to be shared as a link, generate it at `--ar 1.91:1` — or at `16:9`, which is close enough — rather than cropping a square down afterwards.

## Composition inside each shape

Choosing the ratio is half the job; composing for it is the other half.

**Horizontal frames** want lateral separation. Put the subject off-centre and give it somewhere to look. Phrases that work: "subject on the left third, looking into the empty right of frame", "foreground rock, mid-ground lake, distant ridge." Horizontal images are also where atmospheric perspective pays off — haze, depth layers, receding scale.

**Vertical frames** want stacking. Something at the bottom, something in the middle, something at the top: "wet cobbles in the foreground, figure mid-frame, neon sign overhead." Without stacking, tall images look like a square photo with padding.

**Square frames** want centring or a strong diagonal. There is no long axis to exploit, so either commit to symmetry or run the composition corner to corner.

You can state these explicitly. "Composed for a tall frame, elements stacked from foreground to sky" is a legitimate and effective clause, and it does more than any number of quality tags.

## Upscaling and the resolution question

Aspect ratio and resolution are different things, and conflating them causes a lot of wasted effort.

The ratio sets the shape. Resolution is set by the tool's base output size and by whatever upscaling you apply afterwards. Adding `8k` or `ultra high resolution` to a prompt does not produce more pixels — at best it nudges the model toward finely textured subject matter, which is not the same thing and is frequently unwanted.

If you need print resolution, generate at the correct ratio and then upscale. Midjourney's own upscalers are competent; dedicated upscalers do better on photographic material. Generating at an extreme ratio and cropping to a normal one is usually a worse route than generating at the ratio you need, because you throw away pixels you paid for and you lose the compositional benefit described above.

One practical exception: if you need several crops of the same scene — a banner, a square and a story — generate wide and crop down, accepting the compositional compromise, rather than generating three times and getting three different scenes. Consistency between the crops is usually worth more than optimal composition in each.

## Common problems and what causes them

**Repeated elements across a wide frame.** Two moons, three identical windows, a doubled horizon. This is the model running out of ideas for the extra space. Fix by lowering the ratio toward 16:9, or by giving the frame more distinct content to hold: "a boat on the left, an island centre, a lighthouse on the right."

**Cropped heads in vertical frames.** Common in 9:16. The model composes for the ratio's typical content, which is a standing figure, and then over-fills. Add "full figure visible, headroom above" or step back to 2:3.

**Dead space top and bottom.** No vertical anchor. Add a foreground element and something overhead.

**The subject looks pasted on in square frames.** Square is unforgiving about depth. Add a specific ground plane and a background at a stated distance.

## A quick decision list

Ask three questions before you type the flag:

1. **Where does this end up?** Feed, print, video thumbnail, web header. That sets the family.
2. **How much environment does the picture need?** More environment, wider frame. A face, a squarer one.
3. **Is there a strong vertical or horizontal element?** Match the frame to it rather than fighting it.

Then set the ratio first, before you write the description, and let the shape guide the words. The [prompt gallery](/) lists the ratio used on entries where it matters, and the [parameters guide](/blog/midjourney-parameters-guide) covers `--ar` alongside the flags it interacts with.

## Common questions

### Does changing the aspect ratio just crop the image?

No, and this is the most useful thing to understand about it. The model composes for the canvas it is given, because canvas shape correlates with genre throughout the training data. A `2:3` prompt tends to produce a standing figure; the same prompt at `3:2` produces an environmental shot with the figure smaller. You get a different picture, not the same picture trimmed.

### What ratio should I use if the image will be shared as a link?

Roughly 1.91:1, or 16:9 as a close and easier substitute. Link previews on messaging apps and social platforms crop to about that shape, so a square image gets centre-cropped and a tall one is badly mangled. Generate at the delivery ratio rather than cropping afterwards, and you keep both the composition and the pixels you paid for.

### Why do wide images keep repeating elements?

Because the model runs out of distinct content for the extra width and fills it by duplicating what it already has — two moons, three identical windows, a doubled horizon. Either pull the ratio back toward 16:9, or give the frame more specified content to hold: name something for the left, the centre and the right, so each region has its own job.

### Can I add resolution by asking for 8k?

No. Resolution is a function of the tool's output size and any upscaling you apply; `8k` in a prompt is a caption term, and at best it nudges the model toward finely textured subject matter. Generate at the correct ratio, then upscale. Treating a resolution word as a quality setting is one of the most persistent myths in prompting.
