import React from 'react';
import { IconChevronDown } from '../ui/icons.jsx';

// Figma: UI kit → Input dropdowns (Input dropdown). Implemented as the native
// `.select` wrapper with `.select__native` + `.select__chevron` in wizard.css.
const meta = {
  title: 'Design System/Select',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

const NativeSelect = ({ className, options, error }) => (
  <div className={'select ' + className}>
    <select className={'select__native t-md-regular' + (error ? ' is-error' : '')} defaultValue={options[0]}>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
    <span className="icon-box icon-20 select__chevron"><IconChevronDown /></span>
  </div>
);

const Field = ({ label, children }) => (
  <div className="form-field" style={{ marginBottom: 24 }}>
    <label className="t-sm-semibold form-label">{label}</label>
    {children}
  </div>
);

export const Variants = {
  render: () => (
    <div className="form-card" style={{ maxWidth: 560 }}>
      <Field label="Small (.select--sm) — drive letter">
        <NativeSelect className="select--sm" options={['M:', 'N:', 'O:', 'P:']} />
      </Field>
      <Field label="Full width (.select--full) — S3 region">
        <NativeSelect className="select--full" options={['us-east-1', 'us-west-2', 'eu-west-1']} />
      </Field>
      <Field label="Error state (.is-error)">
        <NativeSelect className="select--full" options={['Select region', 'us-east-1']} error />
      </Field>
    </div>
  ),
};
