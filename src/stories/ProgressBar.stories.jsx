import React from 'react';

// Figma: UI kit → Progress bar. Determinate track + brand fill with a trailing
// percentage label. Implemented as `.progress-bar` in components.css.
const meta = {
  title: 'Design System/Progress bar',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

function ProgressBar({ value }) {
  return (
    <div className="progress-bar" style={{ width: 360 }}>
      <div className="progress-bar__track">
        <div className="progress-bar__fill" style={{ width: `${value}%` }} />
      </div>
      <span className="progress-bar__value">{value}%</span>
    </div>
  );
}

export const Default = {
  render: () => <ProgressBar value={70} />,
};

export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {[0, 25, 50, 75, 100].map((v) => <ProgressBar key={v} value={v} />)}
    </div>
  ),
};
