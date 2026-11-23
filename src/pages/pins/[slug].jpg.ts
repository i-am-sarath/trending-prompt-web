import type { APIRoute } from 'astro';
import { publishedPrompts, usesGeneratedPin } from '../../lib/content';
import { renderPin } from '../../lib/images';

export async function getStaticPaths() {
  const prompts = await publishedPrompts();
  return prompts
    .filter((prompt) => usesGeneratedPin(prompt.data))
    .map((prompt) => ({
      params: { slug: prompt.slug },
      props: { image: prompt.data.image },
    }));
}

export const GET: APIRoute = async ({ props }) => {
  const body = await renderPin(props.image as string);
  return new Response(new Uint8Array(body), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=604800',
    },
  });
};
