import React from 'react';
import { IconCheckCircle, IconDismiss } from '../ui/icons.jsx';

// Figma: UI kit → Alert. The app uses the success variant as a toast shown after
// creating or deleting a share (SharesPage `.toast`).
const meta = {
  title: 'Design System/Alert',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

function Toast({ text }) {
  return (
    <div className="toast" role="status">
      <span className="icon-box icon-20 toast__icon"><IconCheckCircle /></span>
      <span className="t-sm-regular toast__text">{text}</span>
      <button type="button" className="toast__close" aria-label="Dismiss">
        <span className="icon-box icon-16"><IconDismiss /></span>
      </button>
    </div>
  );
}

export const Success = {
  render: () => <Toast text={'“SMB share” created successfully.'} />,
};

export const Deletion = {
  render: () => <Toast text={'“BackupNode-A” share successfully deleted'} />,
};
