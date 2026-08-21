import React, { useState } from 'react';
import Toggle from './Toggle.jsx';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: { ariaLabel: 'Toggle setting' },
};
export default meta;

// Controlled wrapper so the knob actually animates in the canvas.
function Controlled({ checked: initial = false, ...rest }) {
  const [checked, setChecked] = useState(initial);
  return <Toggle {...rest} checked={checked} onChange={setChecked} />;
}

export const Off = {
  render: (args) => <Controlled {...args} />,
  args: { checked: false },
};

export const On = {
  render: (args) => <Controlled {...args} />,
  args: { checked: true },
};

export const Both = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Controlled checked={false} ariaLabel="Off" />
      <Controlled checked ariaLabel="On" />
    </div>
  ),
};
