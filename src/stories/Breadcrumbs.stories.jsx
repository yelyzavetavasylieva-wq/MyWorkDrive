import React from 'react';

// Figma: UI kit → Breadcrumbs. Implemented as `.breadcrumbs` in wizard.css,
// shown at the top of the Add new share wizard.
const meta = {
  title: 'Design System/Breadcrumbs',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

export const Default = {
  render: () => (
    <nav className="breadcrumbs t-md-regular" aria-label="Breadcrumb">
      <a href="#" className="breadcrumbs__link breadcrumbs__link--muted" onClick={(e) => e.preventDefault()}>Shares</a>
      <span className="breadcrumbs__sep">›</span>
      <span className="breadcrumbs__link">Add new share</span>
    </nav>
  ),
};
