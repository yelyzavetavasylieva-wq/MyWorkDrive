import React from 'react';

// Figma: UI kit → Page header. Implemented as `.page-header` in components.css,
// shown at the top of the Shares screen (SharesPage `.page-header`).
const meta = {
  title: 'Design System/Page header',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

export const WithAction = {
  render: () => (
    <header className="page-header" style={{ maxWidth: 720 }}>
      <div className="page-header__text">
        <h1 className="t-display-xs-semibold page-header__title">Shares</h1>
        <p className="t-md-regular page-header__subtitle">
          Manage and configure server file shares and user access.
        </p>
      </div>
      <div className="page-header__actions">
        <button type="button" className="btn btn--primary">Add new share</button>
      </div>
    </header>
  ),
};

export const TitleOnly = {
  render: () => (
    <header className="page-header" style={{ maxWidth: 720 }}>
      <div className="page-header__text">
        <h1 className="t-display-xs-semibold page-header__title">Settings</h1>
        <p className="t-md-regular page-header__subtitle">
          Configure global options for your MyWorkDrive server.
        </p>
      </div>
    </header>
  ),
};
