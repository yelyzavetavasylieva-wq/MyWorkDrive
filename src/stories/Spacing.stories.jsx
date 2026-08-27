import React from 'react';

// Foundations/Spacing — the spacing scale from the Figma "Spacing" variable
// collection. Semantic tokens (--spacing-*) alias a shared numeric "Spacing"
// primitive scale in Figma (4px unit: Spacing/2 = 8px). Our CSS holds the
// resolved px on the semantic token (there is no primitive layer in code), so
// the primitive index shown here is derived from the value (index = px ÷ 4),
// exposing the same aliasing the Figma Variables panel shows. Values are read
// live from the --spacing-* tokens — not hardcoded.
const meta = {
  title: 'Foundations/Spacing',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

const SPACING = ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl',
  '5xl', '6xl', '7xl', '8xl', '9xl', '10xl', '11xl'];

function readVar(name) {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
const px = (v) => parseFloat(v) || 0;
const rem = (n) => `${Number((n / 16).toFixed(4))}rem`;
// Figma "Spacing" primitive index — the 4px-unit multiplier (Spacing/2 = 8px).
const primitive = (n) => `Spacing/${Number((n / 4).toFixed(2))}`;

function Row({ token }) {
  const n = px(readVar(`--spacing-${token}`));
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '150px 150px 130px 1fr', alignItems: 'center', gap: 20, padding: '10px 0', borderTop: '1px solid var(--border-secondary)' }}>
      <code style={{ fontFamily: 'var(--font-data)', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
        spacing-{token}
      </code>
      <span style={{ fontFamily: 'var(--font-data)', fontSize: 12, color: 'var(--text-quaternary)' }}>
        → {primitive(n)}
      </span>
      <span style={{ fontSize: 13, color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
        {n}px · {rem(n)}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
        <div style={{ width: n, height: 16, background: 'var(--bg-brand-solid)', borderRadius: 2, flex: '0 0 auto' }} />
      </div>
    </div>
  );
}

export const Scale = {
  render: () => (
    <div style={{ padding: 32, background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <header style={{ marginBottom: 32, maxWidth: 760 }}>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 600, color: 'var(--text-primary)' }}>Spacing</h2>
        <p style={{ margin: '6px 0 0', fontSize: 15, lineHeight: 1.5, color: 'var(--text-tertiary)' }}>
          Spacing tokens, drawn as a bar at their literal pixel width so the scale is comparable step to
          step. Each semantic token aliases the Figma <code>Spacing</code> primitive scale
          (name → primitive → value); values read from the <code>--spacing-*</code> tokens.
        </p>
      </header>
      <div>
        {SPACING.map((t) => <Row key={t} token={t} />)}
      </div>
    </div>
  ),
};
