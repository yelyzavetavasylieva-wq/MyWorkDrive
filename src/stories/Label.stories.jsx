import React from 'react';

// Figma: UI kit → Label. Small colored status pill in five semantic colors,
// with an optional leading dot. Implemented as `.label` in components.css.
const meta = {
  title: 'Design System/Label',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

const VARIANTS = [
  ['brand', 'Brand'],
  ['gray', 'Gray'],
  ['warning', 'Warning'],
  ['success', 'Success'],
  ['error', 'Error'],
];

export const Colors = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {VARIANTS.map(([k, lbl]) => <span key={k} className={`label label--${k}`}>{lbl}</span>)}
    </div>
  ),
};

export const WithDot = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {VARIANTS.map(([k, lbl]) => (
        <span key={k} className={`label label--${k}`}>
          <span className="label__dot" />
          {lbl}
        </span>
      ))}
    </div>
  ),
};
