import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'GMED Agency - Medical Concierge Service';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f5f0e8 0%, #e8e0d4 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              color: '#1a1a1a',
              textAlign: 'center',
            }}
          >
            GMED Agency
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#666666',
              textAlign: 'center',
            }}
          >
            Medical Concierge Service
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#888888',
              textAlign: 'center',
            }}
          >
            Premium Healthcare in Germany
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
