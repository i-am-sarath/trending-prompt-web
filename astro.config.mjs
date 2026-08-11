import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://trendingprompt.org',
  build: { format: 'directory' },
  markdown: {
    // Off deliberately: smartypants rewrites `--` as an en dash, which mangles
    // every Midjourney flag (--ar, --stylize, --no) in the guides. Correct
    // parameter names matter more here than curly quotes.
    smartypants: false,
    // Shiki ships a dark theme by default, which fights the light palette.
    // Code blocks here are prompt text, not code, so plain <pre> styled by
    // global.css is both correct and lighter.
    syntaxHighlight: false,
  },
});
