import React from 'react';

// Checkbox — 20px, radius-sm. Supports checked + indeterminate.
export default function Checkbox({ checked = false, indeterminate = false, onChange, ariaLabel }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-label={ariaLabel}
      className={'checkbox' + ((checked || indeterminate) ? ' checkbox--on' : '')}
      onClick={() => onChange(!checked)}
    >
      {indeterminate ? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 6H9.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ) : checked ? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M10 3L4.75 8.5L2 5.75" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </button>
  );
}
