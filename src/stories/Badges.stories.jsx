import React from 'react';
import { IconGlobe, IconLockOpen, IconArrowDownload, IconDocEdit, IconErrorCircle, IconWarning } from '../ui/icons.jsx';

// Figma: UI kit → Tag / _Table badge and the status icons used in the Shares
// table. Implemented as `.feature-badge` and `.status-icon--*` in components.css.
const meta = {
  title: 'Design System/Badges',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

const FEATURES = [
  ['globe', IconGlobe, 'Public sharing'],
  ['lock', IconLockOpen, 'Lock'],
  ['download', IconArrowDownload, 'Download'],
  ['docedit', IconDocEdit, 'Office Online edit'],
];

const Label = ({ children }) => (
  <div className="t-sm-semibold" style={{ color: 'var(--text-tertiary)', marginBottom: 10 }}>{children}</div>
);

export const FeatureBadges = {
  render: () => (
    <div>
      <Label>Feature badges (.feature-badge)</Label>
      <div className="feature-badges">
        {FEATURES.map(([k, Ico]) => (
          <span key={k} className="feature-badge"><span className="icon-box feature-badge__icon"><Ico width="12" height="12" /></span></span>
        ))}
      </div>
      <div style={{ marginTop: 16, display: 'flex', gap: 16, color: 'var(--text-tertiary)', fontSize: 12 }}>
        {FEATURES.map(([k, , name]) => <span key={k}>{name}</span>)}
      </div>
    </div>
  ),
};

export const StatusIcons = {
  render: () => (
    <div>
      <Label>Status icons (.status-icon--error / --warning)</Label>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <span className="icon-box icon-16 status-icon status-icon--error"><IconErrorCircle /></span>
        <span className="icon-box icon-16 status-icon status-icon--warning"><IconWarning /></span>
      </div>
    </div>
  ),
};
