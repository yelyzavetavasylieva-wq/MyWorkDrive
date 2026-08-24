import React, { useState } from 'react';

// Figma: UI kit → Tabs (_Tab button base, Horizontal tabs, Vertical tabs).
// Underline tabs: active tab uses brand text + a 2px brand underline; the
// vertical variant swaps the underline for a left-border indicator.
const meta = {
  title: 'Design System/Tabs',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

const TABS = ['My details', 'Profile', 'Password', 'Notifications'];

export const Horizontal = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <div className="tabs" role="tablist">
        {TABS.map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={'tab' + (active === i ? ' tab--active' : '')}
            onClick={() => setActive(i)}
          >
            {label}
          </button>
        ))}
      </div>
    );
  },
};

export const Vertical = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <div className="tabs tabs--vertical" role="tablist" style={{ width: 200 }}>
        {TABS.map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={'tab' + (active === i ? ' tab--active' : '')}
            onClick={() => setActive(i)}
          >
            {label}
          </button>
        ))}
      </div>
    );
  },
};
