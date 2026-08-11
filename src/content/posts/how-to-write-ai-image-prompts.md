---
title: "How to write AI image prompts that actually work"
description: "A six-slot prompt structure that transfers between Midjourney, DALL·E and Stable Diffusion, why word order changes your output, and how to test a prompt before you trust it."
date: 2026-08-10
category: "guides"
tags: ["prompt structure", "midjourney", "dall-e", "stable diffusion", "beginners"]
author: "The trendingprompt desk"
draft: false
---

Most prompts fail for the same reason: they describe a feeling instead of a picture. "A beautiful magical forest, stunning, masterpiece" gives a model almost nothing to work with. It contains one noun, three opinions, and no information about light, distance, lens, time of day, or what the picture is actually of. The model fills every gap with the statistical average of its training data, and the statistical average of "beautiful magical forest" is the same green-and-gold wallpaper everyone else is generating.

A good prompt is not longer. It is more decided. Every clause you add should remove ambiguity that the model would otherwise resolve on your behalf.

This guide sets out a structure that works across tools, explains why the order of your words matters as much as the words themselves, and describes how to test a prompt so you know whether it is genuinely reliable or whether you got a lucky seed.

## The six slots

Nearly every strong image prompt fills six slots, in roughly this order:

1. **Subject** — what the picture is of, in concrete nouns
2. **Action or pose** — what the subject is doing, or how it is arranged
3. **Environment** — where it is, and what is around it
4. **Lighting** — the single highest-leverage slot, and the one most often skipped
5. **Style and medium** — photograph, oil painting, 3D render, and in whose manner
6. **Technical** — lens, film stock, aspect ratio, parameters

You do not need all six every time. A studio product shot barely has an environment; an abstract texture has no action. But when an image comes out wrong, the fix is almost always a slot you left empty.

Written out, it looks like this:

```
Three unglazed stoneware vessels on a raw plaster shelf,
single north-facing window as the only light source,
long soft shadows, muted clay and bone palette,
medium format, editorial product photography
```

Subject, environment, lighting, palette, technical. Fifteen seconds of thought, and no room left for the model to invent a sunset.

## Word order is weighting

In most image models, tokens near the front of a prompt carry more influence than tokens near the end. This is not a rule anyone wrote down; it falls out of how text encoders process a sequence and how training captions are usually written — subject first, details after.

The practical consequences:

- **Put the subject first.** If "a fox" appears after twenty words of scene-setting, you will sometimes get a landscape with no fox.
- **Put the thing you care most about second.** Whatever must not be negotiated away goes early.
- **Put parameters and style tags last.** They are modifiers, and they behave best as modifiers.

Compare these two prompts, which contain identical words:

```
Cinematic, moody, rain, neon, a lone detective in a doorway
a lone detective in a doorway, rain, neon, cinematic, moody
```

The first frequently produces an atmospheric street with no clear figure. The second produces a detective. Same vocabulary, different priority.

There is a second reason to keep important content early. Models built on CLIP-style text encoders have historically truncated prompts at 77 tokens — roughly 60 words. Anything past the cut is silently discarded. Newer systems handle much longer prompts, and Midjourney's recent versions read long natural-language descriptions well, but the habit of front-loading costs nothing and protects you when a tool quietly imposes a limit.

## Slot by slot

### Subject

Use concrete nouns and count them. "Birds" gives you an unpredictable number; "three crows" gives you a composition. Specify age, material, and condition where they matter: "a chipped enamel mug" is a different object from "a mug."

Avoid abstractions as subjects. "Loneliness" is not a subject; "a single chair in an empty ballroom" is loneliness rendered as a subject.

### Action or pose

Static prompts produce static images. "A woman standing" is a snapshot; "a woman turning to look back over her shoulder" is a photograph. Verbs also fix limb positions, which reduces the anatomical chaos that portraits are prone to — more on that in [portrait prompts](/blog/portrait-prompts-hands-eyes-skin).

### Environment

Name the surface, the background, and the depth. "On a wet asphalt street, shopfronts blurred behind" tells the model there is a foreground plane, a middle ground and a background. Without it you often get a subject pasted onto a flat gradient.

### Lighting

If you learn one slot, learn this one. Lighting determines mood more reliably than any adjective, and the vocabulary is precise and portable: `golden hour`, `overcast diffuse light`, `single softbox camera left`, `hard midday sun`, `rim light from behind`, `practical lamps in frame`. Each produces a visibly different picture from the same subject. There is a full vocabulary in [lighting terms for AI prompts](/blog/lighting-terms-for-ai-prompts).

### Style and medium

Be specific about what kind of object the image is. "Photograph" and "illustration" are the two big forks; after that, name the process — `35mm film photograph`, `gouache on cold-press paper`, `clay stop-motion still`, `technical pen cross-hatching`. Naming a medium implies a whole cluster of visual properties you would otherwise have to describe individually.

Naming living artists to copy their style is a practice worth thinking twice about; naming a medium, movement or era gets you most of the way there without appropriating an individual's work.

### Technical

Focal length, aperture, film stock, aspect ratio, and any tool-specific flags. `85mm, f/1.8` produces compressed perspective and shallow depth of field. `24mm` produces wide, slightly distorted, environmental framing. This vocabulary is covered in [camera and lens terms](/blog/camera-and-lens-terms-for-ai-prompts), and aspect ratio has enough consequences to deserve [its own guide](/blog/ai-image-aspect-ratio-guide).

## Building one up

