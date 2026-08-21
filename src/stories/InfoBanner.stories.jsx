import React from 'react';
import { IconInfo } from '../ui/wizard-icons.jsx';

// Figma: UI kit → Notifications (Minor notification). Implemented as
// `.info-banner` in wizard.css, shown in the Users & Groups step.
const meta = {
  title: 'Design System/Info banner',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

export const Default = {
  render: () => (
    <div className="info-banner" style={{ maxWidth: 640 }}>
      <span className="icon-box icon-20 info-banner__icon"><IconInfo /></span>
      <span className="t-sm-regular">New shares will be available to currently logged in users after logoff / login</span>
    </div>
  ),
};
