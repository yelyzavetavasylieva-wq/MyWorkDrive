import React, { useState } from 'react';

// Figma: UI kit → Chip. Implemented as `.chip` / `.chip--active` in wizard.css,
// used as the All / Users / Groups filter in the Add Users & Groups modal.
const meta = {
  title: 'Design System/Chip',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

export const Static = {
  render: () => (
    <div className="chip-group">
      <button type="button" className="chip chip--active">All</button>
      <button type="button" className="chip">Users</button>
      <button type="button" className="chip">Groups</button>
    </div>
  ),
};

export const Interactive = {
  render: () => {
    const [active, setActive] = useState('all');
    return (
      <div className="chip-group">
        {[['all', 'All'], ['user', 'Users'], ['group', 'Groups']].map(([k, lbl]) => (
          <button key={k} type="button" className={'chip' + (active === k ? ' chip--active' : '')} onClick={() => setActive(k)}>{lbl}</button>
        ))}
      </div>
    );
  },
};
