import React from 'react';
import { IconPlus } from '../ui/wizard-icons.jsx';
import { IconArrowRight } from '../ui/icons.jsx';

// Design System/Buttons — mirrors the two Figma Button components
// ("Buttons/Button" and "Buttons/Button destructive"). Organized by Hierarchy,
// shown across the real States (Default / Hover / Focused / Disabled — there is
// no Pressed state), with Size (sm/md/lg/xl) and Icon slots nested. Renders the
// real `.btn` classes from src/styles/components.css (+ .btn--sm from wizard.css).
//
// Icons use two independent slots — iconLeading + iconTrailing — each a 20px
// `.icon-box` span before/after the `.btn__label` text wrapper. Label padding
// (spacing-xxs, 2px) is distinct from the icon↔label flex gap (spacing-xs, 4px).
//
// Focus differs per hierarchy: Primary + Secondary get a ring (Secondary also a
// brand border); Tertiary / Link brand / Link gray render Focused identically to
// Hover (no ring). Static .is-hover / .is-focused mirror the real :hover /
// :focus-visible styles so states can sit side by side.
const meta = {
  title: 'Design System/Buttons',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

const SIZES = [
  { key: 'sm', label: 'sm', cls: 'btn--sm', icon: 'icon-16' },
  { key: 'md', label: 'md', cls: '', icon: 'icon-20' },
  { key: 'lg', label: 'lg', cls: 'btn--lg', icon: 'icon-20' },
  { key: 'xl', label: 'xl', cls: 'btn--xl', icon: 'icon-20' },
];

const STATES = [
  { key: 'default', label: 'Default', mod: '' },
  { key: 'hover', label: 'Hover', mod: 'is-hover' },
  { key: 'focused', label: 'Focused', mod: 'is-focused' },
  { key: 'disabled', label: 'Disabled', mod: '', disabled: true },
];

const NON_DESTRUCTIVE = [
  { label: 'Primary', cls: 'btn--primary', usage: 'Use to highlight the most important action in any experience — typically one per view.' },
  { label: 'Secondary', cls: 'btn--secondary', usage: 'Use for secondary actions that sit alongside a primary action.' },
  { label: 'Tertiary', cls: 'btn--tertiary', usage: 'Use for lower-priority actions where a filled or outlined button would feel too heavy.' },
  { label: 'Link brand', cls: 'btn--link-brand', usage: 'Use for inline, low-emphasis actions that should read as a branded link.' },
  { label: 'Link gray', cls: 'btn--link-gray', usage: 'Use for the least prominent link actions, subordinate to Link brand.' },
];

const DESTRUCTIVE = [
  { label: 'Primary', cls: 'btn--destructive', usage: 'Use for the primary destructive action, such as a permanent delete.' },
  { label: 'Secondary', cls: 'btn--destructive-secondary', usage: 'Use for a destructive action that should not dominate the view.' },
  { label: 'Tertiary', cls: 'btn--destructive-tertiary', usage: 'Use for low-emphasis destructive actions inline with other controls.' },
  { label: 'Link brand', cls: 'btn--destructive-link', usage: 'Use for a destructive action that should read as an inline link.' },
  // No "Link gray" — a gray link is never a destructive action, so the Figma
  // "Button destructive" component intentionally omits it.
];

// One button. Icon slots mirror the Figma iconLeading / iconTrailing booleans.
function Btn({ hierarchyCls, size, state, leading, trailing, iconOnly, label = 'Button CTA' }) {
  const cls = ['btn', hierarchyCls, size.cls, iconOnly ? 'btn--icon' : '', state.mod]
    .filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} disabled={state.disabled} aria-label={iconOnly ? 'Button' : undefined}>
      {iconOnly ? (
        <span className={`icon-box ${size.icon}`}><IconPlus /></span>
      ) : (
        <>
          {leading && <span className={`icon-box ${size.icon}`}><IconPlus /></span>}
          <span className="btn__label">{label}</span>
          {trailing && <span className={`icon-box ${size.icon}`}><IconArrowRight /></span>}
        </>
      )}
    </button>
  );
}

