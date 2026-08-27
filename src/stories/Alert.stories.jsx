import React from 'react';
import { CheckmarkCircleIcon, WarningIcon, InfoIcon, DismissCircleIcon, DismissIcon } from '../ui/fluent/index.js';

// Figma: UI kit → Alert (node 2190-105778). A rounded-xl card with a per-state
// tinted background + Fluent icon, a flex-1 text slot, and a trailing element:
// either a close (X) button (type "Simple") or an "Action" link that reuses the
// real Button component (.btn btn--link-brand) — type "Action".
//
// Note: this is separate from the pill `.toast` the app shows on share
// create/delete (see SharesPage) — that is intentionally left as-is.
const meta = {
  title: 'Design System/Alert',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'radio', options: ['Success', 'Warning', 'Info', 'Error'] },
    type: { control: 'radio', options: ['Simple', 'Action'] },
    closeButton: { control: 'boolean', description: 'Only relevant when type is "Simple".' },
    children: { control: 'text', name: 'text' },
    actionLabel: { control: 'text' },
  },
  args: {
    state: 'Success',
    type: 'Simple',
    closeButton: true,
    actionLabel: 'Action',
    children: 'This is an alert message describing what just happened.',
  },
};
export default meta;

const STATE_ICON = {
  Success: CheckmarkCircleIcon,
  Warning: WarningIcon,
  Info: InfoIcon,
  Error: DismissCircleIcon,
};

function Alert({ state = 'Info', type = 'Simple', closeButton = true, actionLabel = 'Action', onClose, onAction, children }) {
  const Icon = STATE_ICON[state];
  return (
    <div className={`alert alert--${state.toLowerCase()}`} role="alert">
      <span className="alert__icon"><Icon /></span>
      <span className="alert__text">{children}</span>
      {type === 'Action' ? (
        <span className="alert__action">
          <button type="button" className="btn btn--link-brand" onClick={onAction}>
            <span className="btn__label">{actionLabel}</span>
          </button>
        </span>
      ) : (
        closeButton && (
          <button type="button" className="alert__close" aria-label="Dismiss" onClick={onClose}>
            <DismissIcon />
          </button>
        )
      )}
    </div>
  );
}

// Args-driven playground — exercises every combination from the Figma variant
// sheet (state × type × closeButton) via the Controls panel.
export const Playground = {
  render: ({ children, ...args }) => <Alert {...args}>{children}</Alert>,
};

// The two app confirmation messages, restyled to the new design.
export const Success = {
  args: { state: 'Success', children: '“SMB share” created successfully.' },
  render: ({ children, ...args }) => <Alert {...args}>{children}</Alert>,
};

export const Deletion = {
  args: { state: 'Success', children: '“BackupNode-A” share successfully deleted.' },
  render: ({ children, ...args }) => <Alert {...args}>{children}</Alert>,
};

// All four states stacked (Simple, with close), for the state × background × icon check.
export const AllStates = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
      <Alert state="Success">“SMB share” created successfully.</Alert>
      <Alert state="Warning">Your license expires in 7 days — renew to avoid interruption.</Alert>
      <Alert state="Info">A new version of MyWorkDrive is available.</Alert>
      <Alert state="Error">Couldn’t connect to the storage provider. Check the credentials.</Alert>
    </div>
  ),
};

// Action variant — trailing element is the real Button (link) instead of a close icon.
export const WithAction = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
      <Alert state="Info" type="Action" actionLabel="View details">A new version of MyWorkDrive is available.</Alert>
      <Alert state="Error" type="Action" actionLabel="Retry">Couldn’t connect to the storage provider.</Alert>
    </div>
  ),
};
