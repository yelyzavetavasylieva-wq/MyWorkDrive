import React from 'react';
import { IconShares } from '../ui/icons.jsx';

// Figma: UI kit → Color usage. Shows the semantic color tokens applied in
// context (text, surfaces, borders, icon foregrounds) rather than as bare
// swatches (that is the Foundations/Colors palette).
const meta = {
  title: 'Foundations/Color usage',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

const TEXT = [
  '--text-primary', '--text-primary-2', '--text-secondary', '--text-secondary-hover',
  '--text-tertiary', '--text-tertiary-2', '--text-quaternary', '--text-placeholder', '--text-brand-link',
];
const SURFACES = [
  '--bg-primary', '--bg-secondary', '--bg-tertiary', '--bg-active',
  '--bg-primary-hover', '--bg-error-secondary',
];
const BORDERS = ['--border-primary', '--border-primary-2', '--border-secondary', '--border-card', '--border-tertiary'];
const FGS = ['--fg-brand', '--fg-secondary', '--fg-tertiary', '--fg-quaternary', '--fg-quinary', '--fg-error', '--fg-warning'];

const Section = ({ title, children }) => (
  <section style={{ marginBottom: 40 }}>
    <h3 className="t-lg-semibold" style={{ marginBottom: 16, color: 'var(--text-primary)' }}>{title}</h3>
    {children}
  </section>
);

export const Usage = {
  render: () => (
    <div style={{ padding: 32, background: 'var(--bg-primary)' }}>
      <Section title="Text on surface">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {TEXT.map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span style={{ fontSize: 16, color: `var(${t})` }}>The quick brown fox jumps over the lazy dog</span>
              <code style={{ fontSize: 12, color: 'var(--text-quaternary)' }}>{t}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Surfaces">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
          {SURFACES.map((t) => (
            <div key={t} style={{ background: `var(${t})`, border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 20, minHeight: 72 }}>
              <code style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{t}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Borders">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
          {BORDERS.map((t) => (
            <div key={t} style={{ background: 'var(--bg-primary)', border: `2px solid var(${t})`, borderRadius: 'var(--radius-md)', padding: 20, minHeight: 60 }}>
              <code style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{t}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Icon foreground">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {FGS.map((t) => (
            <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span className="icon-box icon-24" style={{ color: `var(${t})` }}><IconShares /></span>
              <code style={{ fontSize: 12, color: 'var(--text-quaternary)' }}>{t}</code>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};
