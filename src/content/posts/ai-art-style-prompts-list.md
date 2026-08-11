---
title: "AI art style prompts: a working list of styles that reliably render"
description: "Photographic, illustrative, painterly, graphic and 3D styles that image models actually recognise, with the phrasing that gets each one — and how to combine them without producing mush."
date: 2026-06-15
category: "reference"
tags: ["art styles", "reference", "illustration", "aesthetics"]
author: "The trendingprompt desk"
draft: false
---

Style is the slot where prompts most often go vague. "Artistic", "stylised" and "unique" contain no information; the model resolves them to its default, which is the opposite of unique. Naming a real medium, movement or process gets you a specific look, because those names appeared in captions attached to images that actually had that look.

This is a working list, organised by family, of style language that renders reliably. Each entry is phrased the way it should appear in a prompt.

## How to use style language

Three rules before the list.

**One style family per prompt.** `art nouveau, brutalist, watercolour, cyberpunk` averages into mud. Pick one lead and, at most, one modifier.

**Name the medium, not the vibe.** `gouache on cold-press paper` beats `painterly`. The medium implies edge quality, texture, colour behaviour and mark-making all at once.

**Put style after subject and before technical.** Style clauses work as modifiers of an established subject, per the structure in [how to write AI image prompts](/blog/how-to-write-ai-image-prompts).

## Photographic

- `35mm film photograph, visible grain`
- `medium format editorial photograph`
- `documentary photograph, available light, candid`
- `street photography, high contrast black and white`
- `fashion editorial, studio strobe, seamless backdrop`
- `product photography, softbox, white sweep`
- `architectural photography, tilt-shift, corrected verticals`
- `photojournalism, Tri-X 400, grainy`
- `daguerreotype, silver plate, slight tarnish`
- `tintype portrait, shallow depth of field, period costume`
- `cyanotype, prussian blue, paper texture`
- `Polaroid SX-70, soft focus, faded colour`
- `long exposure, light trails, tripod`
- `infrared photography, white foliage, dark sky`

Historic photographic processes — daguerreotype, tintype, cyanotype — are underrated. They carry strong, distinctive, immediately readable looks that nothing else produces, and they are far less used than "cinematic."

## Painting and drawing

- `oil on canvas, visible brushwork, impasto`
- `alla prima oil sketch, wet-into-wet`
- `watercolour on cold-press paper, blooms and granulation`
- `gouache, flat opaque colour, matte`
- `egg tempera, fine hatching, muted palette`
- `charcoal on toned paper, smudged, white chalk highlights`
- `graphite pencil study, cross-hatching`
- `ink wash, sumi-e, economical strokes`
- `pen and ink, stipple shading`
- `pastel on sanded paper, soft edges`
- `fresco, chalky pigment, plaster texture`
- `acrylic, hard edges, flat colour fields`

`Impasto`, `granulation` and `stipple` are the sort of technical terms that carry real visual consequences. They describe the physical behaviour of a material, which is exactly what makes an image read as made rather than rendered.

## Movements and periods

- `art nouveau, whiplash curves, botanical ornament`
- `art deco, symmetry, geometric inlay, gold and black`
- `bauhaus, primary colours, geometric abstraction`
- `de stijl, orthogonal composition, primary blocks`
- `constructivist poster, diagonal composition, red and black`
- `swiss international style, grid, helvetica, generous whitespace`
- `ukiyo-e woodblock print, flat colour, key line`
- `baroque, tenebrism, dramatic diagonal`
- `impressionist, broken colour, visible strokes, outdoor light`
- `surrealist, impossible juxtaposition, dreamlike scale`
- `brutalist, raw concrete, monumental mass`
- `memphis design, 1980s, clashing pastels, squiggles and terrazzo`
- `soviet propaganda poster, limited palette, heroic angle`
- `psychedelic poster, 1967, warped lettering, vibrating colour`

Movement names work well because they are strongly represented in captioned art collections. They also bring composition with them, not just surface: `constructivist` changes the layout of your image, not merely its colours.

## Illustration and graphic

- `flat vector illustration, limited palette, no gradients`
- `line art, uniform weight, no shading`
- `risograph print, two-colour, misregistration, grain`
- `screen print, halftone dots, limited inks`
- `letterpress, deep impression, cotton paper`
- `mid-century children's book illustration, textured shapes`
- `technical illustration, exploded view, callout lines`
- `blueprint, white lines on cyan`
- `botanical plate, scientific illustration, hand-lettered label`
- `woodcut, high contrast, chisel marks`
- `linocut, bold reduction, visible carving`
- `comic book panel, ben-day dots, heavy inks`
- `bande dessinée, ligne claire, flat colour`
- `manga panel, screentone, speed lines`

`Risograph` is one of the most reliably charming style terms available: two-colour separation, slight misregistration and paper grain produce something warm and hand-made that looks nothing like default AI output.

