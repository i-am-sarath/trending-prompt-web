---
title: "Midjourney parameters: what each flag actually changes"
description: "A working reference for --ar, --stylize, --chaos, --weird, --seed, --no, --sref and the rest, with the ranges that matter and the combinations that fight each other."
date: 2026-08-03
category: "reference"
tags: ["midjourney", "parameters", "reference", "stylize", "chaos"]
author: "The trendingprompt desk"
draft: false
---

Parameters are the part of a Midjourney prompt that people copy without understanding. They go at the end, they start with two hyphens, and most users settle on three of them and never touch the rest. That is a shame, because several of the less-used flags solve problems that people otherwise try to fix by rewriting their prompt twenty times.

This is a working reference rather than a list. For each parameter: what it changes, the range that is actually useful, and what it interacts badly with.

One caveat before the detail. Midjourney iterates quickly, and defaults, ranges and version behaviour change between releases. Everything here reflects behaviour observed across recent versions; when a number matters to your work, confirm it against the official documentation for the version you are on.

## How parameters are written

Parameters go at the end of the prompt, after all descriptive text, each starting with `--`:

```
a lone detective in a doorway, rain, neon signage --ar 16:9 --stylize 250 --seed 4821
```

Order among the parameters does not matter. Placement relative to the description does: text after a parameter is often ignored or misread, so finish describing before you start flagging.

Most parameters also have a short form — `--ar` is `--aspect`, `--s` is `--stylize`, `--c` is `--chaos`. Use whichever you find readable; the site's gallery uses the long forms so the prompts are legible to people who have not memorised the shorthand.

## --ar (aspect ratio)

Sets the shape of the image. `--ar 16:9` for widescreen, `--ar 2:3` for portrait, `--ar 1:1` for square, which is the default if you say nothing.

Aspect ratio is not a crop. The model composes differently for a different canvas: a `2:3` portrait tends to produce a standing figure, while `3:2` of the same prompt produces an environmental shot with the figure smaller in frame. If you are fighting to get a full-body shot, changing the ratio is often more effective than adding "full body" to the prompt.

Extreme ratios such as `--ar 21:9` or `--ar 1:3` work, but coherence drops as you get further from square, and repeated elements start creeping into the long dimension. There is more on choosing ratios, including per-platform sizes, in the [aspect ratio guide](/blog/ai-image-aspect-ratio-guide).

## --stylize (--s)

The single most consequential parameter. It controls how strongly Midjourney applies its own trained aesthetic — its taste — over your literal instructions.

| Value | Behaviour | Use for |
|---|---|---|
| 0–50 | Nearly literal, plainer, sometimes flat | Reference images, technical accuracy, tight briefs |
| 100 | Default balance | General work |
| 250–500 | Noticeably prettier, looser about your details | Mood pieces, concept art |
| 750–1000 | Strongly stylised, may drift from the prompt | Posters, abstract atmosphere |

The trade-off is a straight line: **higher stylize buys beauty with obedience**. If your prompt is being partly ignored — the shirt is the wrong colour, the object count is wrong — lower `--stylize` before you rewrite anything. If your image is technically correct but dull, raise it.

## --chaos (--c)

Range 0–100, default 0. Controls how different the four images in an initial grid are from one another.

Chaos is a *search* parameter, not a *style* parameter. It does not make one image more interesting; it makes the four options less similar, so you explore more of the possibility space per generation. Use `--chaos 25` to `--chaos 50` early in a project when you are still deciding what the picture is. Drop it to 0 once you know, because at that point you want four attempts at the same idea, not four different ideas.

Beginners often reach for chaos when they mean stylize. If you want *prettier*, use `--stylize`. If you want *different*, use `--chaos`.

## --weird (--w)

Range 0–3000, default 0. An experimental aesthetic axis that pushes toward the unusual — odd proportions, unexpected material combinations, compositions that a stock library would reject.

Values up to about 250 are a mild seasoning. Between 500 and 1000 the image becomes genuinely strange in ways that are sometimes brilliant and often unusable. Above that, expect to discard most outputs.

`--weird` interacts with `--stylize`: both are aesthetic pressures, and running both high produces incoherence. Keep one of them as the lead. Weird is also a poor fit for anything with a commercial brief attached, for obvious reasons.

## --no

The negative parameter. `--no text` and `--no people` remove elements more reliably than writing "without text" in the prompt, because the prompt has no dependable representation of negation — writing "no text" puts the token "text" into your positive description.

`--no` works best on nouns and concrete elements. It works poorly on abstractions: `--no ugly` is not meaningful to the model. It is also weak against things that are structurally implied — asking for a city street `--no cars` is a fight against every photograph of a street in the training data, and you will win it maybe half the time. Better to describe the desired state: "a pedestrianised street, bollards, empty of traffic."

The mechanics differ substantially between Midjourney and Stable Diffusion; [negative prompts explained](/blog/negative-prompts-explained) covers both.

## --seed

Sets the starting noise. Range 0 to 4294967295. The same prompt, the same seed, the same version and the same parameters will produce the same image, which makes seeds the foundation of any controlled comparison.

The correct way to test whether a change to your prompt actually did something is to hold the seed fixed and change one clause. Otherwise you are comparing two random draws and attributing the difference to your edit. This, plus how to recover the seed of an image you have already made, is covered in [seeds, variations and reproducibility](/blog/seeds-variations-and-reproducibility).

