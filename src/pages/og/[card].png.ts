import type { APIRoute, GetStaticPaths } from 'astro';
import { ogCards, renderOgCard, type OgCard } from '../../lib/og';

export const getStaticPaths = (() =>
  (Object.keys(ogCards) as OgCard[]).map((card) => ({ params: { card } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const png = await renderOgCard(params['card'] as OgCard);
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
