import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Skylife Research - Quantitative Trading & Network Analysis';
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
          background: 'linear-gradient(135deg, #0A192F 0%, #1E293B 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="16" y="16" width="6" height="6" rx="1" fill="#06B6D4" />
            <rect x="2" y="16" width="6" height="6" rx="1" fill="#06B6D4" />
            <rect x="9" y="2" width="6" height="6" rx="1" fill="#06B6D4" />
            <path
              d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"
              stroke="#06B6D4"
              strokeWidth="2"
            />
            <path d="M12 12V8" stroke="#06B6D4" strokeWidth="2" />
          </svg>
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
            }}
          >
            SKYLIFE <span style={{ color: '#94A3B8', fontWeight: 300 }}>RESEARCH</span>
          </h1>
        </div>
        <p
          style={{
            fontSize: '36px',
            color: '#06B6D4',
            margin: 0,
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          Trade the Hidden Network
        </p>
        <p
          style={{
            fontSize: '24px',
            color: '#94A3B8',
            margin: '20px 0 0 0',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          Advanced Graph Theory & Community Detection for Indian Stock Market
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
