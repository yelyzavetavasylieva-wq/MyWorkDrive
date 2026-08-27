import React, { useState } from 'react';
import LeaveWizardModal from '../layout/LeaveWizardModal.jsx';
import LogoutModal from '../layout/LogoutModal.jsx';

// Figma: UI kit → Modals. The app ships three: LeaveWizardModal and LogoutModal
// (small, `.modal`) and AddUsersModal (`.modal--wide`, shown in its own story via
// the Users & Groups step). These render the two small confirmation modals.
const meta = {
  title: 'Components/Modals',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ minHeight: 420, position: 'relative' }}><Story /></div>],
};
export default meta;

export const LeaveWizard = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        {!open && <button type="button" className="btn btn--primary" onClick={() => setOpen(true)}>Reopen</button>}
        <LeaveWizardModal open={open} targetLabel="Settings" onStay={() => setOpen(false)} onLeave={() => setOpen(false)} />
      </>
    );
  },
};

export const Logout = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        {!open && <button type="button" className="btn btn--primary" onClick={() => setOpen(true)}>Reopen</button>}
        <LogoutModal open={open} onCancel={() => setOpen(false)} onConfirm={() => setOpen(false)} />
      </>
    );
  },
};

// Regression guard for the close button: `.modal__close` is pinned to the
// `.modal` container (position: absolute; top: 16px; right: 16px), so its
// position is constant regardless of how tall the header content grows. Passing
// a long `targetLabel` forces the description to wrap onto extra lines — the
// close button stays fixed in the top-right corner and the text does not reflow
// around it. See Figma node 523:20483.
export const PinnedCloseWithTallContent = {
  name: 'Close button — pinned (tall content)',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        {!open && <button type="button" className="btn btn--primary" onClick={() => setOpen(true)}>Reopen</button>}
        <LeaveWizardModal
          open={open}
          targetLabel="Settings › Integrations › Single Sign-On › SAML Identity Provider Configuration"
          onStay={() => setOpen(false)}
          onLeave={() => setOpen(false)}
        />
      </>
    );
  },
};
