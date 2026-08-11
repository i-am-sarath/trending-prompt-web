---
title: "Prompt weighting and emphasis: telling a model what matters most"
description: "Midjourney's :: syntax, Stable Diffusion's (word:1.2) attention weighting, prompt order as implicit weighting, and when emphasis fixes a problem versus when it makes one."
date: 2026-05-04
category: "reference"
tags: ["weighting", "emphasis", "syntax", "midjourney", "stable diffusion"]
author: "The trendingprompt desk"
draft: false
---

Every prompt is a set of competing instructions. The model cannot satisfy all of them equally, so it allocates attention — and by default, it allocates according to its own priors and to where words fall in the sequence. Weighting syntax is how you override that allocation and say which parts are non-negotiable.

It is powerful and frequently misused. Most weighting problems are actually structure problems, and reaching for numbers before fixing the sentence is the usual mistake.

## Implicit weighting: order

Before any syntax, understand the weighting you are already applying. Tokens earlier in a prompt generally carry more influence than later ones, because text encoders process a sequence and because training captions put subjects first.

This means:

```
a crumbling lighthouse, storm, gulls
storm, gulls, a crumbling lighthouse
```

are not equivalent. The first is a picture of a lighthouse. The second is often a picture of a storm that happens to contain a small lighthouse, or none at all.

Reordering is free, has no syntax to remember, works identically in every tool, and solves the majority of emphasis problems. Try it before anything below.

## Midjourney: the :: operator

Midjourney splits a prompt into parts with `::` and assigns each a weight.

```
a crumbling lighthouse::2 storm::1 gulls::0.5
```

The number after `::` is that segment's weight. Higher means more influence. Weights are relative, so `2` and `1` behave the same as `4` and `2`.

Two things to know:

**A bare `::` acts as a separator with implied weight 1.** Even with no numbers, `hot dog` and `hot:: dog` are different prompts: the first is food, the second is a warm animal. Splitting a compound term is a legitimate use of the operator on its own.

**Negative weights subtract.** `--no cars` is shorthand for `cars::-0.5`. You can write negative weights directly for finer control:

```
a busy street scene:: cars::-0.9
```

That said, `--no` is clearer to read, and clarity matters in a prompt you may return to in three months. The site's [gallery](/) entries use `--no` for this reason.

**Practical range:** weights between 0.25 and 3 are the useful band. Above about 5, the weighted term dominates so completely that the rest of the prompt stops mattering, and the image degrades into a texture study of the emphasised concept.

## Stable Diffusion: attention weighting

Stable Diffusion interfaces use parentheses with an explicit multiplier:

```
a crumbling lighthouse, (storm:1.3), (gulls:0.7)
```

`1.0` is neutral. Above increases attention, below decreases. Most interfaces also accept shorthand: `(word)` is roughly 1.1, `((word))` roughly 1.21, and square brackets `[word]` de-emphasise. The explicit numeric form is clearer and worth preferring.

**Practical range:** 0.7 to 1.4. This is a much narrower usable band than Midjourney's, and exceeding it has visible consequences. Past about 1.5, weighted terms produce artefacts — colour bleeding into unrelated areas, texture repetition, warped anatomy near the emphasised element. If you find yourself typing `1.8`, the problem is elsewhere.

Weighting also applies inside the negative prompt, where the same range applies. `(watermark:1.3)` in the negative field pushes harder against watermarks than the bare term. See [negative prompts explained](/blog/negative-prompts-explained) for how that interacts with CFG.

**DALL·E 3** has no weighting syntax. Emphasis is expressed in prose: repeat the important element, describe it in more detail than the rest, and put it in the main clause of the sentence. Elaboration is weighting in a conversational interface — the more words spent on a thing, the more it matters.

## When weighting is the right tool

**A specific attribute keeps getting dropped.** You asked for a red door and keep getting brown. `(red door:1.3)` is a reasonable response — though check first that "red" is not being pulled toward a dominant palette elsewhere in the prompt.

**Two subjects need a hierarchy.** In a scene with a person and a building, weighting decides which is the subject and which is the setting.

**A style is overwhelming the content, or vice versa.** Reduce the weight of the style clause rather than deleting it.

**A term has multiple meanings.** Weighting can push toward the reading you want, though a more specific word is usually better.

## When weighting is the wrong tool

