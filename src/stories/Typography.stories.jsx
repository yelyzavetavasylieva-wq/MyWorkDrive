import React from 'react';

// Foundations/Typography — the type-scale specimen from the Figma UI kit
// (node 27-2904): a font-family header block, then one row per size step with
// Regular / Semibold / Bold columns and size/line-height metrics.
//
// SOURCE-OF-TRUTH NOTE (important):
//   The app's code type source is src/styles/global.css, which defines FLAT
//   combined utility classes (.t-<size>-<weight>, e.g. .t-lg-semibold) — size
//   and weight fused per class — and only a 7-class SUBSET of the design scale
//   (Display xs/Semibold, Text lg/Semibold, Text md/Regular+Semibold,
//   Text sm/Regular+Semibold, Text xs/Semibold). It has no full display scale
//   and no bold. The complete scale below (11 steps × Regular/Semibold/Bold)
//   therefore comes from the Figma design system (node 27-2904), transcribed
//   verbatim from its type tokens — nothing is fabricated. Every step really
//   does define all three weights in Figma. If a real full type-token layer is
//   ever added to code, this page should read the scale from it.
//
//   The font FAMILY is read live from the --font-sans token (not hardcoded).
//   Numeric weights (400/600/700) are the actual CSS weight values, matching
//   the Figma "Font weight" labels.

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

const WEIGHTS = [
  { name: 'Regular', weight: 400 },
  { name: 'Semibold', weight: 600 },
  { name: 'Bold', weight: 700 },
];

// Type scale — Figma node 27-2904. size/lineHeight in px; rem derived at the
// 16px root (see global.css `html/body`).
const SCALE = [
  { name: 'Display 2xl', size: 72, lh: 90 },
  { name: 'Display xl', size: 60, lh: 72 },
  { name: 'Display lg', size: 48, lh: 60 },
  { name: 'Display md', size: 36, lh: 44 },
  { name: 'Display sm', size: 30, lh: 38 },
  { name: 'Display xs', size: 24, lh: 32 },
  { name: 'Text xl', size: 20, lh: 30 },
  { name: 'Text lg', size: 18, lh: 28 },
  { name: 'Text md', size: 16, lh: 24 },
  { name: 'Text sm', size: 14, lh: 20 },
  { name: 'Text xs', size: 12, lh: 18 },
];

const REM_BASE = 16;
const rem = (px) => `${Number((px / REM_BASE).toFixed(4))}rem`;
const metrics = (s) => `Font size: ${s.size}px / ${rem(s.size)}  |  Line height: ${s.lh}px / ${rem(s.lh)}`;

// Character specimen — generated, not a literal blob.
const UPPER = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).join('');
const LOWER = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).join('');
const SYMBOLS = '0123456789 !@#$%^&*()';

// Read the primary family name from the real --font-sans token.
function fontFamilyName() {
  if (typeof window === 'undefined') return 'Segoe UI Variable';
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--font-sans').trim();
  const first = raw.split(',')[0].trim().replace(/^["']|["']$/g, '');
  return first || 'Segoe UI Variable';
}

const SANS = 'var(--font-sans)';

function FamilyHeader({ family }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 48,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginBottom: 48,
        paddingBottom: 40,
        borderBottom: '1px solid var(--border-secondary)',
      }}
    >
      <div style={{ minWidth: 320 }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>
          {family}
        </div>
        <div style={{ fontFamily: SANS, fontSize: 120, lineHeight: 1, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 24 }}>
          Ag
        </div>
        <div style={{ fontFamily: SANS, fontSize: 24, lineHeight: 1.55, color: 'var(--text-secondary)' }}>
          <div>{UPPER}</div>
          <div>{LOWER}</div>
          <div>{SYMBOLS}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {WEIGHTS.map((w) => (
          <div key={w.weight} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontFamily: SANS, fontSize: 36, lineHeight: 1, fontWeight: w.weight, color: 'var(--text-primary)', width: 64 }}>
              Aa
            </span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)' }}>{w.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Font weight: {w.weight}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScaleStep({ step }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border-secondary)', padding: '20px 0 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24, marginBottom: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-tertiary)' }}>{step.name}</span>
        <span style={{ fontSize: 13, color: 'var(--text-quaternary)', whiteSpace: 'nowrap' }}>{metrics(step)}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(420px, 1fr))', gap: 24 }}>
        {WEIGHTS.map((w) => (
          <div
            key={w.weight}
            style={{
              fontFamily: SANS,
              fontSize: step.size,
              lineHeight: `${step.lh}px`,
              fontWeight: w.weight,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
            }}
          >
            <div>{step.name}</div>
            <div>{w.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Scale = {
  render: () => {
    const family = fontFamilyName();
    return (
      <div style={{ padding: 32, background: 'var(--bg-primary)', minHeight: '100vh' }}>
        <header style={{ marginBottom: 40 }}>
          <h2 style={{ margin: 0, fontSize: 30, fontWeight: 600, color: 'var(--text-primary)' }}>Typography</h2>
          <p style={{ margin: '6px 0 0', fontSize: 15, color: 'var(--text-tertiary)' }}>
            Purposeful set of typographic styles.
          </p>
        </header>

        <FamilyHeader family={family} />

        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 1320 }}>
            {SCALE.map((step) => (
              <ScaleStep key={step.name} step={step} />
            ))}
          </div>
        </div>
      </div>
    );
  },
};
