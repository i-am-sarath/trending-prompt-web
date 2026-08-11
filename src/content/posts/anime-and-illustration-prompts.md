---
title: "Anime and illustration prompts: getting a specific look instead of generic anime"
description: "Why anime prompts collapse into one house style, the vocabulary that separates cel animation from manga from light-novel art, and how Niji and anime checkpoints differ."
date: 2026-05-25
category: "guides"
tags: ["anime", "illustration", "niji", "manga", "style"]
author: "The trendingprompt desk"
draft: false
---

Type "anime girl" into any model and you get the same picture everyone else gets: large eyes, soft gradient shading, pastel hair, a blurred cherry-blossom background. It is competent and completely generic, because "anime" is not a style — it is a national industry spanning eighty years, dozens of studios and radically different visual traditions.

Getting something specific means naming which tradition you mean, in terms of production technique rather than vibe.

## Use the right model first

Before prompt wording, pick the right engine. This matters more here than in any other genre.

**Midjourney's Niji model**, invoked with `--niji`, is trained for anime and illustration. It is not a style flag on the general model — line quality, colour, composition and anatomy all differ. If you are working in anime idioms and not using Niji, you are fighting the tool.

**Stable Diffusion anime checkpoints** are the other serious option, and there are many, each with a distinct house style. The community ecosystem here is enormous, and a well-chosen checkpoint plus a style LoRA gives more precise control over the look than any prompt wording can.

**DALL·E 3** produces a soft, western-inflected illustration style and resists strong anime idioms. It is good at complex scene descriptions in an illustrated register, less good at looking authentically like anime.

## Name the production technique

This is the highest-leverage change you can make. Anime looks different depending on how it was physically made, and those production terms are specific enough for a model to act on.

- `1980s cel animation, hand-painted backgrounds, visible cel texture` — warm, slightly grainy, painterly backgrounds behind flatter characters
- `1990s OVA, dense linework, muted palette, film grain` — the darker, more detailed direct-to-video look
- `modern digital anime, clean vector-like lines, flat cel shading` — contemporary TV production
- `manga panel, black and white, screentone shading, speed lines` — printed manga, not animation
- `light novel illustration, soft airbrush rendering, high saturation` — glossy, painterly, character-focused
- `sakuga cut, dynamic perspective, smeared motion frames` — the high-effort animation moment
- `watercolour anime background, no characters, Studio-style scenery` — the environment tradition
- `chibi, super-deformed, two-head-tall proportions` — comedic proportion

`1980s cel animation` versus `modern digital anime` produces two genuinely different images from the same subject. That single clause does more than any number of adjectives about mood.

## Line and shading vocabulary

Anime styles are largely defined by how lines and shadows behave, and these terms translate reliably:

**Line:**
- `bold uniform line weight` — graphic, poster-like
- `tapered brush lines, varying weight` — hand-drawn energy
- `fine delicate linework` — shoujo and light novel
- `rough sketch lines left visible` — genga, animation drawing
- `no outlines, painted edges` — painterly, modern film

**Shading:**
- `flat cel shading, two tones` — classic anime
- `three-tone cel shading with a rim light` — polished modern TV
- `soft airbrush gradient shading` — light novel, glossy
- `screentone dots for shadow` — printed manga
- `hard shadow with a coloured shadow tone, not grey` — the shadow colour choice is a strong style signal

`Flat cel shading, two tones` is the single clause that most reliably makes an image read as animation rather than as a generic digital painting.

## Palette

Colour is a period marker. Naming it prevents the pastel default:

- `limited palette, muted earth tones` — 1990s film
- `high-saturation candy palette` — modern idol and magical girl
- `desaturated with one accent colour` — thriller, seinen
- `warm sunset palette, orange and violet` — the nostalgic Japanese summer look
- `cool blue night palette with warm practical lights` — urban night scenes
- `sepia and cream, aged paper` — retro manga reprint

## Composition and camera

Anime has its own compositional grammar, and naming it produces images that read as frames from something rather than as portraits.

- `low angle looking up, dramatic perspective`
- `extreme close-up on the eyes, rest of the face cropped`
- `wide establishing shot, character small in a large environment`
- `over-the-shoulder, foreground character out of focus`
- `dutch angle, tension`
- `speed lines radiating from the subject`
- `impact frame, high contrast, motion blur`
- `split panel composition, two moments in one frame`

`Wide establishing shot, character small in a large environment` is the environmental tradition — the quiet frames of empty classrooms, train platforms and summer skies that a lot of people actually mean when they say they want an anime look. It has nothing to do with character design at all.

## Complete examples

**1990s OVA still:**

