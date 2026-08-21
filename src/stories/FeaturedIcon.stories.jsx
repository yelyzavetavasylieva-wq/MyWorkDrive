import React from 'react';
import { IconWarning, IconSignOutLarge } from '../ui/icons.jsx';
import { IconUsersGroup } from '../ui/wizard-icons.jsx';

// Figma: UI kit → Featured icon. Implemented as `.featured-icon` with the
// `--gray` / `--warning` / `--error` color variants (components.css + wizard.css).
const meta = {
  title: 'Design System/Featured icon',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

const Item = ({ variant, Icon, size = 24, note }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
    <span className={'featured-icon featured-icon--' + variant}>
      <span className={'icon-box icon-' + size}><Icon /></span>
    </span>
    <code style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>--{variant}</code>
    {note && <span style={{ fontSize: 11, color: 'var(--text-quaternary)' }}>{note}</span>}
  </div>
);

export const Variants = {
  render: () => (
    <div style={{ display: 'flex', gap: 40 }}>
      <Item variant="gray" Icon={IconUsersGroup} size={20} note="empty states" />
      <Item variant="warning" Icon={IconWarning} note="Leave wizard?" />
      <Item variant="error" Icon={IconSignOutLarge} note="Log out" />
    </div>
  ),
};
