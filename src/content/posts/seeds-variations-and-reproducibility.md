---
title: "Seeds, variations and reproducibility: how to test a prompt properly"
description: "What a seed actually is, why fixing one is the only honest way to test a prompt change, and how to run controlled comparisons instead of guessing."
date: 2026-05-11
category: "workflow"
tags: ["seed", "reproducibility", "testing", "workflow", "methodology"]
author: "The trendingprompt desk"
draft: false
---

Most people evaluate prompt changes badly. They generate an image, change three words, generate again, decide the change was an improvement, and move on. But the second image differs from the first for two reasons — the edit, and a different random starting point — and there is no way to tell which did what.

Fixing the seed removes the second variable. It converts prompting from superstition into something you can actually learn from, and it is the difference between accumulating knowledge and accumulating folklore.

## What a seed is

Diffusion models start from a field of random noise and iteratively remove the noise, guided by your prompt, until an image emerges. The seed is the number that generates that initial noise field.

Same seed, same noise. Same noise plus same prompt plus same model, sampler and settings gives the identical image, every time, on any machine. Generation is deterministic; the randomness lives entirely in choosing the seed.

The consequence: **an image is a function of your prompt and the seed together.** A prompt that produced something wonderful on one seed may be mediocre on the next twenty. If you do not know which contributed what, you do not know whether you have a good prompt.

## Setting and finding seeds

**Midjourney.** Add `--seed 4821`. Any integer from 0 to 4294967295. To recover the seed of an image you already made, react to it with the envelope emoji in Discord and the bot direct-messages you the seed.

**Stable Diffusion.** A seed field in every interface, with `-1` meaning random. The seed is recorded in the image metadata alongside sampler, steps, CFG and model hash, so any image you generated can be reproduced exactly.

**DALL·E 3.** No exposed seed control. This is a real limitation for methodical work and one of the main reasons people move to other tools for iteration, as noted in the [tool comparison](/blog/midjourney-vs-dalle-vs-stable-diffusion).

An important caveat: **seeds are not portable across model versions.** Seed 4821 on one version and the next produce unrelated images. When a tool updates, your saved seeds stop meaning what they meant.

## The controlled comparison

The method is simple and almost nobody does it.

1. Generate with a random seed until you get something roughly in the right direction.
2. Note that seed.
3. Change **one clause**. Regenerate with the same seed.
4. Compare. The difference is attributable to your edit.
5. Repeat.

An example. Base prompt, seed fixed at 4821:

```
a fox crossing a frozen car park at dawn --seed 4821
```

Then, one at a time, same seed:

```
... , lit by one sodium lamp from behind --seed 4821
... , 35mm film photograph, visible grain --seed 4821
... , low angle, close to the ground --seed 4821
```

Each result tells you exactly what that clause does *to this image*. After a dozen of these you have real knowledge about your vocabulary rather than a feeling.

The corollary is equally important: **when you want to test the prompt itself, unfix the seed.** A prompt is good if it produces good images across many seeds, not if it produces one good image on one seed. Both tests matter, and they answer different questions:

- **Fixed seed, varying prompt** — what does this clause do?
- **Fixed prompt, varying seed** — is this prompt reliable?

The second is the test every prompt on this site has to pass before publication, and it is why some attractive images never make it onto the [index](/).

## Seed hunting

Sometimes the prompt is right and the composition is not. Rather than rewriting, generate the same prompt across many seeds and select.

In Midjourney, `--repeat 4` runs the prompt four times. In Stable Diffusion, batch generation with incrementing seeds does the same. Generate twenty, pick the composition that works, then lock that seed and refine the prompt against it.

This is a legitimate and efficient workflow. Much of what people call prompt engineering is actually seed selection, and being honest about that saves a lot of pointless rewriting. If twenty seeds all produce the same structural problem, the prompt is at fault. If one in five is excellent, the prompt is fine and you simply need to generate more.

## Variations and how they relate

Most tools offer variation buttons that generate images near an existing one. These work by perturbing the noise rather than replacing it — a nearby seed rather than a new one.

- **Subtle variations** stay close: same composition, small changes.
- **Strong variations** move further: recognisably related, materially different.

