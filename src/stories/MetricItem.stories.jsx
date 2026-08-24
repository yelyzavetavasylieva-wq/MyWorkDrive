import React from 'react';
import { IconDocEdit, IconChevronDown } from '../ui/icons.jsx';
import { IconHistory, IconCheckDot } from '../ui/wizard-icons.jsx';

// Figma: UI kit → Metric item. A stat tile: label, large value with a status
// check, a threshold hint pill and a timestamp, plus icon actions. A second
// variant swaps the label row for a select. Implemented as `.metric`.
const meta = {
  title: 'Design System/Metric item',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

function Actions() {
  return (
    <div className="metric__actions">
      <button type="button" className="icon-btn icon-btn--table" aria-label="History">
        <span className="icon-box icon-16"><IconHistory /></span>
      </button>
      <button type="button" className="icon-btn icon-btn--table" aria-label="Details">
        <span className="icon-box icon-16"><IconDocEdit /></span>
      </button>
    </div>
  );
}

export const Default = {
  render: () => (
    <div className="metric">
      <div className="metric__head">
        <span className="metric__label">Free disk space on C:\ drive</span>
        <Actions />
      </div>
      <div className="metric__value-row">
        <span className="metric__value">95.95 GB</span>
        <span className="icon-box icon-20"><IconCheckDot width="20" height="20" /></span>
      </div>
      <span className="metric__hint">Recommended at least 25.00 GB</span>
      <span className="metric__time">17 minutes ago</span>
    </div>
  ),
};

export const WithSelect = {
  render: () => (
    <div className="metric">
      <div className="metric__head">
        <span className="metric__label">Free disk space on C:\ drive</span>
        <Actions />
      </div>
      <div className="select select--full">
        <select className="select__native t-md-regular" defaultValue="download" aria-label="Drive">
          <option value="download">Download</option>
          <option value="system">System (C:)</option>
          <option value="data">Data (D:)</option>
        </select>
        <span className="icon-box icon-20 select__chevron"><IconChevronDown /></span>
      </div>
      <div className="metric__value-row">
        <span className="metric__value">95.95 GB</span>
        <span className="icon-box icon-20"><IconCheckDot width="20" height="20" /></span>
      </div>
      <span className="metric__hint">Recommended at least 25.00 GB</span>
      <span className="metric__time">17 minutes ago</span>
    </div>
  ),
};
