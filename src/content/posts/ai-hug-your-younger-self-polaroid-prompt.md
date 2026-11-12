---
title: "Hug your younger self: the AI Polaroid prompt that actually keeps your face"
description: "How to make the viral AI photo of you hugging your younger self as an instant-film Polaroid — the exact prompt, the two photos you need, and fixes for mismatched faces."
date: 2026-11-12
category: "trends"
tags: ["younger self", "polaroid", "photo editing", "gemini", "chatgpt", "trend"]
author: "The trendingprompt desk"
draft: false
---

The picture of an adult hugging their own childhood self, printed as a faded instant photo, is one of the few AI trends that makes people stop scrolling for an emotional reason rather than a technical one. It is also one of the easiest to get wrong. Most attempts produce a nice photo of a parent and a child who look vaguely related, and the whole point — *that is me, twice* — disappears.

This guide walks through the prompt we use, why it is built the way it is, and what to change when the result does not look like you.

![An adult in a grey hoodie hugging his younger self in a striped t-shirt, shot as a faded instant-film Polaroid](/uploads/polaroid-with-my-younger-self.jpg)

**Copy the full prompt:** [Polaroid With My Younger Self](/prompts/polaroid-with-my-younger-self/)

## What you need before you start

Two photos, not one. This is the single biggest difference between results that work and results that do not.

- **A current photo of you.** Front-facing, face clearly lit, no sunglasses. A plain selfie is fine.
- **A childhood photo of you.** Scan it or photograph it flat with your phone, avoiding glare. Age 4 to 8 works best: old enough to have defined features, young enough to be obviously a child next to you.

If you only upload a current photo and ask the model to "imagine me as a child", it will invent a generic kid with your hair colour. With a real childhood reference, the job changes from *invent* to *combine*, and current image models are far better at combining.

## The prompt, section by section

The full text is on the [prompt page](/prompts/polaroid-with-my-younger-self/), but each section has a job worth understanding.

### The header names both references

`USE BOTH UPLOADED PHOTOS AS SUBJECT REFERENCES (ONE CURRENT PHOTO, ONE CHILDHOOD PHOTO)` sits at the very top, in capitals. Models weight the start of a prompt heavily, and telling them up front which image is which stops them merging both faces into one.

### Subject and pose

The adult kneels to the child's height with an arm around the child's shoulders, and both look at the camera. A simple, readable pose matters because hands are still where image models struggle most. One arm around the shoulders is easy to draw; two people with interlaced fingers is not.

### Styling from each reference

The quiet clause that makes the picture work: *keep each version's clothing true to their own reference photo*. If you let the model choose, it dresses both people in the same palette and the image reads as a family photo from one afternoon. Keep the clothes from different decades and the picture reads as two moments in time.

### Instant-film character

Square frame, white border with a thicker bottom edge, a direct on-camera flash, faded colours and faint light leaks. These details belong to a very specific kind of family snapshot, and that association does most of the emotional work. It also hides small rendering imperfections — a slightly soft hand looks like flash falloff rather than an AI mistake.

## ChatGPT or Gemini?

Both accept two reference images and both can produce this look. The example above was made in Gemini. The tools fail in different ways, so if one keeps drifting on the faces or the border, run the same prompt in the other before rewriting anything.

## Fixes for the common failures

**The child does not look like you.** Upload a clearer childhood photo, and add this line under the header: `The child must match the facial features of the childhood photo exactly: eye shape, nose, ears and hairline.`

**The adult looks like a different person.** Use a current photo where your face fills more of the frame. Group photos and distant shots give the model too few pixels to work with.

**Both faces look identical in age.** Add the ages explicitly: `the adult is about 28 years old, the child is about 6`.

**Text appears on the border.** Models love writing dates and names in the bottom margin, usually misspelled. Keep `Avoid any text written on the border` in the prompt, and if it still appears, crop or retouch it — an empty border looks more real than a wrong date.

**The image looks too clean.** Increase the film character: `strong chemical vignetting, visible grain, colour shift toward warm magenta, slight blur from the flash`.

## Variations worth trying

- **Swap the hug for sitting side by side** on the floor if hands keep failing.
- **Change the era of the film**: a 1990s 35mm drugstore print with an orange date stamp in the corner works just as well as instant film.
- **Add a parent or sibling** from the same old photo for a "then and now" family picture — expect more drift with every extra face.

## Is it safe to upload childhood photos?

Treat it like any other personal photo. Read the tool's data and training settings, turn off training on your content where the option exists, and avoid uploading photos of other children without their parents' permission. For more on rights and reuse, see our guide to [AI image copyright and commercial use](/blog/ai-image-copyright-and-commercial-use/).

## FAQ

**What is the "hug your younger self" AI trend?**
A photo, usually in a Polaroid or instant-film style, showing a person today hugging themselves as a child. It is made by uploading a current photo and a childhood photo to an image model with a prompt that combines them.

**Can I do it with one photo?**
You can, but the child will not really look like you. Two photos gives much better results.

**Which AI app is best for it?**
Gemini and ChatGPT both work well. Use the [full prompt](/prompts/polaroid-with-my-younger-self/) in either and switch tools if the faces drift.

For more styles that start from one of your own photos, browse the [portrait prompts](/category/portrait/) or the new [90s yearbook prompt](/blog/ai-90s-yearbook-photo-prompt/).
