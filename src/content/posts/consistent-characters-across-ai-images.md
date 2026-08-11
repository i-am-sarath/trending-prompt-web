---
title: "Keeping a character consistent across AI images"
description: "Seeds, character references, LoRAs and the description-lock method — what each approach can realistically deliver when you need the same face in twenty different scenes."
date: 2026-06-29
category: "workflow"
tags: ["character consistency", "workflow", "midjourney", "stable diffusion", "lora"]
author: "The trendingprompt desk"
draft: false
---

Generating one striking image is easy. Generating the same person in twenty different situations is the problem that stops most AI projects — storyboards, comics, brand mascots, book illustration, anything with a narrative — from getting past the first frame.

There is no button for this. There are four approaches with different costs and different ceilings, and choosing well depends on how many images you need and how strict "the same" has to be.

Set expectations first: with the exception of training your own model, none of these produce identity. They produce a strong family resemblance that survives casual inspection. For a comic panel where the character is 300 pixels tall, that is plenty. For a close-up on the same face in consecutive frames, viewers will notice drift.

## Method 1: description lock

The cheapest approach, and the one people skip because it sounds too simple: write an extremely specific character description and reuse it verbatim in every prompt.

The trick is specificity in features that models actually render distinctly:

```
a woman in her early thirties, sharp jaw, wide-set grey eyes,
a small scar through the left eyebrow, black hair cut blunt at the chin,
a gap between the front teeth
```

Note what is doing the work. "Beautiful woman with long hair" describes a distribution; "a small scar through the left eyebrow" and "a gap between the front teeth" are specific, unusual, renderable features that anchor the identity. One or two distinguishing marks are worth more than five generic adjectives.

Add invariant clothing and it gets stronger still. Cartoon characters wear the same outfit for a reason — it carries recognition when the face wavers. A red scarf, round glasses, a particular jacket: these survive across scenes far more reliably than facial geometry.

**Ceiling:** recognisably the same *type* of person, with the same marks and clothes. Faces will drift between images. Adequate for mid- and long-shots, not for close-ups.

**Cost:** nothing. Always do this, regardless of which other method you add on top.

## Method 2: seed locking

Fix the seed and the same prompt reproduces the same image. Change one clause and much of the composition — and often much of the face — persists.

```
[character description], standing in a kitchen --seed 4821
[character description], walking through rain --seed 4821
```

This works better than it has any right to for small changes, and degrades quickly for large ones. Changing the environment while keeping the seed usually preserves a good deal of the face. Changing the shot type from mid to close-up usually does not.

Seed locking is most useful for generating variations of a single scene — trying five lighting setups on the same character and pose — rather than for a sequence of different scenes. Details in [seeds, variations and reproducibility](/blog/seeds-variations-and-reproducibility).

**Ceiling:** strong within a scene, weak across scenes.

**Cost:** nothing, but it constrains what else you can change.

## Method 3: character reference

Midjourney's `--cref` takes an image URL and carries the character from it into a new generation. `--cw` sets how much is carried, from 0 to 100.

```
[new scene description] --cref https://example.com/hero.png --cw 0
```

The `--cw` value is the part people get wrong. At 100, Midjourney references face, hair *and* clothing — useful if the outfit should persist, useless if you want the character in different clothes. At 0, it references the face only, which is normally what a sequence needs. Start at `--cw 0` and raise it only if the face is drifting.

Stable Diffusion has an equivalent family of tools — IP-Adapter and its face-specialised variants — which condition generation on a reference image. These are more configurable than `--cref` and can be combined with ControlNet to fix the pose at the same time, which is the closest thing to directing an actor that the current tools offer.

Practical notes that make a large difference:

- **Use a clean, well-lit, front-facing reference.** A dramatic reference image bleeds its lighting and mood into everything downstream.
- **Reference an image the model made**, not a photograph, where possible. Model-generated faces sit in a region of the space the model can reproduce; real faces frequently do not.
- **Regenerate your reference until it is genuinely good.** Everything inherits from it, so an hour spent on the reference saves a day later.

**Ceiling:** good resemblance across varied scenes. Still not identity — expect the age to wander a couple of years and the face shape to soften in profile.

**Cost:** low. This is the default answer for most projects.

## Method 4: train a model

Training a LoRA — a small adapter on top of a base model — on 15 to 30 images of your character produces by far the strongest consistency available. This is how studios do it.

The outline:

