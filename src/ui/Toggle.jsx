import React from 'react';

// Toggle — track 44×24, knob 20px. Off: bg-tertiary. On: brand solid.
export default function Toggle({ checked, onChange, id, ariaLabel }) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      className={'toggle' + (checked ? ' toggle--on' : '')}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle__knob" />
    </button>
  );
}
