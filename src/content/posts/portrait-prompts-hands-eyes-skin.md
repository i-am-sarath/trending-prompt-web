---
title: "Portrait prompts: fixing hands, eyes and plastic skin"
description: "Why AI portraits look uncanny, and the specific prompt techniques that fix hands, dead eyes, waxy skin and the symmetrical-model problem."
date: 2026-05-18
category: "guides"
tags: ["portrait", "hands", "skin", "troubleshooting", "photography"]
author: "The trendingprompt desk"
draft: false
---

Portraits are where image models are simultaneously most impressive and most obviously wrong. The lighting is beautiful, the composition is right, and something about the face is not a person. Usually it is one of four things: the hands, the eyes, the skin, or the uncanny averaging that makes every generated face look like the same attractive stranger.

Each has a specific cause and a specific fix.

## The hands problem

Hands are hard for a well-understood reason. They have 27 bones and enormous positional variety, they appear at every scale and angle in training data, they are frequently partly hidden, and captions almost never describe them. The model has seen millions of hands and been told almost nothing about them.

Fighting this with negative prompts — `extra fingers, deformed hands` — helps a little and fails often. The reliable approaches remove the difficulty rather than negotiating with it.

**Give the hands a job.** A hand holding a specific object has a constrained, well-represented pose:

- `holding a ceramic mug with both hands`
- `one hand resting on a door frame`
- `hands in coat pockets`
- `adjusting a shirt cuff`
- `holding a cigarette`
- `arms crossed`
- `hands clasped behind the back`

`Hands in pockets` is the single most effective portrait fix available. It is a natural pose, it reads as relaxed and confident, and it removes the fingers entirely.

**Crop them out.** `head and shoulders`, `cropped at the chest`, `tight portrait`. Real portrait photographers crop at the chest constantly. Nobody looks at a headshot and asks where the hands went.

**Hide them in the composition.** Behind a table, below the frame edge, in shadow, obscured by the body.

**Simplify the pose.** A flat open palm is easier than a fist; a fist is easier than a gesture; a gesture is easier than interlaced fingers. Two hands interacting with each other is the hardest case in the whole medium — avoid it unless you are prepared to inpaint.

**Fix in post.** For serious work, generate the portrait you want and inpaint the hands separately with a tighter prompt and several attempts. This is standard professional practice, not a defeat.

## Dead eyes

Generated eyes are often technically correct and lifeless. Three causes, three fixes.

**No catchlight.** Real eyes reflect the light source; that small bright spot is what makes an eye look wet and alive. Models often omit it or place it inconsistently between the two eyes.

Fix: `bright catchlight in both eyes from a large softbox camera left`. Naming the source shape and position also gets you consistent catchlights, which is the detail people notice without knowing they noticed it.

**Mismatched gaze.** The two eyes converge on slightly different points, which reads as subtly wrong.

Fix: state the focus explicitly. `looking directly into the lens`, `gaze focused on something just off camera left`, `eyes downcast, reading`. A specified target is more likely to produce convergence than an unspecified one.

**Excessive symmetry and clarity.** Real irises are irregular and slightly asymmetric between eyes.

Fix: `irregular iris texture, visible limbal ring, slight asymmetry between the eyes, natural redness in the corner`.

## Plastic skin

The waxy, poreless, airbrushed surface is the most recognisable AI tell in portraiture. It comes from two sources: training data heavy with retouched commercial photography, and, in Midjourney, an aesthetic default that smooths.

**Ask for texture explicitly:**

- `visible skin pores`
- `fine facial hair, peach fuzz catching the light`
- `subsurface scattering, light passing through the ear`
- `natural skin oil, slight shine on the forehead and nose`
- `freckles, uneven pigmentation`
- `fine lines around the eyes`
- `a blemish on the cheek`
- `sun damage on the shoulders`

**Ask for imperfection:** `unretouched`, `no makeup`, `natural skin, not smoothed`, `documentary portrait`.

**Use film language.** `Kodak Portra 400, visible grain` puts a grain structure over the whole image, which breaks up the plastic smoothness at a level below the skin itself. Film stock vocabulary is covered in [camera and lens terms](/blog/camera-and-lens-terms-for-ai-prompts).

**Lower the aesthetic pressure.** In Midjourney, `--style raw --stylize 50` reduces the automatic beautification substantially. This alone fixes a large share of plastic-skin complaints.

**Put `plastic skin, airbrushed, retouched, smooth skin` in the negative prompt** if you are on Stable Diffusion.

## The same-face problem