const GRID = '52px repeat(4, minmax(140px, 1fr))';

// A size × state matrix for one content configuration.
function StateGrid({ hierarchyCls, leading, trailing, iconOnly }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: GRID, gap: '10px 16px', alignItems: 'center' }}>
      <span />
      {STATES.map((s) => (
        <span key={s.key} style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-quaternary)' }}>{s.label}</span>
      ))}
      {SIZES.map((size) => (
        <React.Fragment key={size.key}>
          <code style={{ fontFamily: 'var(--font-data)', fontSize: 12, color: 'var(--text-tertiary)' }}>{size.label}</code>
          {STATES.map((state) => (
            <div key={state.key} style={{ display: 'flex' }}>
              <Btn hierarchyCls={hierarchyCls} size={size} state={state} leading={leading} trailing={trailing} iconOnly={iconOnly} />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

// Demonstrates the two independent icon slots at md / default state.
function SlotsRow({ hierarchyCls }) {
  const md = SIZES[1];
  const def = STATES[0];
  const slots = [
    { label: 'No icon' },
    { label: 'Leading', leading: true },
    { label: 'Trailing', trailing: true },
    { label: 'Leading + trailing', leading: true, trailing: true },
    { label: 'Icon only', iconOnly: true },
  ];
  return (
    <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-end' }}>
      {slots.map((s) => (
        <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-quaternary)' }}>{s.label}</span>
          <div style={{ display: 'flex' }}>
            <Btn hierarchyCls={hierarchyCls} size={md} state={def} leading={s.leading} trailing={s.trailing} iconOnly={s.iconOnly} />
          </div>
        </div>
      ))}
    </div>
  );
}

function HierarchySection({ item }) {
  return (
    <section style={{ marginBottom: 44, paddingBottom: 36, borderBottom: '1px solid var(--border-secondary)' }}>
      <h3 className="t-lg-semibold" style={{ margin: '0 0 2px', color: 'var(--text-primary)' }}>{item.label}</h3>
      <p style={{ margin: '0 0 20px', fontSize: 14, color: 'var(--text-tertiary)', maxWidth: 640 }}>{item.usage}</p>

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>Icon slots (md · default)</div>
        <SlotsRow hierarchyCls={item.cls} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', gap: 32 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>Leading icon + text</div>
          <StateGrid hierarchyCls={item.cls} leading />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>Icon only</div>
          <StateGrid hierarchyCls={item.cls} iconOnly />
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [destructive, setDestructive] = React.useState(false);
  const groups = destructive ? DESTRUCTIVE : NON_DESTRUCTIVE;
  const seg = (active) => ({
    padding: '8px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
    border: '1px solid var(--border-primary)',
    background: active ? 'var(--bg-brand-solid)' : 'var(--bg-primary)',
    color: active ? 'var(--text-white)' : 'var(--text-secondary)',
  });
  return (
    <div style={{ padding: 32, background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <header style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 600, color: 'var(--text-primary)' }}>Buttons</h2>
        <p style={{ margin: '6px 0 0', fontSize: 15, color: 'var(--text-tertiary)', maxWidth: 760 }}>
          Organized by hierarchy, across the real states — Default, Hover, Focused, Disabled (no
          “Pressed” state exists). Two independent icon slots (leading / trailing), size, and icon-only
          are nested per section. Focus is per-hierarchy: Primary &amp; Secondary get a ring (Secondary
          also a brand border); Tertiary and the link styles show Focused the same as Hover.
        </p>
      </header>

      <div style={{ display: 'inline-flex', marginBottom: 32, borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
        <button type="button" style={{ ...seg(!destructive), borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)' }} onClick={() => setDestructive(false)}>Non-destructive</button>
        <button type="button" style={{ ...seg(destructive), borderLeft: 'none', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }} onClick={() => setDestructive(true)}>Destructive</button>
      </div>

      {groups.map((item) => <HierarchySection key={item.label} item={item} />)}
    </div>
  );
}

export const Variants = { render: () => <Gallery /> };
