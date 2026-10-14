import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import sharp from 'sharp';
import { profile } from '../data/profile';

/** Every page that has a social card. The key is the image path: /og/<key>.png */
export const ogCards = {
  home: { heading: profile.name, subheading: `${profile.title}, ${profile.employer.name}`, label: profile.tagline },
  resume: { heading: 'Résumé', subheading: profile.name, label: `${profile.title}, ${profile.employer.name}` },
} as const;
export type OgCard = keyof typeof ogCards;

const WIDTH = 1200;
const HEIGHT = 630;
const root = process.cwd();

// Satori reads TTF/OTF/WOFF (not WOFF2); @fontsource ships WOFF alongside.
const fonts = Promise.all(
  ([400, 700] as const).map(async (weight) => ({
    name: 'Inter',
    weight,
    style: 'normal' as const,
    data: await readFile(join(root, `node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff`)),
  })),
);

const avatar = sharp(join(root, 'src/assets/avatar.png'))
  .resize(300, 300)
  .png()
  .toBuffer()
  .then((png) => `data:image/png;base64,${png.toString('base64')}`);

interface Node {
  type: string;
  props: Record<string, unknown> & { style?: Record<string, string | number>; children?: Node | string | (Node | string)[] };
}
const div = (style: Record<string, string | number>, children: NonNullable<Node['props']['children']>): Node => ({
  type: 'div',
  props: { style: { display: 'flex', ...style }, children },
});

export async function renderOgCard(card: OgCard): Promise<Uint8Array<ArrayBuffer>> {
  const { heading, subheading, label } = ogCards[card];
  const tree = div(
    {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0d1117 0%, #13233a 100%)',
      color: '#e6edf3',
      fontFamily: 'Inter',
      padding: '72px',
      alignItems: 'center',
      gap: '64px',
    },
    [
      { type: 'img', props: { src: await avatar, width: 300, height: 300, style: { borderRadius: '50%' } } },
      div({ flexDirection: 'column', gap: '18px', flex: 1 }, [
        div({ fontSize: 30, color: '#6cb6ff', fontWeight: 700, letterSpacing: '0.04em' }, 'WOOLEY.DEV'),
        div({ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }, heading),
        div({ fontSize: 36, color: '#c9d1d9' }, subheading),
        div({ fontSize: 28, color: '#9da7b3', marginTop: '12px' }, label),
      ]),
    ],
  );
  const svg = await satori(tree as Parameters<typeof satori>[0], { width: WIDTH, height: HEIGHT, fonts: await fonts });
  // Copy into a plain ArrayBuffer-backed array: a Node Buffer isn't a valid Response body type.
  return new Uint8Array(new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng());
}
