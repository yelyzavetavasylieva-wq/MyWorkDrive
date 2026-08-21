import React, { useState } from 'react';
import Checkbox from './Checkbox.jsx';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: { ariaLabel: 'Select row' },
};
export default meta;

function Controlled({ checked: initial = false, indeterminate = false, ...rest }) {
  const [checked, setChecked] = useState(initial);
  return <Checkbox {...rest} checked={checked} indeterminate={indeterminate && !checked} onChange={setChecked} />;
}

export const Unchecked = {
  render: (args) => <Controlled {...args} />,
  args: { checked: false },
};

export const Checked = {
  render: (args) => <Controlled {...args} />,
  args: { checked: true },
};

export const Indeterminate = {
  render: (args) => <Controlled {...args} />,
  args: { checked: false, indeterminate: true },
};

export const AllStates = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Controlled ariaLabel="Unchecked" />
      <Controlled checked ariaLabel="Checked" />
      <Controlled indeterminate ariaLabel="Indeterminate" />
    </div>
  ),
};
