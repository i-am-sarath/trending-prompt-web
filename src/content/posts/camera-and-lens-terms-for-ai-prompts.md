---
title: "Camera and lens terms for AI prompts: the vocabulary that actually changes the image"
description: "Focal lengths, apertures, film stocks and camera angles explained for prompting — which terms models genuinely understand, and which ones do nothing."
date: 2026-07-20
category: "reference"
tags: ["photography", "lens", "focal length", "film stock", "reference"]
author: "The trendingprompt desk"
draft: false
---

Photographic vocabulary is the highest-value language you can learn for prompting, for one straightforward reason: image models were trained on enormous quantities of photographs whose captions and metadata included exactly these terms. "85mm f/1.4" is not a poetic flourish to a model. It is a phrase that reliably co-occurred with a particular look — compressed features, a blurred background, a certain working distance — across millions of examples.

That also means the vocabulary has limits. Terms that appeared often in captions work. Terms that photographers use in conversation but rarely type into metadata do much less. This guide separates the two.

## Focal length: the most useful number in prompting

Focal length changes perspective, not just how much fits in the frame. A wide lens used close to a subject stretches whatever is nearest the camera; a long lens compresses distance so the background appears to loom.

| Focal length | Look | Use for |
|---|---|---|
| 14–24mm | Strong perspective, curved edges, vast space | Interiors, landscapes, dramatic environment |
| 28–35mm | Mild wide, natural reportage feel | Street, documentary, environmental portraits |
| 50mm | Close to human vision, unremarkable in a good way | General purpose, honest scenes |
| 85mm | Flattering compression, blurred background | Portraits |
| 135mm | Strong compression, subject isolated | Tight portraits, detail |
| 200mm+ | Extreme compression, background looms enormous | Wildlife, distant subjects, telephoto looks |

The two most valuable entries are `35mm` and `85mm`, because they sit at opposite ends of a meaningful decision: do you want the viewer to feel present in the scene, or to be looking at a subject?

A 35mm portrait includes the room and implies the photographer is standing near the person. An 85mm portrait removes the room and implies distance and deliberation. Same subject, entirely different relationship. "A woman in a kitchen, 35mm" and "a woman in a kitchen, 85mm" produce two different photographs, and neither needs any other change.

Wide focal lengths are also the fastest way to fix a flat, pasted-on look. `24mm, low angle, close to the subject` forces a sense of three-dimensional space that no amount of "detailed" will produce.

## Aperture and depth of field

Aperture appears in prompts as an f-number, and models respond to it, though somewhat coarsely — they have learned "f/1.4 means very blurred background" more than they have learned the precise optics.

- **f/1.2 – f/2** — shallow depth of field, background dissolved. Portrait and product hero shots.
- **f/2.8 – f/4** — subject clearly separated, background readable. The everyday range.
- **f/8 – f/11** — most of the frame sharp. Landscapes, architecture, group shots.
- **f/16 – f/22** — everything sharp, sunstars on point lights.

Useful companion terms that models handle well: `shallow depth of field`, `deep focus`, `bokeh`, `background falloff`, `subject isolation`. `Creamy bokeh` and `swirly bokeh` both do something distinct — the second suggests older, character-heavy glass.

A caution: pairing a wide aperture with a wide lens is physically coherent but visually confusing to models, which have mostly seen `f/1.4` on portrait lenses. `24mm f/1.4` frequently produces the background blur of an 85mm, which may not be what you meant. If you want a wide view with deep focus, say `24mm, f/11, deep focus` and make the intent unambiguous.

## Camera angle and height

Angle is one of the cheapest ways to make an image feel authored rather than generated, and models respond well because these terms are common in captions.

- **Eye level** — neutral, documentary.
- **Low angle** — subject dominant, heroic, imposing.
- **High angle** — subject diminished, observed, vulnerable.
- **Overhead / top-down / flat lay** — reliable and popular for food and product.
- **Dutch angle** — tilted horizon, unease.
- **Worm's eye view** — extreme low, exaggerated verticals.
- **Over-the-shoulder** — establishes a viewer inside the scene.

Combine angle with focal length for compounding effect: `low angle, 24mm` is the classic heroic framing, while `high angle, 85mm` is intimate observation. Neither needs an adjective about mood.

## Film stocks and process

Naming a film stock imports a whole colour science: contrast curve, grain structure, how skin renders, what happens in the shadows. These names appeared constantly in photo captions, so models know them well.

- **Kodak Portra 400** — warm, forgiving skin tones, low contrast. The default choice for pleasant portraiture.
- **Kodak Gold 200** — nostalgic warmth, consumer-film look.
- **Fujifilm Velvia 50** — saturated, punchy greens and blues. Landscapes.
- **Ilford HP5** — black and white, visible grain, documentary.
- **Kodak Tri-X 400** — black and white, high contrast, photojournalism.
- **CineStill 800T** — tungsten-balanced, halation glow around highlights. The neon-at-night look.

