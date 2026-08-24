import React from 'react';
import { IconPlus, IconImport, IconTrash } from '../ui/wizard-icons.jsx';
import { IconEdit, IconCheckCircle } from '../ui/icons.jsx';

// Figma: UI kit → Buttons (Button, Button destructive). Implemented as the
// `.btn` class family in src/styles/components.css + wizard.css (`.btn--sm`).
const meta = {
  title: 'Design System/Buttons',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

const Row = ({ label, children }) => (
  <div style={{ marginBottom: 28 }}>
    <div className="t-sm-semibold" style={{ color: 'var(--text-tertiary)', marginBottom: 10 }}>{label}</div>
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>{children}</div>
  </div>
);

export const Variants = {
  render: () => (
    <div style={{ padding: 8 }}>
      <Row label="Hierarchy">
        <button type="button" className="btn btn--primary">Primary</button>
        <button type="button" className="btn btn--secondary">Secondary</button>
        <button type="button" className="btn btn--destructive">Destructive</button>
        <button type="button" className="btn btn--destructive-secondary">Destructive secondary</button>
      </Row>
      <Row label="Destructive secondary with icon (bulk delete)">
        <button type="button" className="btn btn--destructive-secondary"><span className="icon-box icon-20"><IconTrash /></span>Delete</button>
      </Row>
      <Row label="Small (.btn--sm)">
        <button type="button" className="btn btn--primary btn--sm">Primary</button>
        <button type="button" className="btn btn--secondary btn--sm">Secondary</button>
      </Row>
      <Row label="With leading icon">
        <button type="button" className="btn btn--primary"><span className="icon-box icon-20"><IconPlus /></span>Add Users &amp; Groups</button>
        <button type="button" className="btn btn--secondary"><span className="icon-box icon-20"><IconImport /></span>Import</button>
      </Row>
      <Row label="Disabled">
        <button type="button" className="btn btn--primary" disabled>Primary</button>
        <button type="button" className="btn btn--secondary" disabled>Secondary</button>
      </Row>
      <Row label="Block (.btn--block, fills its row)">
        <div style={{ display: 'flex', gap: 12, width: 360 }}>
          <button type="button" className="btn btn--secondary btn--block">Back to wizard</button>
          <button type="button" className="btn btn--primary btn--block">Discard and leave</button>
        </div>
      </Row>
      <Row label="Table icon buttons (.icon-btn--table)">
        <button type="button" className="icon-btn icon-btn--table" aria-label="Edit"><span className="icon-box icon-16"><IconEdit /></span></button>
        <button type="button" className="icon-btn icon-btn--table" aria-label="Confirm"><span className="icon-box icon-16"><IconCheckCircle /></span></button>
      </Row>
    </div>
  ),
};
