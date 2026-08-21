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
