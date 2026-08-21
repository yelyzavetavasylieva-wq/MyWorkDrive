import React from 'react';
import Tooltip from './Tooltip.jsx';
import { IconQuestionCircle } from './icons.jsx';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Hover or focus the trigger to reveal the tooltip pill.' } },
  },
  argTypes: {
    label: { control: 'text' },
    placement: { control: 'inline-radio', options: ['right', 'left', 'top', 'bottom'] },
  },
  args: { label: 'Guest access is disabled in Settings', placement: 'right' },
};
export default meta;

function Trigger() {
  return (
    <button
      type="button"
      className="icon-box icon-20"
      aria-label="More info"
      style={{ background: 'none', border: 'none', color: 'var(--fg-quaternary)', cursor: 'pointer', padding: 0 }}
    >
      <IconQuestionCircle />
    </button>
  );
}

export const Default = {
  render: (args) => (
    <div style={{ padding: 80 }}>
      <Tooltip {...args}>
        <Trigger />
      </Tooltip>
    </div>
  ),
};

export const Placements = {
  render: () => (
    <div style={{ display: 'flex', gap: 96, padding: 80 }}>
      {['right', 'left', 'top', 'bottom'].map((p) => (
        <Tooltip key={p} label={`Placement: ${p}`} placement={p}>
          <Trigger />
        </Tooltip>
      ))}
    </div>
  ),
};
