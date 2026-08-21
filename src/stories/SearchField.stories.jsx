import React from 'react';
import { IconSearch } from '../ui/icons.jsx';

// Figma: UI kit → Inputs (search variant). Implemented as `.field` /
// `.field--search` with a leading `.field__icon` in components.css.
const meta = {
  title: 'Design System/Search field',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

const Search = ({ disabled, defaultValue, width }) => (
  <div className="field field--search" style={{ width }}>
    <span className="icon-box icon-24 field__icon"><IconSearch /></span>
    <input className="field__input t-md-regular" placeholder="Search" defaultValue={defaultValue} disabled={disabled} aria-label="Search" />
  </div>
);

export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div><div className="t-sm-semibold" style={{ color: 'var(--text-tertiary)', marginBottom: 8 }}>Default</div><Search /></div>
      <div><div className="t-sm-semibold" style={{ color: 'var(--text-tertiary)', marginBottom: 8 }}>With value</div><Search defaultValue="Backup" /></div>
      <div><div className="t-sm-semibold" style={{ color: 'var(--text-tertiary)', marginBottom: 8 }}>Disabled (empty assigned list)</div><Search disabled /></div>
    </div>
  ),
};
