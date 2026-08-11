---
title: "Product photography prompts: how to get images that look commissioned"
description: "Surface, light, shadow and lens choices that make AI product shots look like studio work, plus the failure modes that give them away and how to avoid them."
date: 2026-06-08
category: "guides"
tags: ["product photography", "commercial", "lighting", "studio"]
author: "The trendingprompt desk"
draft: false
---

Product photography is the most commercially useful thing image models do, and the easiest to get subtly wrong. The failures are rarely dramatic. The bottle looks fine; the shadow falls in a direction no light source in the picture could produce, the label wraps incorrectly around the curve, and the whole thing reads as fake without anyone being able to say why.

Getting it right is mostly a matter of specifying the set. A real product shoot is a small number of decisions — surface, background, light shape, light position, lens, and whether there is a reflection — and if you make those decisions in the prompt, the model has very little left to invent.

## Start with the surface

Amateur product prompts say "on a table". Professional ones name the material, because the surface determines the reflection, the shadow and half the mood.

- `on a raw plaster shelf` — matte, warm, architectural
- `on brushed stainless steel` — cool, directional streak reflections
- `on polished black acrylic` — a mirror reflection beneath the product
- `on unfinished oak, visible grain` — warm, domestic, craft
- `on travertine, soft pitting` — expensive, editorial
- `on rippled sand` — organic, cosmetics
- `on crumpled silk` — luxury, fashion adjacency
- `on a seamless paper sweep` — the neutral studio default

The reflective ones — acrylic, glass, polished stone — do the most work, because a correctly reflected product immediately looks photographed. They are also the ones models get wrong most often, so check the reflection matches the object rather than being a vague smear.

## Then the background

Decide whether the background is a surface, a void, or a room.

- `white seamless sweep, no visible horizon` — catalogue standard
- `soft gradient from mid-grey to near-black` — dramatic, e-commerce hero
- `blurred studio interior, out of focus lightstand visible` — behind-the-scenes authenticity
- `flat colour field, terracotta` — editorial, graphic
- `natural setting, blurred foliage at f/2.8` — lifestyle

The word `seamless` matters. Without it, models frequently draw a visible table edge or wall junction behind the product, which is exactly the thing a real sweep exists to avoid.

## Light: shape, position, quantity

This is where a product shot is won. Three things to state.

**The shape of the source.** `a large softbox`, `a strip light`, `a bare bulb`, `a ring light`, `a window`. Strip lights produce the long narrow highlight down the side of a bottle that says "commercial photography"; nothing else looks quite like it.

**Where it is.** `above and slightly behind the product`, `camera left at 45 degrees`, `directly overhead`. Backlighting through a translucent product — a bottle of oil, a glass of liquid — makes it glow, and is the single most effective technique for anything transparent.

**How many.** `single source` produces drama and deep shadow. `key light camera left, fill card camera right` produces a controlled, catalogue-safe result. Say `as the only light source` when you want real shadow, because models will otherwise add fill.

A reliable starting setup for most solid objects:

```
large softbox above and slightly behind, white bounce card in front,
soft gradient falloff on the background, gentle shadow toward the camera
```

## Shadow is the giveaway

The most common tell in AI product images is shadow that does not agree with light. If the highlight is on the left, the shadow must fall to the right, and its softness must match the source: a hard source gives a sharp-edged shadow, a large soft one gives a gradient.

Say it explicitly. `soft shadow falling to the right, edges gradually diffusing` is a clause with a verifiable outcome. Also useful: `contact shadow directly beneath the object`. A missing contact shadow is what makes a product look pasted onto a background rather than resting on a surface, and asking for one by name fixes it most of the time.

## Lens and framing

Product work lives in a narrow lens range for good reason.

- `100mm macro` — the classic product lens. Minimal distortion, close working distance.
- `50mm` — for sets where you need to see context.
- `24mm` — only when you want deliberate exaggeration; it distorts packaging badly.

Aperture: `f/8` to `f/11` for the object fully sharp, `f/2.8` for a hero shot with a soft background. Real product photography frequently uses focus stacking to keep everything sharp; `deep focus, sharp front to back` approximates it.

Height matters as much as focal length. `at product height, straight on` is the neutral e-commerce angle. `slightly above, 15 degrees` shows the top surface, which is what you want for anything with a lid or a label on the shoulder. `flat lay, directly overhead` is its own genre.

## Materials and how to describe them

Each material has terms that trigger the right rendering:

**Glass and liquid** — `refraction`, `caustics on the surface below`, `condensation beads`, `backlit, glowing`, `meniscus visible`.

**Metal** — `brushed`, `anodised`, `specular streak highlights`, `machined edges`, `patina in the recesses`.