## 3D and digital

- `clay render, matte grey, ambient occlusion`
- `stop-motion still, felt and wire puppet, visible seams`
- `claymation, fingerprints in the clay, tiny set`
- `low-poly, flat shaded, limited palette`
- `voxel art, isometric, tiny world`
- `isometric diorama, miniature, tilt-shift`
- `subsurface-scattered wax figure, translucent`
- `product visualisation, studio HDRI, physically based rendering`
- `retro CGI, 1997, low resolution textures, hard edges`
- `wireframe render, glowing edges, black background`

`Stop-motion still` and `claymation` are especially good at producing images that feel physically constructed. Adding evidence of the hand — `visible seams`, `fingerprints in the clay`, `dust on the set` — sells it completely.

## Genre and world

These are worlds rather than media, and they work best combined with a medium from the lists above.

- `cyberpunk, neon signage, rain, dense vertical city`
- `solarpunk, plants integrated into architecture, warm daylight`
- `dieselpunk, riveted metal, 1940s industry`
- `cottagecore, soft daylight, handmade textiles`
- `dark academia, oak, brass, low lamplight`
- `space opera, vast scale, hard shadows in vacuum`
- `folk horror, overcast, rural, wrong proportions`
- `post-apocalyptic, overgrowth reclaiming concrete`
- `weird west, dust, iron, unfamiliar geometry`
- `biopunk, organic machinery, wet surfaces`

There are working examples of several of these in the [sci-fi category](/category/sci-fi) of the gallery.

## Combining styles without mush

Two styles can work together when they operate on different axes. A medium plus a world is safe: `ukiyo-e woodblock print` plus `cyberpunk city` is coherent, because one describes how it is made and the other what it shows.

Two media fight: `watercolour, 3d render` produces neither. Two movements fight: `art deco, brutalist` averages to generic geometry.

The test: if both terms answer the same question, cut one.

A useful pattern for something genuinely unusual is **historical medium plus contemporary subject**, or the reverse:

```
a data centre interior, botanical plate, scientific illustration,
hand-lettered labels, aged paper
```

```
a Victorian séance, shot on CineStill 800T, direct flash, snapshot
```

Both work because the tension is deliberate and the two clauses are not competing for the same slot.

## Style references instead of style words

When you cannot describe a look in words — and many looks resist description — use a style reference image instead. Midjourney's `--sref` takes an image URL and applies its palette and rendering without copying its content; `--sref random` produces a random style seed you can then reuse across a set. Stable Diffusion achieves the same with style LoRAs and IP-Adapter.

This is usually the right approach for maintaining one look across a series, since it is far more consistent than hoping the same style words land the same way twenty times. The [parameters guide](/blog/midjourney-parameters-guide) covers `--sref` and `--sw` in more detail.

## On naming living artists

Prompting "in the style of [living artist]" is common and worth thinking about. Legally the position is unsettled and varies by jurisdiction; ethically, an individual working artist's name is not a free style preset, and their distinctive look is often the thing they earn a living from.

The practical point is that it is usually unnecessary. Most of what people want from an artist's name is a combination of medium, palette, edge quality and subject matter — all of which can be described directly, and described more controllably. "Muted ochre and slate palette, thick impasto, figures cropped at the edge of frame, flat overcast light" is more useful to a model than a name, and it belongs to you.

Movements, eras, materials and processes are fair game and, for the reasons above, generally more precise.

## Common questions

### Why does adding two style terms produce something that looks like neither?

Because the model averages competing instructions rather than layering them. Two terms that answer the same question — two media, two movements, two rendering techniques — resolve to the midpoint, which is usually a bland compromise. Two terms answering different questions, such as a medium plus a world, layer cleanly. The test is simple: if both words could complete the sentence "this image is a ___", cut one.

### How specific should a style term be?

Specific enough to name a physical process. `Painting` is too broad to mean anything. `Oil painting` is usable. `Alla prima oil sketch, wet-into-wet, visible brush loading` is precise, and produces a consistent result because it describes how the paint physically behaves. Precision in the medium buys you freedom everywhere else in the prompt.

### Do style terms work the same in every model?

Broadly yes for movements and media, because those names are well represented in captions across all the major training sets. Where they diverge is in default interpretation: Midjourney applies its own aesthetic on top of whatever you name, so `flat vector` still arrives slightly glossy unless you add `--style raw` and lower `--stylize`. Stable Diffusion is more literal, and DALL·E leans illustrative.

### What if the style I want has no name?

Use a reference image rather than words. Midjourney's `--sref` transfers palette and rendering without content, and `--sref random` will hand you a style seed you can reuse across a whole series. Many genuinely distinctive looks are combinations no single term describes, and hunting for the right words is slower than pointing at an example.