Variations are for refining a composition you already like. They are not a substitute for changing the prompt, because they cannot introduce information that was not in the original — asking for variations will never add the lighting clause you forgot.

The `--chaos` parameter is the opposite tool: it increases the spread *within* one generation, so the four images in a grid differ more from each other. Use chaos while you are still exploring, variations once you have found the thing. Details in the [parameters guide](/blog/midjourney-parameters-guide).

## Everything else that must be held constant

The seed alone is not sufficient for reproducibility. In Stable Diffusion, an identical image requires identical:

- Model checkpoint, exactly — including the specific version
- Sampler
- Number of steps
- CFG scale
- Resolution
- Any LoRAs and their weights
- Positive and negative prompt, character for character

Change any one and the image changes, sometimes dramatically. This is why Stable Diffusion interfaces write all of it into the PNG metadata: it is the only way to make an image genuinely reproducible weeks later.

**Sampler and steps** are worth understanding because they interact. Samplers differ in how they traverse the denoising process; some converge quickly and change little after 20 steps, others keep evolving. More steps is not reliably better — beyond convergence you are spending compute for no visible change, and with some samplers the image drifts. Find the step count where your sampler settles, and stay there.

**CFG scale** governs how strictly the model follows your conditioning. Low values wander creatively; high values obey aggressively and, past about 12, tend to produce oversaturated, contrasty, fried-looking images. It also changes how hard your [negative prompt](/blog/negative-prompts-explained) pushes.

## Keeping records

If you generate seriously, keep a log. It need not be elaborate — a spreadsheet or a text file with prompt, seed, model version, parameters and a note on the outcome.

The reason is that the useful unit of knowledge is not "this prompt is good" but "this clause, on this model, does this." That knowledge accumulates only if you write it down, because six weeks later you will not remember whether it was `--stylize 50` or `--style raw` that fixed the plastic skin.

Stable Diffusion users get this partly for free through metadata, provided the files are not stripped by an upload or a screenshot. Midjourney users have to be deliberate about it.

Two habits worth adopting:

- **Save the seed with every image you keep.** Renaming the file to include it costs nothing.
- **When something works unexpectedly well, write down why you think it worked.** Half the time you will be wrong, and finding that out later is itself informative.

## What reproducibility cannot survive

Model updates. When a tool ships a new version, seeds, and often prompts, stop behaving as they did. A prompt tuned over months against one version may need retuning.

This is worth planning for rather than resenting. Keep prompts modular — subject, environment, lighting, style, technical as separate clauses — so that when behaviour changes you can adjust the affected slot rather than rewriting the whole thing. That modularity is the practical argument for the structure described in [how to write AI image prompts](/blog/how-to-write-ai-image-prompts), quite apart from what it does for image quality.

## Common questions

### If I use the same seed on two different prompts, will the images look related?

Somewhat, and in a specific way: they tend to share broad composition — where masses sit in the frame, roughly where the horizon falls — because that structure emerges early from the noise field. The subject matter and style come from the prompt. This is why a fixed seed is such a good testing instrument: the layout stays put while you change one clause, so the difference you see is genuinely the clause.

### Why can't I reproduce an image I made last month?

Almost always a model version change. Seeds are tied to the exact model, and when a tool ships an update, the same seed produces unrelated output. Other culprits, in Stable Diffusion specifically, are a different sampler, step count, CFG value or resolution, or a LoRA loaded at a different weight. All of these must match exactly, which is why interfaces write them into the image metadata.

### Is a higher step count always better?

No. Samplers converge — past the point where the image stops changing, extra steps cost compute and produce nothing visible, and with some samplers the image slowly drifts rather than improving. Find the step count where your chosen sampler settles, usually somewhere between 20 and 40, and stay there. Spending 150 steps on a sampler that converged at 25 is the most common waste of GPU time in the whole workflow.

### How many seeds should I try before deciding a prompt is bad?

Around five to ten. If most of them share the same structural problem — the subject missing, the composition collapsing, the wrong genre — the prompt is at fault and no amount of further seed hunting will fix it. If one in four or five is excellent and the rest are merely fine, the prompt is working and you simply need to generate more and select.