**Ceramic and stone** — `unglazed`, `matte`, `subtle surface pitting`, `chalky`, `subsurface scattering at thin edges`.

**Fabric** — `visible weave`, `raking light across the texture`, `soft drape`, `linen slub`.

**Plastic** — `matte injection-moulded`, `slight parting line`, `soft-touch finish`.

**Food** — `steam rising`, `condensation`, `crumb detail`, `glistening surface`, `shot within seconds of plating`.

`Raking light across the texture` deserves a note: light that skims a surface at a very shallow angle reveals texture that frontal light hides. For fabric, paper, leather and anything woven, it is the difference between a flat rectangle and a material.

## Two complete examples

**Cosmetics, editorial:**

```
A frosted glass serum bottle standing on rippled sand,
a single strip light behind and above producing a long vertical
highlight down the bottle, hard shadow falling toward the camera,
warm sand and bone palette, 100mm macro, f/8, deep focus,
medium format, editorial product photography
```

**Homeware, catalogue:**

```
Three unglazed stoneware vessels on a raw plaster shelf,
single north-facing window as the only light source, long soft shadows,
subtle contact shadow under each base, muted clay and bone palette,
100mm, f/11, sharp front to back, seamless background
```

Both are on the [gallery](/) pattern: subject, surface, light, shadow, palette, technical. No adjectives about quality, because the specification is doing that work.

## The label problem

Text on packaging is the hardest part of AI product photography, and largely unsolved. Models produce plausible-looking gibberish, and even when letters are correct they usually fail to wrap convincingly around a curved surface.

Three practical approaches:

1. **Prompt for unbranded goods.** `unbranded packaging, blank label, no text` — then composite real artwork in a design tool. This is what commercial work does anyway, since the client's typography is not negotiable.
2. **Use a model that renders text better** for the hero shot. DALL·E handles short strings more reliably than the others, as covered in the [tool comparison](/blog/midjourney-vs-dalle-vs-stable-diffusion).
3. **Frame the label away from the camera** — turn the product so the branded face is at an oblique angle, or crop it out.

Option 1 is the professional answer. Generate the light, the surface and the shadow — the expensive parts of a real shoot — and add the artwork yourself.

## Failure modes to check before you ship

Go through this list on every image:

- **Shadow direction** agrees with the highlight position.
- **Contact shadow** exists where the object meets the surface.
- **Reflections** in glossy surfaces match the object's actual shape.
- **Symmetry** — handles, caps and lids are the same on both sides.
- **Ellipses** — the top of a cylinder is a consistent ellipse, not a wobble.
- **Liquid level** is horizontal and the meniscus behaves.
- **Threads and seams** on caps line up.
- **Scale** — the object is the size its context implies.

Cylinder tops and liquid levels are worth training your eye on. They are geometry problems, and models get geometry subtly wrong in ways that most viewers register as "off" without identifying.

## Where AI product images are appropriate

Worth stating plainly. Generated imagery is well suited to concepting, mood boards, packaging mock-ups, background plates, and marketing for products that do not exist yet.

It is not suited to depicting a real product you are selling. If the image shows a customer what they will receive, it should be a photograph of the thing they will receive — that is a consumer-protection question as much as an aesthetic one, and advertising standards in most markets take a dim view of an idealised render presented as the product. Use generation to plan the shoot, not to replace it.

## Common questions

### Why do my product shots look like the object is floating?

Almost always a missing contact shadow — the small, dark, tight shadow where an object meets the surface it rests on. Models frequently render a general soft shadow nearby without that contact point, and the eye reads the result as a cut-out pasted onto a background. Asking for it by name, `subtle contact shadow directly beneath the base`, fixes it most of the time.

### Can I use generated images to sell a real product?

Not as a depiction of the product itself. If the image shows a customer what they will receive, it should be a photograph of the actual item — that is a consumer-protection question, and advertising standards bodies in most markets take a dim view of idealised renders presented as the real thing. Generated imagery is well suited to concepting, packaging mock-ups, background plates and marketing for products that do not exist yet.

### How do I get readable branding on packaging?

Generally you do not, and you should stop trying. Prompt for `unbranded packaging, blank label, no text`, then composite real artwork in a design tool. This is what commercial work does anyway, because a client's typography is not negotiable and a model cannot set type. Generate the light, the surface and the shadow — the expensive parts of a real shoot — and add the label yourself.

### What is the fastest single upgrade to a product prompt?

Name the surface. "On a table" tells the model nothing; `on polished black acrylic`, `on raw plaster`, `on brushed stainless steel` each determine the reflection, the shadow quality and the mood in one clause. Reflective surfaces do the most work, because a correctly reflected product immediately reads as photographed rather than rendered.
