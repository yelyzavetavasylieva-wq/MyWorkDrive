import React from 'react';
import * as Logos from '../ui/logos.jsx';

const meta = {
  title: 'Foundations/Storage logos',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

const entries = Object.entries(Logos).filter(([, v]) => typeof v === 'function');

export const AllLogos = {
  render: () => (
    <div style={{
      padding: 32, background: 'var(--bg-primary)',
      display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16,
    }}>
      {entries.map(([name, Logo]) => (
        <div key={name} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: 16, border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)',
        }}>
          <span className="icon-box" style={{ width: 32, height: 32 }}><Logo /></span>
          <code style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{name}</code>
        </div>
      ))}
    </div>
  ),
};
