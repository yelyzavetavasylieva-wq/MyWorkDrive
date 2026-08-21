import React from 'react';

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

const STYLES = [
  { cls: 't-display-xs-semibold', use: 'Page & step titles' },
  { cls: 't-lg-semibold', use: 'Section headings' },
  { cls: 't-md-semibold', use: 'Card titles, emphasis' },
  { cls: 't-md-regular', use: 'Body copy, inputs' },
  { cls: 't-sm-semibold', use: 'Labels, active page' },
  { cls: 't-sm-regular', use: 'Secondary text, hints' },
  { cls: 't-xs-semibold', use: 'Table headers, badges, tooltips' },
];

export const Scale = {
  render: () => (
    <div style={{ padding: 32, background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {STYLES.map((s) => (
        <div key={s.cls} style={{ borderBottom: '1px solid var(--border-secondary)', paddingBottom: 20 }}>
          <div className={s.cls} style={{ color: 'var(--text-primary-2)' }}>
            The quick brown fox jumps over the lazy dog
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 16 }}>
            <code style={{ fontSize: 12, color: 'var(--text-brand-link)' }}>.{s.cls}</code>
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{s.use}</span>
          </div>
        </div>
      ))}
    </div>
  ),
};
