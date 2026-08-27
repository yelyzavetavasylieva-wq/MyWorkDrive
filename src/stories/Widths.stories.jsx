import React from 'react';

// Foundations/Widths — the max-width / container-width scale from the Figma
// "Widths" variable collection (these constrain container/paragraph width;
// they are NOT border widths). Like Spacing, each token aliases the shared
// Figma "Spacing" primitive scale (index = px ÷ 4), shown alongside the value.
// Values run up to 1920px, so bars are scaled proportionally to width-6xl
// (the largest = full bar) rather than rendered 1:1. Values are read live from
// the --width-* / --paragraph-max-width tokens — not hardcoded.
const meta = {
  title: 'Foundations/Widths',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

const WIDTHS = [
  { label: 'width-xxs', var: '--width-xxs' },
  { label: 'width-xs', var: '--width-xs' },
  { label: 'width-sm', var: '--width-sm' },
  { label: 'width-md', var: '--width-md' },
  { label: 'width-lg', var: '--width-lg' },
  { label: 'width-xl', var: '--width-xl' },
  { label: 'width-2xl', var: '--width-2xl' },
  { label: 'width-3xl', var: '--width-3xl' },
  { label: 'width-4xl', var: '--width-4xl' },
  { label: 'width-5xl', var: '--width-5xl' },
  { label: 'width-6xl', var: '--width-6xl' },
  { label: 'paragraph-max-width', var: '--paragraph-max-width' },
];

function readVar(name) {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
const px = (v) => parseFloat(v) || 0;
const rem = (n) => `${Number((n / 16).toFixed(4))}rem`;
const primitive = (n) => `Spacing/${Number((n / 4).toFixed(2))}`;

function Row({ item, max }) {
  const n = px(readVar(item.var));
  const pct = max ? (n / max) * 100 : 0;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '190px 150px 150px 1fr', alignItems: 'center', gap: 20, padding: '12px 0', borderTop: '1px solid var(--border-secondary)' }}>
      <code style={{ fontFamily: 'var(--font-data)', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
        {item.label}
      </code>
      <span style={{ fontFamily: 'var(--font-data)', fontSize: 12, color: 'var(--text-quaternary)' }}>
        → {primitive(n)}
      </span>
      <span style={{ fontSize: 13, color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
        {n}px · {rem(n)}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        <div style={{ flex: 1, height: 14, background: 'var(--bg-secondary)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: 'var(--bg-brand-solid)', borderRadius: 3 }} />
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-quaternary)', width: 52, textAlign: 'right', flex: '0 0 auto' }}>{n}px</span>
      </div>
    </div>
  );
}

export const Scale = {
  render: () => {
    const max = px(readVar('--width-6xl')) || 1920;
    return (
      <div style={{ padding: 32, background: 'var(--bg-primary)', minHeight: '100vh' }}>
        <header style={{ marginBottom: 32, maxWidth: 760 }}>
          <h2 style={{ margin: 0, fontSize: 30, fontWeight: 600, color: 'var(--text-primary)' }}>Widths</h2>
          <p style={{ margin: '6px 0 0', fontSize: 15, lineHeight: 1.5, color: 'var(--text-tertiary)' }}>
            Max-width / container-width tokens (not border widths). Bars are scaled proportionally to
            <code> width-6xl</code> (1920px = full bar), with the actual px labeled. Each token aliases the
            Figma <code>Spacing</code> primitive scale; values read from the <code>--width-*</code> tokens.
          </p>
        </header>
        <div>
          {WIDTHS.map((item) => <Row key={item.label} item={item} max={max} />)}
        </div>
      </div>
    );
  },
};
