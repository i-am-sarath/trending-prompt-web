---
title: "Lighting terms for AI prompts: the slot that decides the mood"
description: "Golden hour, Rembrandt, rim light, softbox, practicals and chiaroscuro — a working vocabulary of lighting terms models understand, and how to combine them."
date: 2026-07-13
category: "reference"
tags: ["lighting", "photography", "mood", "reference"]
author: "The trendingprompt desk"
draft: false
---

Ask two people to photograph the same face and the difference between their pictures will mostly be light. Not composition, not lens, not the subject's expression — light. It sets the mood, decides which parts of the form you read as shape, and determines whether the result looks like a snapshot, a portrait or a crime scene.

In prompting, lighting is the slot most often left empty. When it is empty, the model picks for you, and its default is soft, even, frontal illumination — the visual equivalent of a shrug. Filling this slot is the fastest available upgrade to almost any prompt.

## Direction first

Before naming a lighting style, decide where the light comes from. Direction does more than quality.

- **Front light** — flat, even, minimal shadow. Honest and dull. Good for catalogue work, bad for drama.
- **Side light** — reveals texture and form. The workhorse of portraiture and still life.
- **Backlight** — subject rimmed in light, face in shadow. Silhouettes, atmosphere, hair glow.
- **Top light** — shadows under the brow and nose. Institutional, unflattering, occasionally sinister.
- **Under light** — shadows thrown upward. Campfire, monitor glow, horror.
- **Three-quarter** — the classic portrait position, between front and side.

Say it plainly in the prompt: `light from camera left`, `lit from behind`, `single overhead source`. Models handle these well because they are common caption phrases, and one direction clause changes an image more than five adjectives.

## Quality: hard versus soft

The second decision is the character of the light, which comes down to the size of the source relative to the subject.

**Hard light** comes from a small or distant source: midday sun, a bare bulb, direct flash. It produces sharp-edged shadows, high contrast, and visible texture. It is unforgiving on skin and superb on architecture, still life and anything you want to look severe.

Prompt terms: `hard light`, `direct midday sun`, `harsh shadows`, `bare bulb`, `direct flash`, `high contrast lighting`.

**Soft light** comes from a large or diffused source: an overcast sky, a north-facing window, a softbox. Shadows have gradual edges, contrast is low, skin looks smooth.

Prompt terms: `soft light`, `diffused light`, `overcast`, `north-facing window`, `softbox`, `bounced light`, `open shade`.

Most disappointing AI portraits are disappointing because they are lit with generic soft frontal light. Switching to `hard side light, deep shadows` on the same prompt often produces something that looks intentional for the first time.

## Time of day and colour temperature

Natural light varies enormously by hour, and the vocabulary is precise:

- **Blue hour** — before sunrise or after sunset. Cool, even, low contrast. Excellent for cityscapes, where artificial lights balance the sky.
- **Golden hour** — the hour after sunrise or before sunset. Warm, low, long shadows. Beautiful and thoroughly overused.
- **Midday** — high, hard, short shadows. Difficult and therefore distinctive when handled deliberately.
- **Overcast** — a giant softbox. Even, cool, flattering, slightly melancholy.
- **Night, available light** — mixed sources, colour casts, deep blacks.

Colour temperature can be stated directly, and mixing temperatures is one of the most effective tricks available: `cool blue window light on the left, warm tungsten lamp on the right` gives a picture two colours to work with and immediately reads as photographed rather than rendered. Real interiors almost always contain mixed sources; images with a single uniform colour temperature look artificial for exactly that reason.

## Named portrait setups

Studio lighting patterns have names, and models know them because they appear constantly in photography captions and tutorials.

- **Rembrandt lighting** — key light at roughly 45 degrees and above; a small triangle of light on the shadowed cheek. Classic, painterly, slightly serious.
- **Butterfly (Paramount) lighting** — light directly in front and above; a small shadow under the nose. Glamour, beauty work.
- **Split lighting** — light from exactly 90 degrees; half the face lit, half in shadow. Dramatic, confrontational.
- **Loop lighting** — a small loop shadow from the nose; the most common flattering setup.
- **Rim / edge light** — a light behind the subject picking out the outline. Separates subject from background.
- **Clamshell** — a source above and a reflector below. Even, flattering, commercial beauty.

`Rembrandt lighting, single source camera left, deep shadow side` is a complete, precise instruction in seven words, and it produces the same recognisable result across models.

## Cinematic and painterly terms

- **Chiaroscuro** — extreme light-dark contrast, Renaissance painting. Strong shapes carved out of blackness.
- **Tenebrism** — chiaroscuro taken further; most of the frame is dark.
- **Low key** — predominantly dark tones, small bright areas. Noir, thriller.
- **High key** — predominantly bright tones, minimal shadow. Clean, optimistic, commercial.
- **Volumetric light / god rays** — visible beams through atmosphere. Requires haze, dust or fog to justify it.
- **Practical lights** — sources visible inside the frame: lamps, neon, screens, candles.

