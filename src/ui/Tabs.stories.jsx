import React, { useState } from 'react';
import Tabs from './Tabs.jsx';

const EXAMPLE_TABS = [
  { id: 'details', label: 'My details' },
  { id: 'profile', label: 'Profile' },
  { id: 'password', label: 'Password' },
  { id: 'team', label: 'Team' },
  { id: 'plan', label: 'Plan' },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    onChange: { action: 'changed' },
  },
  args: {
    size: 'md',
    tabs: EXAMPLE_TABS,
    defaultValue: 'details',
    'aria-label': 'Account settings',
  },
};
export default meta;

// Controlled wrapper so clicking / arrow keys actually switch the active tab in
// the canvas (matches the Toggle story's pattern).
function Controlled({ defaultValue, value, onChange, ...rest }) {
  const [active, setActive] = useState(value ?? defaultValue ?? rest.tabs?.[0]?.id);
  return (
    <Tabs
      {...rest}
      value={active}
      onChange={(id) => { setActive(id); onChange?.(id); }}
    />
  );
}

// Default: 5 example tabs, first active. Interactive (clicks + arrow keys) and
// the `size` control switches sm/md.
export const Default = {
  render: (args) => <Controlled {...args} />,
};

// Both sizes side by side.
export const Sizes = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 640 }}>
      <div>
        <div className="t-sm-semibold" style={{ color: 'var(--text-tertiary)', marginBottom: 8 }}>sm</div>
        <Controlled {...args} size="sm" />
      </div>
      <div>
        <div className="t-sm-semibold" style={{ color: 'var(--text-tertiary)', marginBottom: 8 }}>md</div>
        <Controlled {...args} size="md" />
      </div>
    </div>
  ),
};

// Isolated tab-button states (Default / Hover / Focus / Current), sm + md — the
// same states-in-a-row treatment used on the Button page. Rendered with the
// static .is-* demo modifiers so each state is visible at once.
export const TabButtonStates = {
  parameters: { controls: { disable: true } },
  render: () => {
    const STATES = [
      { label: 'Default', cls: '' },
      { label: 'Hover', cls: 'is-hover' },
      { label: 'Focus', cls: 'is-focus' },
      { label: 'Current', cls: 'is-selected' },
    ];
    const Row = ({ size }) => (
      <div>
        <div className="t-sm-semibold" style={{ color: 'var(--text-tertiary)', marginBottom: 8 }}>{size}</div>
        <div className={`seg-tabs seg-tabs--${size}`} role="tablist" aria-label={`Tab button states (${size})`} style={{ display: 'inline-flex' }}>
          {STATES.map((s) => (
            <button
              key={s.label}
              type="button"
              role="tab"
              aria-selected={s.cls === 'is-selected'}
              className={('seg-tabs__tab ' + s.cls).trim()}
              style={{ flex: '0 0 auto', minWidth: 120 }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Row size="sm" />
        <Row size="md" />
      </div>
    );
  },
};