```
A pilot leaning against a hangar door, cigarette, exhausted,
1990s OVA cel animation, dense linework, muted palette,
flat cel shading with coloured shadow tone, hand-painted background,
film grain, low angle, --niji
```

**Manga panel:**

```
Two students facing each other on a rooftop, wind in the uniforms,
manga panel, black and white, screentone shading, speed lines,
bold tapered inking, high contrast, dramatic diagonal composition
```

**Environmental, no character:**

```
An empty classroom in late afternoon, chairs on desks,
watercolour anime background painting, no characters,
warm sunset light through the windows, dust in the air,
soft painted edges, muted warm palette
```

Each names a production technique, a shading model and a palette. None of them says "anime style, beautiful, masterpiece."

## Non-anime illustration

The same principle applies across illustration generally — name the medium and the tradition:

- `mid-century children's book illustration, textured shapes, limited palette`
- `bande dessinée, ligne claire, flat colour, uniform line` — the Franco-Belgian tradition
- `American comic book, ben-day dots, heavy inks, four-colour printing`
- `editorial illustration, flat shapes, conceptual, magazine`
- `scientific botanical plate, fine hatching, hand-lettered labels`
- `woodcut print, high contrast, visible chisel marks`
- `risograph, two-colour, misregistration, paper grain`
- `storybook gouache, textured paper, soft edges`

`Ligne claire` is a good example of how much a single term can carry: uniform line weight, flat colour, no hatching, clear composition, everything in focus. Four words of French do the work of a paragraph. There are more of these in the [style prompt list](/blog/ai-art-style-prompts-list).

## Anatomy and hands

Illustration models have the same anatomical problems as photographic ones, sometimes worse because stylised proportion gives them more latitude to be wrong.

The practical mitigations are the same as for [portraits](/blog/portrait-prompts-hands-eyes-skin): give hands a job, keep them simple, or crop them. In anime specifically, `hands in pockets`, `arms crossed`, `holding a bag strap` and `hands behind the back` all read as natural character poses while removing the hardest geometry from the frame.

For stylised proportion, state it numerically: `seven-head-tall proportions` for realistic adult figures, `five-head-tall` for a younger or more stylised look, `two-head-tall` for chibi. Models respond to this, and it prevents the drift toward generic proportion.

## Consistency across a series

If you are producing a set — a comic, a character sheet, a series of cards — style consistency matters more than any individual image. Fix the style with a reference rather than words: `--sref` with a fixed value in Niji, or a single checkpoint plus LoRA in Stable Diffusion, held constant across the whole set.

Character consistency is a separate and harder problem, covered in [keeping a character consistent](/blog/consistent-characters-across-ai-images). The short version for illustration: give the character one or two unusual, renderable identifiers — an eyepatch, a distinctive hair streak, a particular jacket — and repeat them verbatim in every prompt.

## On style and the people who made it

Anime styles are studio work, and individual illustrators have distinctive looks that are also their livelihood. Naming production eras, techniques and traditions gets you the visual result without leaning on a specific living artist's name — and, as everywhere in prompting, the technique description is the more controllable instruction anyway. "Flat two-tone cel shading, muted palette, dense linework" is something you can tune. A name is not.

## Common questions

### Why does everything I generate look like the same anime style?

Because "anime" with no further qualification resolves to the mean of an enormous and varied training set, and that mean is contemporary digital TV production. The fix is to name a production technique — `1980s cel animation, hand-painted backgrounds`, `manga panel, screentone shading`, `light novel illustration, soft airbrush rendering` — rather than the genre. One production clause changes the image more than five adjectives about mood.

### Should I use Niji or a Stable Diffusion anime checkpoint?

Niji is faster to good results and needs no setup, which suits one-off images and exploration. A Stable Diffusion anime checkpoint plus a style LoRA gives far more control over the specific house style, and is reproducible seed-for-seed, which matters when you are producing a series. If you are making a single striking image, use Niji. If you are making forty panels that must match, use Stable Diffusion.

### How do I get an anime background without a character in it?

Ask for it explicitly and remove the character vocabulary entirely: `watercolour anime background painting, no characters, empty classroom, late afternoon light, dust in the air`. The environmental tradition — quiet frames of train platforms, classrooms and summer skies — is a distinct discipline within anime production, and prompting for it as scenery rather than as a setting for someone works far better.

### Do proportions need to be specified?

They help considerably. Stylised art gives the model latitude to be inconsistent, and stating proportion numerically anchors it: `seven-head-tall proportions` for realistic adults, `five-head-tall` for a younger or more stylised look, `two-head-tall` for chibi. Without it, figures drift between panels in a way that reads as sloppy even when each individual image looks fine.
