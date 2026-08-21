import React from 'react';

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

const GROUPS = [
  {
    name: 'Text',
    tokens: ['--text-primary', '--text-primary-2', '--text-secondary', '--text-secondary-hover',
      '--text-tertiary', '--text-tertiary-2', '--text-quaternary', '--text-placeholder',
      '--text-brand-link', '--text-white'],
  },
  {
    name: 'Background',
    tokens: ['--bg-primary', '--bg-secondary', '--bg-tertiary', '--bg-active', '--bg-primary-hover',
      '--bg-error-secondary', '--bg-error-solid', '--bg-brand-solid', '--bg-overlay'],
  },
  {
    name: 'Border',
    tokens: ['--border-primary', '--border-primary-2', '--border-secondary', '--border-card', '--border-tertiary'],
  },
  {
    name: 'Foreground (icons)',
    tokens: ['--fg-brand', '--fg-secondary', '--fg-tertiary', '--fg-quaternary', '--fg-quinary',
      '--fg-error', '--fg-warning', '--brand-200'],
  },
];

function Swatch({ token }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        height: 64, borderRadius: 'var(--radius-md)', background: `var(${token})`,
        border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-xs)',
      }} />
      <code style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{token}</code>
    </div>
  );
}

export const Palette = {
  render: () => (
    <div style={{ padding: 32, background: 'var(--bg-primary)' }}>
      {GROUPS.map((g) => (
        <section key={g.name} style={{ marginBottom: 40 }}>
          <h3 className="t-lg-semibold" style={{ marginBottom: 16, color: 'var(--text-primary)' }}>{g.name}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 20 }}>
            {g.tokens.map((t) => <Swatch key={t} token={t} />)}
          </div>
        </section>
      ))}
    </div>
  ),
};