**The element is missing entirely.** Weighting amplifies something present in the encoding; it cannot conjure a concept the model does not have. If a specific object never appears at any weight, the model probably cannot render it, and you need to describe it in terms of things it can.

**The prompt contradicts itself.** `(minimalist:1.4)` next to a list of twelve objects does not resolve the contradiction; it just makes the fight louder. Delete the losing clause.

**You have not tried reordering.** Moving a term to the front is often equivalent to a 1.3 weight and costs nothing in legibility.

**Everything is weighted.** If half your terms carry multipliers, nothing is emphasised — you have just rescaled the whole prompt. Emphasis is relative. Weight one or two things; leave the rest alone.

## Testing weights honestly

Weighting is exactly the kind of change that needs a fixed seed. Compare like with like:

```
a crumbling lighthouse, storm, gulls --seed 4821
a crumbling lighthouse, (storm:1.3), gulls --seed 4821
a crumbling lighthouse, (storm:0.7), gulls --seed 4821
```

Three images, same noise, one variable. Now you can see what 1.3 actually does to this prompt on this model, rather than what you hope it does. The method is covered in [seeds, variations and reproducibility](/blog/seeds-variations-and-reproducibility).

Do this a few times and you will develop calibrated intuitions — which are model-specific, and worth rebuilding whenever the tool updates.

## Prompt scheduling

Some Stable Diffusion interfaces support changing the prompt partway through generation:

```
[a lighthouse:a ruined tower:0.4]
```

This uses the first term for the initial 40% of steps and the second thereafter. Because early steps establish composition and later steps fill in detail, scheduling lets you set the structure with one concept and the surface with another.

It is genuinely useful for hybrid subjects and for getting a solid composition from a term the model handles well, then rendering it in a style the model handles less reliably. It is also fiddly, interface-specific, and unnecessary for most work.

## Alternating and blending

Alternating syntax cycles between terms across steps:

```
[oak|marble]
```

The result is a blend of both rather than either. This is a reasonable way to get a material or a hybrid creature that sits between two things, and it produces smoother results than putting both words in the prompt and hoping.

Both this and scheduling are Stable Diffusion features with no Midjourney equivalent — Midjourney's answer to hybridisation is `::` weighting between the two concepts, which is coarser but simpler.

## A working order of operations

When a prompt is not giving you the right emphasis, work through this in order:

1. **Reorder.** Put the important thing first.
2. **Cut.** Remove clauses that compete with it.
3. **Specify.** Replace a vague term with a precise one — "vermilion" instead of `(red:1.3)`.
4. **Weight.** Now apply a modest multiplier, one or two terms only.
5. **Test with a fixed seed** and adjust.

Steps 1 to 3 fix most problems, and they leave you with a prompt that is readable by a human being. Step 4 is a scalpel, not a hammer, and prompts stuffed with parentheses are usually a sign that steps 1 to 3 were skipped.

## Common questions

### Why does my weighted term bleed colour into the rest of the image?

Because the weight is too high. Attention weighting does not politely amplify one object — it increases that concept's influence over the whole denoising process, so a heavily weighted `(red dress:1.7)` pushes red into the walls, the light and the skin. Drop to 1.2, and if the dress still is not red, the problem is that another clause is dominating the palette. Find and cut that clause instead.

### Can I weight a whole phrase rather than a single word?

Yes, and you usually should. `(a chipped enamel mug:1.3)` weights the concept; `(chipped:1.3) enamel mug` weights an adjective in isolation, which frequently produces chips on the wrong object or a generally distressed image. Parenthesise the complete noun phrase so the emphasis lands on a thing rather than a property floating free.

### Does weighting work the same across models?

No. The usable range differs — Stable Diffusion tolerates roughly 0.7 to 1.4 while Midjourney's `::` operator is comfortable up to about 3 — and the same multiplier produces different magnitudes on different checkpoints. Calibrated intuitions do not transfer between tools, or reliably across major version updates of the same tool. Re-test after any upgrade.

### Is it better to weight a term or just repeat it?

Repetition is a crude form of weighting and it works, but it is imprecise and it consumes prompt length. `red dress, red dress, red dress` roughly triples the concept's presence with no control over the amount. Explicit weighting does the same job with a dial. The exception is DALL·E 3, which has no weighting syntax, and where elaborating on a subject in prose is genuinely the correct method.
