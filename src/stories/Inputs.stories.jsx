import React from 'react';
import { MailIcon, ChevronDownIcon, QuestionCircleIcon } from '../ui/fluent/index.js';

// Design System/Inputs — mirrors the Figma "Input field" component, organized
// like the Button page: one section per Type, each shown across its real states
// (Placeholder / Filled / Focused / Disabled — inputs have NO Hover state), with
// a Non-destructive / Destructive toggle. sm size only (the only size used in
// product). Renders the real `.input*` classes from components.css, reuses the
// real Button component for the Trailing button type, and Fluent icon components
// for the icon/dropdown/help slots.
//
// Static .is-focused / .is-disabled mirror the real :focus-within / disabled
// styles so states can sit side by side.
const meta = {
  title: 'Design System/Inputs',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

const STATES = [
  { key: 'placeholder', label: 'Placeholder' },
  { key: 'filled', label: 'Filled', filled: true },
  { key: 'focused', label: 'Focused', filled: true, focused: true },
  { key: 'disabled', label: 'Disabled', disabled: true },
];

// Per-type sample content + which slots it uses.
const TYPES = [
  { key: 'default', label: 'Default', usage: 'The standard single-line text field.',
    field: 'Email', value: 'olivia@untitledui.com' },
  { key: 'icon-leading', label: 'Icon leading', usage: 'Adds a 20px leading icon slot before the text — here the Fluent Mail icon on an email field.',
    field: 'Email', value: 'olivia@untitledui.com', leadingIcon: true },
  { key: 'leading-dropdown', label: 'Leading dropdown', usage: 'Fuses a dropdown to the left edge, sharing the border — e.g. a country/prefix selector before a phone number.',
    field: 'Phone number', value: '+1 (555) 000-0000', leadingDropdown: 'US' },
  { key: 'leading-text', label: 'Leading text', usage: 'Fuses a static text affix to the left edge, such as a URL scheme.',
    field: 'Website', value: 'www.untitledui.com', leadingText: 'http://' },
  { key: 'trailing-button', label: 'Trailing button', usage: 'Fuses the real Button component to the right edge — e.g. a Copy action. Reuses Button exactly (its label padding + icon gap).',
    field: 'Website', value: 'www.untitledui.com', trailingButton: 'Copy' },
  { key: 'trailing-dropdown', label: 'Trailing dropdown', usage: 'Fuses a dropdown to the right edge — e.g. a currency selector after an amount.',
    field: 'Amount', value: '1,000.00', trailingDropdown: 'USD' },
];

const ICON20 = 'icon-box icon-20';
const ICON16 = 'icon-box icon-16';

// The inner field box (control + optional leading icon + trailing help icon).
function FieldBox({ t, state, error, compound }) {
  const cls = ['input', error && 'input--error', !compound && state.focused && 'is-focused', !compound && state.disabled && 'is-disabled']
    .filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {t.leadingIcon && <span className={`input__icon ${ICON20}`}><MailIcon /></span>}
      <input
        className="input__control"
        type="text"
        placeholder={t.value}
        defaultValue={state.filled ? t.value : ''}
        disabled={state.disabled}
        readOnly
      />
      <span className={`input__help ${ICON16}`}><QuestionCircleIcon /></span>
    </div>
  );
}

function Dropdown({ label }) {
  return (
    <span className="input-addon">
      {label}
      <span className={`input-addon__chevron ${ICON16}`}><ChevronDownIcon /></span>
    </span>
  );
}

// Full control for a type+state: a plain field, or a fused compound group.
function Control({ t, state, error }) {
  const compound = t.leadingDropdown || t.leadingText || t.trailingButton || t.trailingDropdown;
  if (!compound) return <FieldBox t={t} state={state} error={error} />;

  const isLeading = t.leadingDropdown || t.leadingText;
  const groupCls = [
    'input-group',
    isLeading ? 'input-group--leading' : 'input-group--trailing',
    error && 'input-group--error',
    state.focused && 'is-focused',
    state.disabled && 'is-disabled',
  ].filter(Boolean).join(' ');

  return (
    <div className={groupCls}>
      {t.leadingDropdown && <Dropdown label={t.leadingDropdown} />}
      {t.leadingText && <span className="input-addon input-addon--text">{t.leadingText}</span>}
      <FieldBox t={t} state={state} error={error} compound />
      {t.trailingDropdown && <Dropdown label={t.trailingDropdown} />}
      {t.trailingButton && (
        <button type="button" className="btn btn--secondary" disabled={state.disabled}>
          <span className="btn__label">{t.trailingButton}</span>
        </button>
      )}
    </div>
  );
}

// label → control → hint stack for one state cell.
function Cell({ t, state, error }) {
  return (
    <div className={`input-field ${error ? 'input-field--error' : ''}`}>
      <span className="input-field__label">{t.field}</span>
      <Control t={t} state={state} error={error} />
      <span className="input-field__hint">This is a hint text to help user.</span>
    </div>
  );
}

function TypeSection({ t, error }) {
  return (
    <section style={{ marginBottom: 44, paddingBottom: 36, borderBottom: '1px solid var(--border-secondary)' }}>
      <h3 className="t-lg-semibold" style={{ margin: '0 0 2px', color: 'var(--text-primary)' }}>{t.label}</h3>
      <p style={{ margin: '0 0 20px', fontSize: 14, color: 'var(--text-tertiary)', maxWidth: 680 }}>{t.usage}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(220px, 1fr))', gap: 24, alignItems: 'start' }}>
        {STATES.map((state) => (
          <div key={state.key}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-quaternary)', marginBottom: 10 }}>{state.label}</div>
            <Cell t={t} state={state} error={error} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const [destructive, setDestructive] = React.useState(false);
  const seg = (active) => ({
    padding: '8px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
    border: '1px solid var(--border-primary)',
    background: active ? 'var(--bg-brand-solid)' : 'var(--bg-primary)',
    color: active ? 'var(--text-white)' : 'var(--text-secondary)',
  });
  return (
    <div style={{ padding: 32, background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <header style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 600, color: 'var(--text-primary)' }}>Inputs</h2>
        <p style={{ margin: '6px 0 0', fontSize: 15, color: 'var(--text-tertiary)', maxWidth: 780 }}>
          Organized by type, across the real states — Placeholder, Filled, Focused, Disabled (inputs have
          no Hover state). sm size only (the size used in product). Destructive is the error/invalid
          styling and applies across every type; toggle it below.
        </p>
      </header>

      <div style={{ display: 'inline-flex', marginBottom: 32, borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
        <button type="button" style={{ ...seg(!destructive), borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)' }} onClick={() => setDestructive(false)}>Non-destructive</button>
        <button type="button" style={{ ...seg(destructive), borderLeft: 'none', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }} onClick={() => setDestructive(true)}>Destructive</button>
      </div>

      {TYPES.map((t) => <TypeSection key={t.key} t={t} error={destructive} />)}
    </div>
  );
}

export const Variants = { render: () => <Gallery /> };
