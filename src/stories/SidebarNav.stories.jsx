import React, { useState } from 'react';
import {
  IconShares, IconSettings, IconIntegrations, IconClustering,
  IconDevices, IconPublicSharing, IconUserActivity, IconHealth, IconSearch,
} from '../ui/icons.jsx';

// Figma: UI kit → Sidebar navigation (_Nav item base). Implemented as
// `.sidebar__nav` / `.nav-item` in layout.css, used by the app shell (Sidebar).
// Rendered here as static markup (no router) so the nav item states are visible.
const meta = {
  title: 'Design System/Sidebar navigation',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

const NAV = [
  {
    title: 'Configuration',
    items: [
      { label: 'Shares', Icon: IconShares },
      { label: 'Settings', Icon: IconSettings },
      { label: 'Integrations', Icon: IconIntegrations },
      { label: 'Clustering', Icon: IconClustering },
    ],
  },
  {
    title: 'Monitoring',
    items: [
      { label: 'Devices', Icon: IconDevices },
      { label: 'Public sharing', Icon: IconPublicSharing },
      { label: 'User activity', Icon: IconUserActivity },
      { label: 'Health', Icon: IconHealth },
    ],
  },
];

export const Default = {
  render: () => {
    const [active, setActive] = useState('Shares');
    return (
      <aside className="sidebar" style={{ height: 'auto', paddingBottom: 24 }}>
        <div className="sidebar__top">
          <div className="sidebar__search-wrap">
            <div className="field">
              <span className="icon-box icon-24 field__icon"><IconSearch /></span>
              <input className="field__input t-md-regular" placeholder="Search" aria-label="Search" />
            </div>
          </div>
          <nav className="sidebar__nav">
            {NAV.map((section) => (
              <div className="nav-section" key={section.title}>
                <div className="nav-section__title t-md-regular">{section.title}</div>
                {section.items.map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    className={'nav-item nav-item--button' + (active === label ? ' nav-item--active' : '')}
                    onClick={() => setActive(label)}
                  >
                    <span className="icon-box icon-24 nav-item__icon"><Icon /></span>
                    <span className="nav-item__label t-md-semibold">{label}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    );
  },
};