A caution: seeds are not portable across model versions. The same seed on `--v 6` and `--v 7` produces unrelated images.

## --sref (style reference) and --sw

`--sref <image url>` tells Midjourney to borrow the *style* of a reference image — its palette, texture, rendering — without copying its content. `--sw` sets the strength, typically 0–1000 with 100 as the default.

This is the most reliable way to get a consistent look across a set of images, which matters if you are producing a series rather than a single picture. Use a low `--sw` (around 50) for a suggestion of the reference, and higher values when the style must be unmistakable.

`--sref random` gives you a randomly chosen style seed, and Midjourney will tell you which one it used, so you can reuse it. This is a genuinely useful way to find a house style you would never have described in words.

## --cref (character reference) and --cw

`--cref <image url>` attempts to carry a *character* between images. `--cw` controls how much is carried, from 0 to 100: at 100 the face, hair and clothing are all referenced; at 0 only the face is.

If you are building a character across multiple scenes, `--cw 0` is usually correct — you want the face to persist while the outfit and setting change. This is one of several approaches covered in [keeping characters consistent](/blog/consistent-characters-across-ai-images), and it is worth being realistic: it is a strong resemblance, not an identity.

## --iw (image weight)

When you include an image URL at the start of a prompt as visual input, `--iw` controls how much that image matters relative to your text. Typical range 0–3, default around 1. Low values treat the image as a loose hint; high values make the text almost decorative.

## --quality (--q)

Values of `.25`, `.5` and `1`. This is a compute-time dial, not a resolution dial. Lower quality spends less GPU time and produces less detail; the output dimensions do not change.

`--q .5` is a reasonable default while you are exploring, because you are going to discard most of what you generate anyway, and it halves the cost of finding out. Switch to `--q 1` for the final run.

## --tile

Produces a seamlessly tiling image, for textures, patterns and backgrounds. It genuinely tiles — you can lay the output edge to edge without a visible seam — which makes it one of the few parameters with a hard, verifiable outcome. Excellent for surface work; pointless for anything with a subject.

## --repeat (--r)

Runs the same prompt several times in one command. Useful for exactly the three-run reliability test described in [how to write prompts](/blog/how-to-write-ai-image-prompts): `--repeat 3` gives you three independent grids and an honest picture of how stable your prompt is.

## --style raw

Not a parameter with a value but a mode. `--style raw` reduces Midjourney's default aesthetic intervention — less automatic beautification, less contrast enhancement, more literal interpretation.

For photographic work, `--style raw` combined with a low `--stylize` is the closest Midjourney gets to behaving like a camera rather than an illustrator. If you are trying to produce something that looks like an unremarkable real photograph — which is much harder than producing something spectacular — this pairing is where to start.

## --niji

Switches to the Niji model, trained for anime and illustration. It is a different model, not a style flag: composition, colour and line quality all change. If you are working in anime or manga idioms, start here rather than trying to coax the general model into it. See [anime and illustration prompts](/blog/anime-and-illustration-prompts).

## Combinations that fight

Some pairs work against each other. Knowing which saves a lot of confused iteration.

- **High `--stylize` with a long, specific prompt.** You wrote 40 words of detail and then told the model to prioritise its own taste. Pick one.
- **High `--chaos` with `--seed`.** A fixed seed is for controlled comparison; chaos is for exploration. Together they are noise.
- **`--weird` with a commercial brief.** Weird is an exploration tool.
- **`--no` against something structurally implied.** Describe what you want instead of subtracting what you do not.
- **`--style raw` with heavy artistic style tags.** Raw suppresses exactly the interpretive layer those tags rely on.

## A sensible starting set

For photographic work:

```
--ar 3:2 --style raw --stylize 50
```

For illustration and concept work:

```
--ar 16:9 --stylize 350 --chaos 20
```

For exploring a new idea:

```
--chaos 45 --q .5 --repeat 3
```

Then change one thing at a time, with the seed fixed, and you will learn what each flag does on your prompts rather than on someone else's.

Every Midjourney entry in the [gallery](/) lists its parameters as part of the prompt text, so you can see which combinations produced which results in practice.

## Common questions

### What is the difference between --stylize and --chaos?

They solve different problems and are constantly confused. `--stylize` controls how much of Midjourney's own aesthetic is applied over your instructions — higher is prettier and less obedient. `--chaos` controls how different the four images in a grid are from each other, which is a search setting, not a style setting. If you want prettier, raise stylize. If you want more options to choose from, raise chaos.

### Why is Midjourney ignoring part of my prompt?

Usually because `--stylize` is high. At 250 and above the model increasingly prioritises its own taste over your literal details, so specified colours, object counts and small features get quietly negotiated away. Before rewriting anything, drop to `--stylize 50` and regenerate on the same seed. If the detail appears, you had a stylize problem rather than a wording problem.

### Do parameters have to go at the end?

Yes, after all descriptive text. Order among the parameters themselves does not matter, but text placed after a parameter is frequently misread or ignored. Finish describing, then start flagging. This is also why prompts are more readable when you keep the parameter block together rather than scattering flags through the description.

### What does --style raw actually change?

It reduces Midjourney's default aesthetic intervention — less automatic beautification, less contrast enhancement, more literal interpretation of what you wrote. For photographic work it is the closest the tool gets to behaving like a camera rather than an illustrator, and paired with a low `--stylize` it is the standard starting point for images that need to look ordinary rather than spectacular.
