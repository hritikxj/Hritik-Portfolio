import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Hritik Jasnani, Brand identity, illustration and digital experiences';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Rice paper and Ink, set in Switzer like the site.
export default async function OpenGraphImage() {
  const [regular, semibold] = await Promise.all([
    readFile(join(process.cwd(), 'src/fonts/og/switzer-400.woff')),
    readFile(join(process.cwd(), 'src/fonts/og/switzer-600.woff')),
  ]);

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 70, background: '#F5F6F3', color: '#1A1A1A', fontFamily: 'Switzer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#5A5C5F' }}>
        <span>Portfolio</span><span>India · Working globally</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 104, fontWeight: 600, letterSpacing: 1, lineHeight: 1 }}>Hritik Jasnani</span>
        <span style={{ fontSize: 44, color: '#5A5C5F', marginTop: 18 }}>Multidisciplinary designer</span>
      </div>
      <div style={{ display: 'flex', borderTop: '1px solid rgba(26,26,26,0.15)', paddingTop: 24, fontSize: 23 }}>Brand identity · Illustration · UI/UX · Apps I build</div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Switzer', data: regular, weight: 400, style: 'normal' },
        { name: 'Switzer', data: semibold, weight: 600, style: 'normal' },
      ],
    },
  );
}
