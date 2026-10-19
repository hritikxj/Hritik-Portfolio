import { ImageResponse } from 'next/og';

export const alt = 'Hritik Jasnani — Brand identity, illustration and digital experiences';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 70, background: '#FAFAF8', color: '#111110' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22 }}>
        <span>PORTFOLIO</span><span>India · Working globally</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 90, letterSpacing: -4 }}>Hritik Jasnani</span>
        <span style={{ fontSize: 42, color: '#C0392B', marginTop: 12 }}>Multidisciplinary designer</span>
      </div>
      <div style={{ display: 'flex', borderTop: '1px solid #D9D6D0', paddingTop: 24, fontSize: 23 }}>Brand identity · Illustration · Digital experiences</div>
    </div>,
    size,
  );
}
