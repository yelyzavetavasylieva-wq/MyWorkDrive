import React, { useState } from 'react';
import Stepper from './Stepper.jsx';

// Figma: UI kit → Progress steps. Implemented as the Stepper component used by
// the Add new share wizard; completed steps (index < current) are clickable.
const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    current: { control: { type: 'range', min: 0, max: 5, step: 1 } },
  },
  args: { current: 2 },
};
export default meta;

export const Default = {
  render: (args) => <Stepper {...args} />,
};

export const Interactive = {
  render: () => {
    const [current, setCurrent] = useState(2);
    return <Stepper current={current} onStepClick={setCurrent} />;
  },
};

export const FirstStep = { render: (args) => <Stepper {...args} />, args: { current: 0 } };
export const LastStep = { render: (args) => <Stepper {...args} />, args: { current: 5 } };
