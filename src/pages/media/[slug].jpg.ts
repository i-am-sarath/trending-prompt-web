import type { APIRoute } from 'astro';
import { publishedPrompts } from '../../lib/content';
import { renderDisplay } from '../../lib/images';

export async function getStaticPaths() {
  const prompts = await publishedPrompts();
  return prompts.map((prompt) => ({
    params: { slug: prompt.slug },
    props: { image: prompt.data.image },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const body = await renderDisplay(props.image as string);
  return new Response(new Uint8Array(body), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=604800',
    },
  });
};