Start with the bare subject and add one slot at a time, generating at each step. This is slower than writing a paragraph and hoping, and it teaches you what each clause is actually doing.

**Step 1 — subject only.** `a fox`
Generic stock fox on white.

**Step 2 — add action.** `a fox mid-stride, head turned toward the camera`
Now there is a moment rather than a portrait.

**Step 3 — add environment.** `a fox mid-stride, head turned toward the camera, crossing a frozen car park at dawn, sodium lamps still on`
The picture acquires a story and a colour temperature conflict — cold sky, warm lamps — which is exactly the sort of tension that makes an image look photographed rather than generated.

**Step 4 — add lighting.** `... lit by one sodium lamp from behind, thin rim light on the fur, deep shadow in front`
Backlight on fur is a specific, achievable effect. The model knows what it looks like.

**Step 5 — add medium and technical.** `... 35mm film photograph, grain visible, 50mm lens, f/2, shallow depth of field`

The finished prompt is long, but every clause is a decision, and you can trace any part of the output back to the words that caused it. That traceability is the difference between prompting and gambling.

## What to leave out

**Quality incantations.** `masterpiece, best quality, 8k, ultra detailed, award winning` were genuinely useful on older Stable Diffusion checkpoints, where training captions came from image boards whose tags correlated with quality. On current models their effect ranges from small to none, and `8k` in particular tends to add texture noise rather than resolution. Resolution is a setting, not an adjective. Keep one or two if they demonstrably help your model; drop the rest.

**Negations in the main prompt.** Writing "no cars" in the positive prompt frequently produces cars. Most text encoders have no reliable representation of negation — the token "cars" is still in there. Use a dedicated negative field or parameter instead; see [negative prompts explained](/blog/negative-prompts-explained).

**Contradictions.** `wide-angle close-up`, `soft harsh light`, `minimalist, highly detailed, baroque`. The model averages the conflict and you get mush. If your prompt has two clauses fighting, delete one.

**Politeness.** "Please create an image of" wastes tokens in most tools. The exception is conversational systems like DALL·E 3 inside ChatGPT, where you are talking to a language model that rewrites your request anyway.

## Test before you trust

A prompt that produced one good image has not been tested. Generative models are stochastic: the same words with a different seed can produce a materially different picture. Before you save a prompt, or publish it, run it **at least three times from a clean session** with no reference image, no style reference and no prior conversation context.

Ask three questions of the results:

1. **Does the subject survive every run?** If the fox disappears once in three, the subject clause is too weak or buried too deep.
2. **Is the variation stylistic or structural?** Different fur colour is fine. Different genre is not.
3. **Would a stranger reading only the prompt expect these images?** If not, something in the output is coming from luck rather than from your words.

Every prompt published on this site goes through that check, which is why some perfectly attractive images never make it onto the [index](/).

## Moving a prompt between tools

The six-slot structure transfers. The syntax does not.

| Element | Midjourney | Stable Diffusion | DALL·E 3 |
|---|---|---|---|
| Structure | Comma-delimited clauses work well | Comma-delimited tags work well | Full sentences work better |
| Negatives | `--no cars` | Dedicated negative prompt field | Describe the desired state instead |
| Aspect ratio | `--ar 3:2` | Set width/height | Ask for "wide" or "portrait" |
| Emphasis | `word::2` | `(word:1.3)` | Repeat and elaborate in prose |
| Seed | `--seed 1234` | Seed field | Not directly exposed |

The rule of thumb: **Midjourney and Stable Diffusion reward a list of decisions; DALL·E 3 rewards a clear description.** When you move a prompt into DALL·E, reassemble the clauses into sentences. When you move one out of DALL·E, strip the sentences back to clauses. The [tool comparison](/blog/midjourney-vs-dalle-vs-stable-diffusion) goes into where each one genuinely wins.

## The short version

Write the subject first. Add an action so the image has a moment in it. Place it somewhere with depth. Decide the light — always decide the light. Name the medium so the model knows what kind of object it is making. Put the technical flags at the end. Then run it three times and see whether the words or the seed did the work.

Every entry in the [prompt gallery](/) is broken into its clauses on the page, so you can see this structure in something that has already been tested rather than only in the abstract.

## Common questions

### How long should a prompt be?

Long enough to make every decision that matters to you, and no longer. In practice that is usually 25 to 50 words for a photographic image. Length is not the goal — decisions are. A 60-word prompt of vague adjectives performs worse than a 25-word prompt that names subject, light, medium and lens, because the second one removes ambiguity while the first one only adds noise.

### Do quality words like "masterpiece" and "8k" still help?

Rarely, and much less than people assume. They were genuinely effective on older Stable Diffusion checkpoints, where those exact tags came from image boards and correlated with better pictures. On current models the effect ranges from small to none, and `8k` in particular tends to add fine texture rather than resolution. Keep one if you can demonstrate it helps on your model; drop the rest.

### Why does my prompt work once and then never again?

Because you tested it once. Generation is stochastic, and a single good result may be a property of the seed rather than of your words. Run any prompt you intend to keep at least three times from a clean session. If the subject survives every run and the variation is stylistic rather than structural, the prompt is real; if not, the words are not carrying it.

### Should I write prompts as sentences or as comma-separated clauses?

It depends on the tool. Midjourney and Stable Diffusion both handle comma-delimited clauses well, and that format makes prompts easy to edit one decision at a time. DALL·E 3 is a language interface and does noticeably better with full sentences, particularly for spatial relationships. Write in the idiom of the tool you are using rather than a universal style.
