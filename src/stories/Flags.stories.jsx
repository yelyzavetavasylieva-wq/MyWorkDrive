import React from 'react';
import * as Flags from '../ui/Flags.jsx';

const meta = {
  title: 'Foundations/Flags',
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'National flags used by the language switcher, rendered at the 20×15 footprint.' } },
  },
  tags: ['autodocs'],
};
export default meta;

const entries = Object.entries(Flags).filter(([name, v]) => name.startsWith('Flag') && typeof v === 'function');

export const AllFlags = {
  render: () => (
    <div style={{
      padding: 32, background: 'var(--bg-primary)',
      display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 16,
    }}>
      {entries.map(([name, Flag]) => (
        <div key={name} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: 12, border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)',
        }}>
          <Flag />
          <code style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{name}</code>
        </div>
      ))}
    </div>
  ),
};
