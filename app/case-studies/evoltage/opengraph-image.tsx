import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Evoltage UK — website rebuild. SEO 10 → 80+. Built in 3 days.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          width: '100%',
          height: '100%',
          backgroundColor: '#0a1a14',
          color: '#f5f1eb',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#ff5e00',
            marginBottom: 32,
          }}
        >
          Kicksnare
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 32,
          }}
        >
          A 15/40 failing site rebuilt in 3 days. Now 9/10.
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            lineHeight: 1.5,
            color: '#c0bdb8',
          }}
        >
          Evoltage UK · Trades · Local business
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 60,
            left: 80,
            fontSize: 16,
            color: '#7a9a8e',
          }}
        >
          kicksnare.digital
        </div>
      </div>
    ),
    { ...size },
  );
}
