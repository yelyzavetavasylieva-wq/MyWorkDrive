import React from 'react';
import * as Icons from '../ui/icons.jsx';

const meta = {
  title: 'Foundations/Icons',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

const entries = Object.entries(Icons).filter(([, v]) => typeof v === 'function');

export const AllIcons = {
  render: () => (
    <div style={{
      padding: 32, background: 'var(--bg-primary)',
      display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12,
    }}>
      {entries.map(([name, Icon]) => (
        <div key={name} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          padding: '18px 12px', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)',
          color: 'var(--fg-secondary)',
        }}>
          <span className="icon-box icon-20" style={{ width: 24, height: 24 }}><Icon /></span>
          <code style={{ fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'center', wordBreak: 'break-word' }}>{name}</code>
        </div>
      ))}
    </div>
  ),
};
