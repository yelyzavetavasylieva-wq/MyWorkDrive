import React, { useState } from 'react';
import { LogoOneDrive } from '../ui/logos.jsx';
import Toggle from '../ui/Toggle.jsx';

// Figma: UI kit → Integration card. A connector tile with logo, title,
// description, an enable toggle and footer actions. Connected shows
// "Edit connection" + "Disconnect"; disconnected shows "Connect".
// Implemented as `.integration-card` in components.css.
const meta = {
  title: 'Design System/Integration card',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

const DESC = 'Cloud-based file storage by Microsoft for personal and team files. Access and collaborate on content from anywhere.';

function IntegrationCard({ connected: initial }) {
  const [connected, setConnected] = useState(initial);
  return (
    <div className="integration-card">
      <div className="integration-card__body">
        <div className="integration-card__head">
          <span className="icon-box icon-24 integration-card__logo"><LogoOneDrive /></span>
          <span className="integration-card__title">OneDrive</span>
          <Toggle checked={connected} onChange={setConnected} ariaLabel="Enable OneDrive" />
        </div>
        <p className="integration-card__desc">{DESC}</p>
      </div>
      <div className="integration-card__footer">
        {connected ? (
          <>
            <button type="button" className="btn btn--secondary btn--sm">Edit connection</button>
            <button type="button" className="integration-card__link">Disconnect</button>
          </>
        ) : (
          <button type="button" className="btn btn--secondary btn--sm">Connect</button>
        )}
      </div>
    </div>
  );
}

export const Connected = {
  render: () => <IntegrationCard connected />,
};

export const Disconnected = {
  render: () => <IntegrationCard connected={false} />,
};
