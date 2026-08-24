import React from 'react';
import { IconDismiss } from '../ui/icons.jsx';

// Figma: UI kit → Tag. A small pill, optionally removable via a trailing close
// button. Implemented as `.tag` in components.css.
const meta = {
  title: 'Design System/Tag',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

export const Default = {
  render: () => <span className="tag">Tag</span>,
};

export const Removable = {
  render: () => (
    <span className="tag">
      Tag
      <button type="button" className="tag__close" aria-label="Remove tag">
        <span className="icon-box"><IconDismiss width="12" height="12" /></span>
      </button>
    </span>
  ),
};

export const Group = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {['Marketing', 'Design', 'Read-only', 'External'].map((t) => (
        <span key={t} className="tag">
          {t}
          <button type="button" className="tag__close" aria-label={`Remove ${t}`}>
            <span className="icon-box"><IconDismiss width="12" height="12" /></span>
          </button>
        </span>
      ))}
    </div>
  ),
};
