---
title: "Negative prompts explained: why 'no cars' gives you cars"
description: "How negation actually works in image models, the difference between Midjourney's --no and a Stable Diffusion negative prompt, and when describing what you want beats subtracting what you don't."
date: 2026-07-06
category: "guides"
tags: ["negative prompt", "stable diffusion", "midjourney", "troubleshooting"]
author: "The trendingprompt desk"
draft: false
---

Type "an empty street, no cars" into most image models and you will get cars. This surprises people, and the explanation is worth understanding, because it also explains why the standard fix works and why the copied-and-pasted negative prompts circulating online are mostly cargo cult.

## Why negation fails in the positive prompt

A text encoder converts your prompt into a numerical representation of meaning. It is very good at "what concepts are present here" and much weaker at "which of these concepts is being denied."

When you write "no cars", the token `cars` enters the encoding. The word `no` is supposed to invert it, but the encoder has no dedicated mechanism for logical negation — it produces one blended representation of the whole phrase, and in that blend, "cars" is unmistakably present. The generation process then does what it always does: it moves toward the concepts in the encoding.

Language models handle negation reasonably well because they are trained to predict text, where "no" reliably changes meaning. Image text encoders are trained to match captions to pictures, and captions almost never say what is absent. Nobody captions a photograph "a street with no elephants." So the model has barely any training signal for absence, and it treats your negation as a mention.

The practical rule: **any noun you type will tend to appear, regardless of the words around it.** Write "not a cartoon" and you raise the chance of a cartoon.

## Two mechanisms that do work

Tools solve this outside the prompt, in one of two ways.

### Midjourney: the --no parameter

`--no cars` applies negative weighting to that concept during generation, separately from your description. It is a real mechanism, not a text trick.

```
an empty pedestrian street at dawn, wet cobbles, shopfronts closed --no cars people signage
```

Multiple terms can be listed after a single `--no`, separated by spaces or commas. It works best on concrete nouns — objects the model can identify and steer away from.

Where it struggles:

- **Abstractions.** `--no ugly`, `--no bad quality`, `--no boring` do essentially nothing. There is no coherent direction in the model's space corresponding to "ugly."
- **Structurally implied content.** A city street without cars fights the entire training distribution. `--no cars` will win maybe half the time, and the other half you get a car peeking around a corner.
- **Things you also described.** `a busy market --no people` is a contradiction. The model splits the difference and you get something incoherent.

### Stable Diffusion: the negative prompt field

Stable Diffusion and its interfaces expose a separate negative prompt box. This is a more powerful mechanism than Midjourney's: the model performs a second conditioning pass on your negative text and actively steers away from it, with the strength governed by the CFG scale.

That power is why Stable Diffusion negative prompts can meaningfully include quality concepts as well as objects. It is also why the community accumulated enormous copy-pasted negative prompts:

```
lowres, bad anatomy, bad hands, text, error, missing fingers,
extra digit, fewer digits, cropped, worst quality, low quality,
jpeg artifacts, signature, watermark, username, blurry
```

That string is genuinely useful on older SD 1.5-era checkpoints, where those exact phrases appeared in training captions scraped from image boards and correlated with poor images. On modern models it is far less necessary, and a long negative prompt has real costs — it consumes conditioning strength that could go toward your actual intent, and it can flatten the image toward a generic "safe" look.

Start with an empty negative prompt. Add terms only when you see a specific recurring problem.

### DALL·E 3 and conversational tools

DALL·E 3 exposes no negative field. Because a language model rewrites your request before generation, the most effective approach is to describe the desired state positively and, if needed, say it conversationally: "a completely empty street — there should be no vehicles anywhere in the image." The rewriting layer handles the instruction better than the image encoder would.

## The technique that beats both: describe the positive

For most problems, the strongest fix is not subtraction at all. It is describing the state you want so completely that the unwanted thing has no room.

| Instead of | Write |
|---|---|
| `--no cars` | "a pedestrianised street, bollards at the entrance, empty of traffic" |
| `--no people` | "deserted at dawn, before opening, no one about yet" — plus `--no people` |
| `--no text` | "unbranded packaging, blank label" |
| `--no blur` | "sharp throughout, deep focus, f/11, tripod" |
| `--no extra fingers` | "hands in pockets" or "hands out of frame" |
| `--no modern elements` | "1890s, gas lamps, cobblestones, horse-drawn cart" |

The last row shows the principle. "No modern elements" asks the model to check every object against an abstract category. "1890s, gas lamps, cobblestones" gives it a coherent world to draw from, and modernity is excluded as a side effect rather than as a rule.

