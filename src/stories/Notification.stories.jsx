import React from 'react';
import { IconDismiss } from '../ui/icons.jsx';
import { IconInfo, IconCheckDot } from '../ui/wizard-icons.jsx';
import { IconWarning } from '../ui/icons.jsx';

// Figma: UI kit → Notifications (Notification). A dismissible card with a status
// icon, title, description and action links. Implemented as `.notification` in
// components.css. (The compact single-line toast is the separate Alert story;
// the inline banner is Info banner.)
const meta = {
  title: 'Design System/Notification',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

function Notification({ variant = 'brand', icon, title, desc }) {
  return (
    <div className={`notification notification--${variant}`} role="status">
      <span className="icon-box icon-20 notification__icon">{icon}</span>
      <div className="notification__body">
        <span className="notification__title">{title}</span>
        <span className="notification__desc">{desc}</span>
        <div className="notification__actions">
          <button type="button" className="notification__action notification__action--muted">Dismiss</button>
          <button type="button" className="notification__action">View</button>
        </div>
      </div>
      <button type="button" className="notification__close" aria-label="Dismiss">
        <span className="icon-box icon-16"><IconDismiss /></span>
      </button>
    </div>
  );
}

export const Informational = {
  render: () => (
    <Notification
      variant="brand"
      icon={<IconInfo />}
      title="We've just released a new update!"
      desc="Check out the all new dashboard view. Pages and exports now load faster."
    />
  ),
};

export const Warning = {
  render: () => (
    <Notification
      variant="warning"
      icon={<IconWarning width="20" height="20" />}
      title="This project has been unpublished"
      desc="Removing all users has unpublished this project. Add users to republish."
    />
  ),
};

export const Success = {
  render: () => (
    <Notification
      variant="success"
      icon={<IconCheckDot width="20" height="20" />}
      title="Successfully updated profile"
      desc="Your changes have been saved and your profile is live. Your team can make edits."
    />
  ),
};
