import React from 'react';

// Foundations/Radius — the corner-radius scale from the Figma "Radius"
// variable collection. Values are read live from the --radius-* CSS custom
// properties in src/styles/tokens.css (the real token source); nothing is
// hardcoded here. Radius is a single flat scale with no primitive-aliasing
// layer, so each row shows name → value directly.
const meta = {
  title: 'Foundations/Radius',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

// Scale order (names only); values come from the CSS tokens.
const RADIUS = ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'];

function readVar(name) {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
const px = (v) => parseFloat(v) || 0;
const rem = (n) => `${Number((n / 16).toFixed(4))}rem`;

function Row({ token }) {
  const value = readVar(`--radius-${token}`);
  const n = px(value);
  const isFull = n >= 9999;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '96px 160px 1fr', alignItems: 'center', gap: 24, padding: '14px 0', borderTop: '1px solid var(--border-secondary)' }}>
      {/* swatch with the actual radius applied */}
      <div
        style={{
          width: 72, height: 72,
          background: 'var(--bg-secondary)',
          border: '1.5px solid var(--brand-300, #76afff)',
          borderTopLeftRadius: `var(--radius-${token})`,
          borderTopRightRadius: `var(--radius-${token})`,
          borderBottomRightRadius: `var(--radius-${token})`,
          // leave one corner square so the curve is unmistakable, except for full
          borderBottomLeftRadius: isFull ? `var(--radius-${token})` : 0,
        }}
      />
      <code style={{ fontFamily: 'var(--font-data)', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
        radius-{token}
      </code>
      <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>
        {isFull ? `${n}px · pill (fully rounded)` : `${n}px · ${rem(n)}`}
      </span>
    </div>
  );
}

export const Scale = {
  render: () => (
    <div style={{ padding: 32, background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <header style={{ marginBottom: 32, maxWidth: 720 }}>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 600, color: 'var(--text-primary)' }}>Radius</h2>
        <p style={{ margin: '6px 0 0', fontSize: 15, lineHeight: 1.5, color: 'var(--text-tertiary)' }}>
          Corner-radius tokens. One corner is left square so the applied curve is visible; values read
          from the <code>--radius-*</code> tokens. <code>radius-full</code> renders as a pill/circle.
        </p>
      </header>
      <div style={{ maxWidth: 640 }}>
        {RADIUS.map((t) => <Row key={t} token={t} />)}
      </div>
    </div>
  ),
};