1. Assemble 15–30 images of the character: varied angles, expressions and lighting, consistent identity.
2. Caption them consistently, using a unique trigger token such as `sks_marla`.
3. Train the LoRA (a consumer GPU or a rented one is sufficient; training takes tens of minutes).
4. Prompt with the trigger token and the LoRA loaded.

The bootstrap problem is that you need 15–30 consistent images before you can train the thing that produces consistent images. The standard solution is to generate them with `--cref` or IP-Adapter, cull hard to the ones that agree with each other, and train on that curated set. Consistency in the training data matters more than volume: 15 images that are genuinely the same person beat 40 that are approximately similar.

**Ceiling:** the same character across any pose, angle, style and lighting. Genuinely reliable.

**Cost:** a few hours of setup, some compute, and a technical stack. Worth it above roughly fifty images of one character; overkill below that.

## Choosing

| Images needed | Approach |
|---|---|
| Under 10, loose consistency | Description lock alone |
| Variations of one scene | Description lock + fixed seed |
| 10–50 across varied scenes | Description lock + `--cref` / IP-Adapter |
| 50+, or close-ups, or a commercial series | Train a LoRA |

Description lock is in every row. It is not an alternative to the others; it is the foundation they all build on, and a character reference applied to a vague description drifts far faster than one applied to a precise description.

## Consistency in things other than faces

The same problem shows up for objects, environments and style, and the same tools apply with different emphasis.

**A recurring object** — a specific sword, car, building — responds well to description lock with unusual, specific details. Give it an asymmetry: a chipped pommel, a dented left wing.

**A recurring location** is harder, because rooms have more degrees of freedom than faces. Describe fixed landmarks and their relative positions: "the green tiled stove in the far left corner, a round window above the sink." Fixing a seed and varying only the camera angle works better here than for characters.

**A consistent visual style** across a whole set is best handled with a style reference — `--sref` in Midjourney with a fixed value, or the same LoRA and sampler settings in Stable Diffusion. Style consistency is considerably easier than character consistency, and it does a surprising amount of work: a set of images that share a palette and rendering read as belonging together even when the characters wobble.

## Working practices that help

- **Lock everything you are not testing.** Change one variable per generation. Otherwise you cannot tell what caused the drift.
- **Keep a canonical reference sheet** — front, three-quarter, profile — and re-derive from it rather than from your most recent image. Generating each image from the previous one compounds drift, the way photocopying a photocopy does.
- **Cull ruthlessly.** For a 12-panel sequence, expect to generate 100+ candidates. The consistency comes from selection as much as from technique.
- **Accept post-production.** Professional work fixes the last 10% in an image editor. A repainted eye colour is faster than fifty more generations.

## What none of this fixes

Emotional range is hard: a character generated smiling and generated grieving often reads as two different people, because expression changes the geometry the model uses for identity. Extreme angles are hard: profiles and rear three-quarters drift most. Ageing a character deliberately is very hard.

If your project depends on these, budget for retouching, or plan the shots so the difficult ones are further from camera. That is a legitimate directorial decision, not a workaround — and it is what a cinematographer would do with a difficult set anyway.

## Common questions

### Why does my character's face change even with a fixed seed?

Because a fixed seed only holds the noise field constant — it does not lock identity. Change the scene, the shot distance or the lighting and the model re-derives the face from the new context, and faces are among the most context-sensitive things it renders. Seed locking is strong for variations within one scene and weak across different scenes, which is why it needs pairing with a reference.

### How many images do I need to train a LoRA?

Fifteen to thirty is the usual working range, and consistency in that set matters far more than volume. Fifteen images that are unmistakably the same person will outperform forty that are only approximately similar, because the training process averages whatever you give it. Generate candidates with a character reference, cull hard for agreement, then train on the survivors.

### Should --cw be high or low?

Low — start at `--cw 0` — for most sequences. At 0, Midjourney references the face alone, which is what you want when the character moves between scenes and outfits. At 100 it also carries hair and clothing, which is only useful when the outfit is part of the identity and must not change. People who complain that character reference "locks everything" are usually running it at the default.

### Is it easier to keep a style consistent than a character?

Considerably, and it is worth exploiting. A set of images sharing a palette and rendering reads as belonging together even when the faces wobble slightly. Fix the style with a reference — `--sref` at a constant value, or the same checkpoint and LoRA — and you buy yourself a good deal of tolerance on character drift.