`CineStill 800T` deserves special mention: the red halation bloom around bright light sources is distinctive, immediately recognisable, and almost impossible to describe in plain words. One stock name does the work of a paragraph.

Process terms also carry: `cross-processed`, `push-processed two stops`, `expired film`, `Polaroid SX-70`, `large format`, `medium format`. `Medium format` in particular is a shortcut to a certain smooth, detailed, slightly clinical high-end look that suits [product photography](/blog/product-photography-ai-prompts).

## Terms that pull their weight

These consistently change output:

`shallow depth of field`, `motion blur`, `long exposure`, `handheld`, `tripod`, `available light`, `natural light`, `direct flash`, `on-camera flash`, `film grain`, `halation`, `lens flare`, `vignetting`, `chromatic aberration`, `soft focus`, `tilt-shift`, `macro`, `telephoto compression`, `wide-angle distortion`, `candid`, `documentary`, `editorial`, `snapshot`.

`Direct flash` is quietly one of the most useful. It produces hard shadows, hot highlights and a specific party-photograph or fashion-editorial energy that is very hard to get any other way.

`Snapshot` and `candid` are the antidote to over-polished AI output. If your images look like advertising when you wanted them to look real, those two words plus a plain focal length do more than any negative prompt.

## Terms that do very little

Some photographic language is common in speech and rare in captions, so models handle it poorly:

- **Specific camera bodies.** `Canon EOS R5` mostly signals "professional photo" rather than any particular rendering. Harmless, but the focal length and film stock are doing the real work.
- **Shutter speeds as numbers.** `1/8000s` means little; `frozen motion` means a lot. Say the effect.
- **ISO values.** `ISO 3200` occasionally adds noise, unreliably. `visible grain, low light` is direct.
- **Exposure jargon.** `-0.7 EV` is meaningless to the model. `slightly underexposed, shadows crushed` works.
- **Lens brand names.** Rarely distinguishable in output.

The pattern: **describe the visible result, not the setting that would produce it**, unless the setting is a phrase that has been used as a caption thousands of times. Focal lengths and f-numbers pass that test; exposure compensation does not.

## Building a photographic prompt

Photographic clauses go in the technical slot, after the subject, environment and lighting are settled. A complete example:

```
A chipped enamel mug on a steel worktop, steam rising,
morning light from a window camera left, deep shadows on the right,
35mm, f/2.8, Kodak Portra 400, visible grain, handheld, candid
```

Every clause is a decision a photographer would have made. Note what is absent: no "masterpiece", no "8k", no "highly detailed". The photographic vocabulary is already specifying the quality of the rendering, so the quality words have nothing left to do.

## Photographic terms in non-photographic images

Camera vocabulary works on illustration too, and it is underused there. `Low angle, 24mm perspective` applied to a digital painting produces the dramatic converging verticals of a comic panel. `Shallow depth of field` applied to a 3D render gives that miniature, tilt-shift quality. `Telephoto compression` in an illustrated landscape stacks the mountains the way a long lens would.

You are not asking for a photograph; you are borrowing the geometry of one. That is often exactly what makes an illustration feel composed rather than arranged.

## Where this fits

Camera vocabulary is one of the six slots described in [how to write AI image prompts](/blog/how-to-write-ai-image-prompts), and it is the one that most reliably separates images that look designed from images that look generated. It pairs most closely with [lighting](/blog/lighting-terms-for-ai-prompts) — between them, those two slots decide most of what a viewer will call the "quality" of an image, long before anyone looks at the subject.

## Common questions

### Does naming a specific camera body do anything?

Very little. `Canon EOS R5` mostly signals "this is a professional photograph" rather than producing any particular rendering, because bodies are not visually distinguishable in the way lenses and film stocks are. It is harmless to include, but the focal length, aperture and film stock in the same prompt are doing all of the actual work. Spend the words on those instead.

### Why does my 24mm prompt still have a blurred background?

Because the model has mostly seen wide apertures attached to portrait lenses, so `f/1.4` pulls toward heavy background blur regardless of the focal length you paired it with. If you want a genuinely wide, deep-focus image, say so twice and unambiguously: `24mm, f/11, deep focus, sharp front to back`. Redundancy is cheap and it overrides the statistical association.

### Can I combine a film stock with a digital look?

You can, but it usually produces mush, because a stock name imports a whole colour science that contradicts "digital, clean, clinical". Pick one. If you want digital cleanliness, describe it directly — `clean digital capture, neutral colour, no grain` — and leave stock names out entirely. Two rendering models in one prompt is the same mistake as two media in one style clause.

### What single photographic term improves the most prompts?

`Candid`, or its close relative `snapshot`. Generated images default to a polished, advertising-adjacent look, and those two words push hard in the opposite direction — imperfect framing, unposed subjects, ordinary light. Combined with a plain 35mm and no quality adjectives, they are the fastest route to an image that reads as real rather than produced.
