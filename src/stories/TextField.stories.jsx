import React from 'react';

// Figma: UI kit → Inputs (Input field). Implemented as `.text-input` with
// `.form-field` / `.form-label` / `.field-hint` / `.field-error` in wizard.css.
const meta = {
  title: 'Design System/Text field',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

const Field = ({ label, required, hint, error, children }) => (
  <div className="form-field" style={{ marginBottom: 24 }}>
    <label className="t-sm-semibold form-label">{label} {required && <span className="req">*</span>}</label>
    {children}
    {error
      ? <p className="t-sm-regular field-error">{error}</p>
      : hint && <p className="t-sm-regular field-hint">{hint}</p>}
  </div>
);

export const States = {
  render: () => (
    <div className="form-card" style={{ maxWidth: 560 }}>
      <Field label="Empty (placeholder)">
        <input className="text-input t-md-regular" placeholder="\\mwf\network-share" />
      </Field>
      <Field label="Filled">
        <input className="text-input t-md-regular" defaultValue="Analytics bucket" />
      </Field>
      <Field label="With hint" hint="Primary or secondary key from the storage account.">
        <input className="text-input t-md-regular" placeholder="Enter a value" />
      </Field>
      <Field label="Required, error" required error="Bucket name is required.">
        <input className="text-input t-md-regular is-error" placeholder="my-bucket" />
      </Field>
      <Field label="Password (masked)">
        <input className="text-input t-md-regular" type="password" defaultValue="secretvalue" />
      </Field>
      <Field label="Disabled">
        <input className="text-input t-md-regular" placeholder="Disabled" disabled />
      </Field>
    </div>
  ),
};
