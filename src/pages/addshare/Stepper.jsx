import React from 'react';

const STEPS = [
  'Storage Type', 'Storage Settings', 'Share Details', 'Features', 'Users & Groups', 'Review & Confirm',
];

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 6.2 5 8.5l4.5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Stepper({ current, onStepClick }) {
  return (
    <ol className="stepper">
      {STEPS.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'upcoming';
        const clickable = i < current && onStepClick;
        return (
          <li className="step" data-state={state} key={label}>
            <div className="step__track">
              <span className={'step__line step__line--left' + (i <= current ? ' is-done' : '')} />
              {clickable ? (
                <button type="button" className="step__circle" onClick={() => onStepClick(i)} aria-label={`Go to ${label}`}>
                  <Check />
                </button>
              ) : (
                <span className="step__circle">
                  {state === 'done' && <Check />}
                  {state === 'active' && <span className="step__dot step__dot--active" />}
                  {state === 'upcoming' && <span className="step__dot" />}
                </span>
              )}
              <span className={'step__line step__line--right' + (i < current ? ' is-done' : '')} />
            </div>
            <span className="step__label t-md-semibold">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
