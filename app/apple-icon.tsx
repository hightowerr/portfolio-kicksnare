import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#06372d',
          borderRadius: 36,
        }}
      >
        <svg width="110" height="68" viewBox="0 0 32 20">
          <rect x="0" y="0" width="4" height="20" rx="2" fill="#ff5e00" />
          <rect x="7" y="4" width="4" height="12" rx="2" fill="#f9fefd" />
          <rect x="14" y="2" width="4" height="16" rx="2" fill="#ff5e00" />
          <rect x="21" y="6" width="4" height="8" rx="2" fill="#f9fefd" />
          <rect x="28" y="8" width="4" height="4" rx="2" fill="#f9fefd" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