The hands row is the most useful trick in this table. Rather than fighting anatomy through negation, remove the problem from the frame: hands in pockets, holding an object that constrains the pose, crossed arms, or simply cropped out. This is what photographers do when a subject's hands are awkward, and it works for the same reason. More on this in [portrait prompts](/blog/portrait-prompts-hands-eyes-skin).

## Building a negative prompt that earns its place

If you are on Stable Diffusion and you do want a negative prompt, build it deliberately.

**Step 1 — generate with nothing.** Four images, empty negative field.

**Step 2 — name the actual defect.** Not "bad quality." Something specific: the hands have six fingers; there is a watermark; the composition is cropped at the chin; the skin is plastic.

**Step 3 — add only those terms.** `extra fingers, watermark` — two terms, not thirty.

**Step 4 — regenerate with the same seed** and compare. If the defect persists, the negative prompt is not the right tool and the positive description needs work.

**Step 5 — keep the list short.** Every term costs conditioning strength. A negative prompt of five well-chosen terms outperforms one of fifty copied terms.

## Terms genuinely worth having

On Stable Diffusion, these earn their place when the corresponding problem appears:

- **Anatomy:** `extra fingers`, `fused fingers`, `extra limbs`, `deformed hands`
- **Artefacts:** `watermark`, `signature`, `text`, `jpeg artifacts`
- **Framing:** `cropped`, `out of frame`
- **Rendering:** `blurry`, `oversaturated`, `plastic skin`
- **Style leakage:** `cartoon`, `3d render`, `illustration` — when you want a photograph

That last group is underused. If you asked for a photograph and keep getting something that looks like a render, putting `3d render, cgi, illustration` in the negative prompt is far more effective than adding `photorealistic` to the positive one.

## CFG scale changes how hard negatives push

In Stable Diffusion, the CFG (classifier-free guidance) scale controls how strongly the model follows both your positive and negative conditioning. Typical values sit between 5 and 9.

- **Low CFG (3–5)** — loose adherence, more creative, negatives applied gently.
- **Mid CFG (6–8)** — the usual working range.
- **High CFG (10+)** — aggressive adherence; images become contrasty, oversaturated and sometimes fried, and negatives can push so hard they distort the subject.

If your negative prompt seems to be doing nothing, raising CFG a little is worth trying before you add more terms. If your images look burnt, CFG is the first thing to lower.

## Things negative prompts cannot fix

Be realistic about the ceiling. Negatives steer away from concepts; they do not add capability.

- **Text in images.** Negative prompts will not make a model spell. Models that render text well do so because they were built for it.
- **Counting.** `--no extra people` will not reliably give you exactly three.
- **Physical accuracy.** Negation will not fix reflections that disobey optics.
- **Consistency between images.** That is a [different problem with different tools](/blog/consistent-characters-across-ai-images).

When a negative prompt has failed twice, stop adding terms. Change the positive description, change the composition so the problem is out of frame, or fix it in post. Three well-chosen words in the positive prompt routinely beat thirty in the negative one.

## Summary

Negation does not work inside a positive prompt because text encoders represent presence, not absence. Use `--no` in Midjourney and the negative field in Stable Diffusion, keep those lists short and specific, and reach first for a positive description of the state you want. The [prompt structure guide](/blog/how-to-write-ai-image-prompts) covers how to write that description so the unwanted elements never come up in the first place.

## Common questions

### Should I copy one of those long negative prompts I found online?

No. Those lists were assembled for SD 1.5-era checkpoints, where the exact phrases appeared in training captions and correlated with poor images. On current models most of the terms do nothing, and a long negative prompt has a real cost: it consumes conditioning strength that could be spent on your actual intent, and it tends to flatten output toward a safe, generic look. Start empty and add only what a visible defect requires.

### Why does my negative prompt seem to have no effect at all?

Two likely causes. Either the term is an abstraction the model has no coherent direction for — `ugly`, `bad`, `boring` — or your CFG scale is low enough that neither positive nor negative conditioning is being followed strongly. Try a concrete noun instead of a judgement, and nudge CFG up a point or two before adding more terms.

### Can I use --no in Midjourney for style rather than objects?

Poorly. `--no` works on things the model can identify and steer away from, so it handles concrete nouns well and abstract qualities badly. If you are getting an unwanted illustrated look on a photographic prompt, the more effective route is a positive one: name the medium, the film stock and the lens, and let the specificity crowd the illustration out.

### Does the order of negative terms matter?

Much less than in the positive prompt, where sequence carries real weight. Negative conditioning is applied as a whole, so ordering has little effect. What does matter is count and specificity — five well-chosen terms beat fifty copied ones — and, in Stable Diffusion, weighting: `(watermark:1.3)` pushes harder than the bare word.