Every generated portrait tends toward the same person: symmetrical, mid-twenties, conventionally attractive, ethnically ambiguous. That is the mean of the training distribution, and unprompted generation lands near the mean.

The fix is to specify away from it, deliberately.

**Age precisely.** Not `old` but `a man in his late sixties, deep nasolabial folds, thinning hair at the crown, age spots on the temple`.

**Asymmetry.** Real faces are asymmetric. `a slightly crooked nose, one eyebrow higher than the other, an old scar through the left eyebrow`.

**Distinctive features.** `a gap between the front teeth`, `a broken nose set badly`, `heavy brow`, `a wide jaw`, `sharply receding hairline`, `one ear that sticks out`.

**Unremarkable people.** `an ordinary-looking woman`, `plain features`, `tired`, `not conventionally attractive` — these push against the beauty prior, and they are what makes a portrait read as documentary rather than as advertising.

**Expression beyond smiling.** `mid-sentence`, `about to laugh`, `sceptical`, `distracted, looking past the camera`, `caught blinking`. The neutral pleasant expression is another artefact of the mean.

These same specific features are what make a character reproducible across images, which is why the [character consistency guide](/blog/consistent-characters-across-ai-images) leans on the same technique.

## Lighting a portrait

Lighting decides more of a portrait's quality than any other clause. The named setups — Rembrandt, split, loop, butterfly, clamshell — are all well understood by models and covered in [lighting terms for AI prompts](/blog/lighting-terms-for-ai-prompts).

Two portrait-specific notes:

**Hard light is underused.** Almost every generated portrait is softly lit, because soft light is flattering and the training data is full of it. `hard light from a bare bulb, sharp shadow edges, deep shadow on one side` immediately looks less generic.

**Say `as the only light source`.** Models add fill light unprompted, which flattens everything. Stating a single source is often necessary to get real shadow.

## A complete portrait prompt

```
A woman in her late fifties, weathered skin, deep lines around the eyes,
grey hair pulled back loosely, a small scar through the left eyebrow,
sceptical expression, mid-sentence,
hands in the pockets of a canvas work jacket,
standing in a workshop doorway,
hard afternoon light from camera left as the only source,
deep shadow on the right side of the face, bright catchlight in both eyes,
visible skin pores, unretouched, no makeup,
85mm, f/2.8, Kodak Portra 400, visible grain, documentary portrait
```

Long, but every clause is doing a job: identity specifics defeat the average face, hands are removed from the problem, the light is decided and singular, the skin is textured, the film stock breaks up smoothness.

## Ethics worth pausing on

Two boundaries are worth being explicit about.

**Real people.** Generating photorealistic images of identifiable real people, particularly in situations they were never in, causes genuine harm and violates most tools' terms of service. Public figures are not an exception in any way that matters.

**Disclosure.** Where a generated portrait could be mistaken for a photograph of a real person — in editorial contexts, on a product page, in anything that carries an implicit claim of documentary truth — say that it is generated. The practice costs nothing and is rapidly becoming an expectation rather than a courtesy.

## Common questions

### Why do generated hands still fail even with a negative prompt?

Because negative prompts steer away from a concept; they do not teach anatomy. `deformed hands` in a negative field slightly reduces the probability of the worst outcomes, but the model's underlying uncertainty about finger count and joint structure is unchanged. Removing hands from the composition — pockets, crossed arms, a cropped frame — sidesteps the uncertainty entirely, which is why it works where negation does not.

### How do I get an older face without it looking like a caricature?

Specify the mechanisms of ageing rather than the word "old". Skin behaves in describable ways: `deep nasolabial folds`, `thinning hair at the crown`, `age spots on the temples`, `slightly hooded eyelids`, `loose skin at the jaw`. Asking for "an old man" tends to produce a stereotype because the mean of that description in training data is itself a stereotype.

### Why does the same prompt give me a different-looking person each time?

Because the seed changes. Face identity is one of the things most sensitive to the initial noise field, so an unfixed seed will produce a different person on every run even with an identical prompt. Fix the seed for a stable face, and see [character consistency](/blog/consistent-characters-across-ai-images) for approaches that survive across scenes.

### Can I make a portrait look like an ordinary snapshot rather than a studio shot?

Yes, and it takes deliberate work because the training data skews heavily toward polished imagery. The combination that gets there: `direct on-camera flash`, `snapshot`, `slightly awkward framing`, a plain focal length like 35mm, and — in Midjourney — `--style raw --stylize 50`. Remove every word suggesting production value; the temptation to add "professional photography" is the thing that keeps ruining it.