`Practical lights` is worth adopting as a habit. Putting a visible light source in frame — a desk lamp, a shop sign, a phone screen — gives the model a reason for the illumination, and images with justified light look far more coherent than images that are simply bright.

## Atmosphere makes light visible

Light itself is invisible; you only see it when it hits something. Adding a medium for it to travel through is what produces the beams, glows and depth that people describe as "cinematic."

Useful terms: `haze`, `fog`, `mist`, `smoke`, `dust motes in the air`, `humid air`, `rain`, `steam`, `atmospheric perspective`.

Pair the atmosphere with a direction and you get a specific effect rather than a general mood: `backlit through fog` produces silhouettes and glowing edges; `low sun through dusty air` produces visible shafts; `overcast with mist in the valley` produces flattened, receding depth layers.

## Light on materials

Some of the most useful lighting language describes how light interacts with a surface:

- **Specular highlights** — sharp bright reflections on glossy surfaces.
- **Subsurface scattering** — light penetrating a translucent material: skin, wax, leaves, marble.
- **Caustics** — focused light patterns through glass or water.
- **Falloff** — how quickly light dims with distance. `Rapid falloff into darkness` is dramatic.
- **Bounce light** — light reflecting off a nearby surface into the shadows, often coloured by it.

`Subsurface scattering` on skin, `specular highlights` on ceramic, `caustics` under a glass — these are the terms that make [product photography](/blog/product-photography-ai-prompts) look expensive.

## Combining the slots

A complete lighting clause usually contains direction, quality and a source. Three examples at increasing specificity:

```
soft window light
```
Fine. Better than nothing.

```
soft light from a large window camera left, gentle falloff to the right
```
Now the model knows where the shadows go.

```
single north-facing window camera left as the only source,
soft light, rapid falloff, deep shadow on the right side of the face,
warm bounce from a wooden floor filling the shadow slightly
```
Now you have described a real lighting setup, and the result will look like one.

Note the phrase `as the only source`. Models like to add fill light. Explicitly saying there is one source is often necessary to get genuine shadow.

## Terms that underperform

- **"Cinematic lighting"** — vague. Usually just adds contrast and a teal-orange cast. Name the actual setup.
- **"Dramatic lighting"** — an opinion, not an instruction. Say `hard side light, deep shadows`.
- **"Perfect lighting"** — meaningless.
- **"Studio lighting"** — better than nothing, but `softbox camera left, reflector camera right, grey seamless backdrop` is a real set.
- **"Ambient occlusion"** — a rendering technique, not a lighting choice; it does little in image prompts.

The pattern matches [camera vocabulary](/blog/camera-and-lens-terms-for-ai-prompts): terms that describe a visible, nameable configuration work; terms that describe your feeling about the result do not.

## A short lighting checklist

Before you generate, answer four questions in the prompt:

1. **Where is the light coming from?**
2. **Is it hard or soft?**
3. **Is there one source or several, and what colour are they?**
4. **Is there anything in the air for the light to reveal?**

Four clauses. In most cases they will improve an image more than doubling the length of the subject description. If you look at the entries in the [gallery](/), you will notice the lighting clause is almost always present, and almost always answers those four questions — that is not a coincidence, it is the reason those prompts reproduce.

## Common questions

### Why do my images always look flatly lit even when I ask for drama?

Almost always because the model has added fill light you did not ask for. Training data is full of well-lit, low-contrast imagery, so the default behaviour is to illuminate everything. The fix is one phrase: `as the only light source`. Stating explicitly that there is a single source, and naming where it is, is usually enough to recover real shadow.

### What is the difference between hard and soft light in practice?

Source size relative to the subject, and it determines shadow edges. A small or distant source — bare bulb, direct flash, midday sun — gives sharp-edged shadows and high contrast. A large or diffused source — softbox, overcast sky, north window — gives gradual shadow edges and low contrast. Everything else people describe as lighting mood follows from that one property.

### Should I mix colour temperatures?

Usually yes, if you want the image to look photographed. Real interiors almost always contain more than one kind of light — daylight through a window plus a tungsten lamp, or a screen glow against a ceiling fixture — and images with a single uniform colour temperature read as rendered. `Cool blue window light on the left, warm practical lamp on the right` gives the picture two colours to work with.

### Does "cinematic lighting" do anything?

Not much, and not reliably. It tends to add contrast and a teal-orange cast, which is a stylistic cliché rather than a lighting setup. Name the actual configuration instead — direction, quality, source, atmosphere — and you will get the effect people are reaching for when they type "cinematic", with the added benefit of being able to change one part of it.
