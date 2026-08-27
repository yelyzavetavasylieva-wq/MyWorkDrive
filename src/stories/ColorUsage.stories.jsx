import React from 'react';

// Foundations/Color usage — the semantic color-token reference, presented as the
// Name / Light mode / Dark mode / Usage table from the Figma UI kit
// (node 6-1714: "Color usage").
//
// SOURCE-OF-TRUTH NOTE (important):
//   Our code token source, src/styles/tokens.css, is LIGHT-MODE ONLY. It does
//   not record a token's dark-mode value, which raw scale a token resolves to,
//   or a usage description. Those three facts live only in the Figma design
//   system, so the `light` / `dark` scale names and `usage` strings below are
//   transcribed verbatim from that Figma spec — none are invented. If/when the
//   design tokens grow real light/dark + description metadata (e.g. a JSON token
//   file or a themed CSS layer), this table should read from that instead.
//
//   The swatch COLORS are never hardcoded: each `light`/`dark` scale name maps
//   to a primitive CSS variable in tokens.css (--gray-900, --brand-500, …) and
//   the swatch renders `background: var(--<scale>)`, so hues always track the
//   real tokens.

const meta = {
  title: 'Foundations/Color usage',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

/* Map a Figma scale name to the primitive CSS variable that holds its hex. */
function scaleVar(scale) {
  if (scale === 'white') return '--base-white';
  if (scale === 'text-white') return '--text-white'; // always-white semantic alias
  return `--${scale}`; // gray-900, brand-500, error-400, warning-600, success-500, …
}

/* Data — grouped by the same four families as the previous page, using the
   Figma section titles/subtitles. Each row: name, light scale, dark scale,
   usage; `children` are variant tokens nested under their parent. */
const SECTIONS = [
  {
    title: 'Text color',
    subtitle: 'Use these rules to manage all text fill colors.',
    rows: [
      { name: 'text-primary', light: 'gray-900', dark: 'gray-50', usage: 'Primary text such as page headings.', children: [
        { name: 'text-primary_on-brand', light: 'white', dark: 'gray-50', usage: 'Primary text when used on solid brand color backgrounds.' },
      ] },
      { name: 'text-secondary', light: 'gray-700', dark: 'gray-300', usage: 'Secondary text such as labels and section headings.', children: [
        { name: 'text-secondary_hover', light: 'gray-800', dark: 'gray-200', usage: 'Secondary text when in hover state.' },
      ] },
      { name: 'text-tertiary', light: 'gray-600', dark: 'gray-400', usage: 'Tertiary text for such as supporting text and paragraph text.', children: [
        { name: 'text-tertiary_hover', light: 'gray-700', dark: 'gray-300', usage: 'Tertiary text when in hover state.' },
      ] },
      { name: 'text-quaternary', light: 'gray-500', dark: 'gray-400', usage: 'Quaternary text for more subtle and lower-contrast text, such as column headings.' },
      { name: 'text-white', light: 'text-white', dark: 'text-white', usage: 'Text that is always white, regardless of the mode.' },
      { name: 'text-disabled', light: 'gray-500', dark: 'gray-500', usage: 'Default color for disabled text such as disabled input fields or buttons. This can be changed to gray-400, but gray-500 is higher contrast and more accessible.' },
      { name: 'text-placeholder', light: 'gray-500', dark: 'gray-400', usage: 'Default color for placeholder text such as input field placeholders. This can be changed to gray-400, but gray-500 is more accessible because it is higher contrast.', children: [
        { name: 'text-placeholder_subtle', light: 'gray-300', dark: 'gray-700', usage: 'A more subtle (lower contrast) alternative placeholder text. Useful for components such as verification code input fields.' },
      ] },
      { name: 'text-brand-primary', light: 'brand-500', dark: 'gray-50', usage: 'Primary brand text useful for headings.' },
      { name: 'text-brand-links', light: 'brand-700', dark: 'gray-50', usage: 'Brand text for accented text and links.' },
      { name: 'text-error-primary', light: 'error-600', dark: 'error-400', usage: 'Default error state semantic text color (e.g. input field error states).' },
      { name: 'text-error-hover', light: 'error-700', dark: 'error-400', usage: 'Hover warning state semantic text color.' },
      { name: 'text-warning-primary', light: 'warning-600', dark: 'warning-400', usage: 'Default warning state semantic text color.' },
      { name: 'text-success-primary', light: 'success-600', dark: 'success-400', usage: 'Default success state semantic text color.' },
    ],
  },
  {
    title: 'Background color',
    subtitle: 'Use background color variables to manage all fill colors for elements in your designs.',
    rows: [
      { name: 'bg-primary', light: 'white', dark: 'gray-950', usage: 'The primary background color (white) used across all layouts and components.', children: [
        { name: 'bg-primary_hover', light: 'gray-50', dark: 'gray-800', usage: 'Primary background hover color. This acts as the default hover state background color for components with white backgrounds (e.g. input dropdown menu items).' },
      ] },
      { name: 'bg-primary-solid', light: 'gray-950', dark: 'gray-900', usage: 'The primary dark background color used across layouts and components. This is useful for components such as tooltips.' },
      { name: 'bg-secondary', light: 'gray-50', dark: 'gray-900', usage: 'The secondary background color used to create contrast against white backgrounds.', children: [
        { name: 'bg-secondary_hover', light: 'gray-100', dark: 'gray-800', usage: 'Secondary background hover color. Useful for hover states for components with gray-50 backgrounds such as active states (e.g navigation items and date pickers).' },
        { name: 'bg-secondary_subtle', light: 'gray-25', dark: 'gray-900', usage: 'An alternative secondary background color that is slightly lighter and more subtle in light mode. This is useful for components such as banners.' },
      ] },
      { name: 'bg-secondary-solid', light: 'gray-600', dark: 'gray-600', usage: 'The secondary dark background color used across layouts and components. This is useful for components such as featured icons.' },
      { name: 'bg-tertiary', light: 'gray-100', dark: 'gray-800', usage: 'The tertiary background color used to create contrast against light backgrounds such as toggles.' },
      { name: 'bg-quaternary', light: 'gray-200', dark: 'gray-700', usage: 'The quaternary background color used to create contrast against light backgrounds, such as sliders and progress bars.' },
      { name: 'bg-active', light: 'gray-50', dark: 'gray-800', usage: 'Default active background color for components such as selected menu items in input dropdowns.' },
      { name: 'bg-disabled', light: 'gray-100', dark: 'gray-800', usage: 'Default disabled background color for components such as disabled primary buttons and toggles.', children: [
        { name: 'bg-disabled_subtle', light: 'gray-50', dark: 'gray-900', usage: 'An alternative disabled background color that is more subtle. This is useful for components such as disabled input fields and checkboxes.' },
      ] },
      { name: 'bg-overlay', light: 'gray-950', dark: 'gray-800', usage: 'Default background color for background overlays (with 70% percent opacity).' },
      { name: 'bg-brand-primary', light: 'brand-50', dark: 'brand-500', usage: 'The primary brand background color. Useful for components such as check icons.' },
      { name: 'bg-brand-secondary', light: 'brand-100', dark: 'brand-600', usage: 'The secondary brand background color. Useful for components such as featured icons.' },
      { name: 'bg-brand-solid', light: 'brand-500', dark: 'brand-600', usage: 'Default solid (dark) brand background color. Useful for components such as toggles and CTA buttons.', children: [
        { name: 'bg-brand-solid_hover', light: 'brand-600', dark: 'brand-500', usage: 'Solid brand background color when in hover state.' },
      ] },
      { name: 'bg-error-primary', light: 'error-50', dark: 'error-500', usage: 'Primary error state background color for components.' },
      { name: 'bg-error-secondary', light: 'error-100', dark: 'error-600', usage: 'Secondary error state background color for components such as featured icons.' },
      { name: 'bg-error-solid', light: 'error-600', dark: 'error-600', usage: 'Default solid (dark) error state background color.' },
      { name: 'bg-error-solid-hover', light: 'error-700', dark: 'error-600', usage: 'Hover solid (dark) error state background color.' },
      { name: 'bg-warning-primary', light: 'warning-50', dark: 'warning-500', usage: 'Primary warning state background color for components.' },
      { name: 'bg-warning-secondary', light: 'warning-100', dark: 'warning-600', usage: 'Secondary warning state background color for components such as featured icons.' },
      { name: 'bg-warning-solid', light: 'warning-600', dark: 'warning-600', usage: 'Default solid (dark) warning state background color for components such as featured icons.' },
      { name: 'bg-success-primary', light: 'success-50', dark: 'success-500', usage: 'Primary success state background color for components.' },
      { name: 'bg-success-secondary', light: 'success-100', dark: 'success-600', usage: 'Secondary success state background color for components such as featured icons.' },
      { name: 'bg-success-solid', light: 'success-600', dark: 'success-600', usage: 'Default solid (dark) success state background color for components such as featured icons and metric items.' },
    ],
  },
  {
    title: 'Border color',
    subtitle: 'Use border color variables to manage all stroke colors.',
    rows: [
      { name: 'border-primary', light: 'gray-300', dark: 'gray-700', usage: 'High contrast borders. These are used for components such as input fields, button groups, checkboxes and radiobuttons.' },
      { name: 'border-secondary', light: 'gray-200', dark: 'gray-800', usage: 'Medium contrast borders. This is the most commonly used border color and is the default for most components (such as file uploaders), cards, tables, and content dividers.' },
      { name: 'border-tertiary', light: 'gray-100', dark: 'gray-800', usage: 'Low contrast borders useful for very subtle dividers and borders.' },
      { name: 'border-disabled', light: 'gray-300', dark: 'gray-700', usage: 'Default disabled border color for disabled states in components such as input fields and checkboxes.', children: [
        { name: 'border-disabled_subtle', light: 'gray-200', dark: 'gray-800', usage: 'A more subtle (lower contrast) alternative for disabled borders such as disabled buttons.' },
      ] },
      { name: 'border-brand', light: 'brand-300', dark: 'brand-100', usage: 'Default brand border color. Useful for focused states in components.' },
      { name: 'border-brand-solid', light: 'brand-500', dark: 'brand-300', usage: 'Default solid (dark) brand border color. Useful for active states in components.' },
      { name: 'border-error', light: 'error-300', dark: 'error-400', usage: 'Default error state semantic border color. Useful for focused error states.' },
      { name: 'border-error-solid', light: 'error-600', dark: 'error-500', usage: 'Default solid (dark) error state semantic border color. Useful for active error states.' },
    ],
  },
  {
    title: 'Foreground color',
    subtitle: 'Use foreground color variables to manage all non-text foreground elements.',
    rows: [
      { name: 'fg-primary', light: 'gray-900', dark: 'white', usage: 'Highest contrast non-text foreground elements such as icons.' },
      { name: 'fg-secondary', light: 'gray-700', dark: 'gray-300', usage: 'High contrast non-text foreground elements such as icons.', children: [
        { name: 'fg-secondary_hover', light: 'gray-800', dark: 'gray-200', usage: 'Secondary foreground elements when in hover state.' },
      ] },
      { name: 'fg-tertiary', light: 'gray-600', dark: 'gray-400', usage: 'Medium contrast non-text foreground elements such as icons.', children: [
        { name: 'fg-tertiary_hover', light: 'gray-700', dark: 'gray-300', usage: 'Tertiary foreground elements when in hover state.' },
      ] },
      { name: 'fg-quaternary', light: 'gray-500', dark: 'gray-400', usage: 'Medium-low contrast non-text foreground elements such as icons.', children: [
        { name: 'fg-quaternary_hover', light: 'gray-600', dark: 'gray-300', usage: 'Quaternary foreground elements when in hover state.' },
      ] },
      { name: 'fg-quinary', light: 'gray-400', dark: 'gray-500', usage: 'Low contrast non-text foreground elements such as help icons.', children: [
        { name: 'fg-quinary_hover', light: 'gray-500', dark: 'gray-400', usage: 'Quinary foreground elements when in hover state, such as help icons.' },
      ] },
      { name: 'fg-senary', light: 'gray-300', dark: 'gray-600', usage: 'Lowest contrast non-text foreground elements such as breadcrumb divider icons. Used very sparingly.' },
      { name: 'fg-white', light: 'white', dark: 'white', usage: 'Foreground elements that are always white, regardless of the mode.' },
      { name: 'fg-disabled', light: 'gray-400', dark: 'gray-500', usage: 'Default color for disabled non-text foreground elements such as icons in disabled button group buttons and input dropdown menu items.', children: [
        { name: 'fg-disabled_subtle', light: 'gray-300', dark: 'gray-600', usage: 'A more subtle (lower contrast) alternative for non-text disabled foreground elements such as disabled active checkboxes and tag checkboxes.' },
      ] },
      { name: 'fg-brand-primary', light: 'brand-500', dark: 'brand-500', usage: 'Primary brand color non-text foreground elements such as featured icons.' },
      { name: 'fg-brand-secondary', light: 'brand-300', dark: 'gray-300', usage: 'Secondary brand color non-text foreground elements such as accents.' },
      { name: 'fg-brand-solid', light: 'brand-700', dark: 'brand-500', usage: 'Solid brand color non-text foreground elements such as icons.' },
      { name: 'fg-error-primary', light: 'error-600', dark: 'error-500', usage: 'Primary error state color for non-text foreground elements such as featured icons.' },
      { name: 'fg-error-solid', light: 'error-700', dark: 'error-500', usage: 'Solid error state color for non-text foreground elements such as icons in error state input fields and negative metrics item charts and icons.' },
      { name: 'fg-error-secondary', light: 'error-500', dark: 'error-400', usage: 'Secondary error state color for non-text foreground elements such as negative metrics item charts and icons.' },
      { name: 'fg-warning-primary', light: 'warning-600', dark: 'warning-500', usage: 'Primary warning state color for non-text foreground elements such as featured icons.' },
      { name: 'fg-warning-secondary', light: 'warning-500', dark: 'warning-400', usage: 'Secondary warning state color for non-text foreground elements.' },
      { name: 'fg-success-primary', light: 'success-600', dark: 'success-500', usage: 'Primary success state color for non-text foreground elements such as featured icons.' },
      { name: 'fg-success-secondary', light: 'success-500', dark: 'success-400', usage: 'Secondary success state color for non-text foreground elements such as button dots, avatar online indicator dots, and negative metrics item charts and icons.' },
    ],
  },
];

/* ---- layout constants ---- */
const GRID = 'minmax(220px, 260px) 168px 168px minmax(340px, 1fr)';
const CELL_PAD_TOP = 16;
const SPINE_X = 12; // x of the tree connector's vertical line, within the Name cell
const PILL_CENTER = CELL_PAD_TOP + 12; // vertical centre of a pill from the cell top
const SPINE = '1.5px solid var(--border-primary)';

const cell = {
  padding: `${CELL_PAD_TOP}px 20px 16px 0`,
  borderTop: '1px solid var(--border-secondary)',
  minWidth: 0,
};

/* Split a token name into its base and its variant suffix (the `_hover`,
   `_subtle`, `_on-brand` part), so the suffix can be de-emphasised. */
function splitName(name) {
  const i = name.indexOf('_');
  if (i === -1) return [name, ''];
  return [name.slice(0, i), name.slice(i)];
}

function Pill({ name, variant }) {
  const [base, suffix] = splitName(name);
  const isChild = variant === 'child';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-data)',
        fontSize: 13,
        fontWeight: 500,
        whiteSpace: 'nowrap',
        background: isChild ? 'var(--bg-secondary)' : 'var(--bg-primary)',
        border: `1px solid ${isChild ? 'var(--border-secondary)' : 'var(--border-primary)'}`,
        color: isChild ? 'var(--text-tertiary)' : 'var(--text-secondary)',
        boxShadow: isChild ? 'none' : 'var(--shadow-xs)',
      }}
    >
      {base}
      {suffix && <span style={{ color: 'var(--text-quaternary)' }}>{suffix}</span>}
    </span>
  );
}

function NameCell({ row }) {
  if (!row.isChild) {
    return (
      <div style={{ position: 'relative' }}>
        {row.hasChildren && (
          // stub descending from this parent pill toward its children
          <span style={{ position: 'absolute', left: SPINE_X, top: PILL_CENTER, bottom: -1, borderLeft: SPINE }} />
        )}
        <Pill name={row.name} variant="top" />
      </div>
    );
  }
  return (
    <div style={{ position: 'relative', paddingLeft: 34 }}>
      {/* elbow: down from the row top, then right into the pill */}
      <span
        style={{
          position: 'absolute',
          left: SPINE_X,
          top: -1,
          width: 16,
          height: PILL_CENTER + 1,
          borderLeft: SPINE,
          borderBottom: SPINE,
          borderBottomLeftRadius: 8,
        }}
      />
      {/* continue the spine down to the next sibling */}
      {!row.isLastChild && (
        <span style={{ position: 'absolute', left: SPINE_X, top: -1, bottom: -1, borderLeft: SPINE }} />
      )}
      <Pill name={row.name} variant="child" />
    </div>
  );
}

function ModeCell({ scale, mode }) {
  const dark = mode === 'dark';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        maxWidth: '100%',
        padding: '4px 12px 4px 5px',
        borderRadius: 'var(--radius-sm)',
        background: dark ? 'var(--gray-950)' : 'var(--bg-primary)',
        border: `1px solid ${dark ? 'var(--gray-800)' : 'var(--border-secondary)'}`,
        color: dark ? 'var(--gray-50)' : 'var(--text-secondary)',
        fontFamily: 'var(--font-data)',
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      <span
        style={{
          flex: '0 0 auto',
          width: 20,
          height: 20,
          borderRadius: 4,
          background: `var(${scaleVar(scale)})`,
          boxShadow: `inset 0 0 0 1px ${dark ? 'rgba(255,255,255,0.18)' : 'rgba(16,24,40,0.12)'}`,
        }}
      />
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{scale}</span>
    </span>
  );
}

function Table({ section }) {
  // flatten parents + their children into ordered rows with connector metadata
  const rows = [];
  for (const r of section.rows) {
    rows.push({ ...r, hasChildren: !!r.children });
    if (r.children) {
      r.children.forEach((c, i) =>
        rows.push({ ...c, isChild: true, isLastChild: i === r.children.length - 1 }),
      );
    }
  }

  const headStyle = {
    padding: '0 20px 10px 0',
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-quaternary)',
    borderBottom: '1px solid var(--border-secondary)',
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: GRID, minWidth: 940, alignItems: 'start' }}>
        <div style={headStyle}>Name</div>
        <div style={headStyle}>Light mode</div>
        <div style={headStyle}>Dark mode</div>
        <div style={headStyle}>Usage</div>

        {rows.map((row) => (
          <React.Fragment key={row.name}>
            <div style={cell}><NameCell row={row} /></div>
            <div style={cell}><ModeCell scale={row.light} mode="light" /></div>
            <div style={cell}><ModeCell scale={row.dark} mode="dark" /></div>
            <div style={{ ...cell, fontSize: 14, lineHeight: 1.5, color: 'var(--text-tertiary)' }}>{row.usage}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export const Usage = {
  render: () => (
    <div style={{ padding: 32, background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <header style={{ marginBottom: 40, maxWidth: 720 }}>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 600, color: 'var(--text-primary)' }}>Color usage</h2>
        <p style={{ margin: '6px 0 0', fontSize: 15, lineHeight: 1.5, color: 'var(--text-tertiary)' }}>
          Each semantic token and the raw scale value it resolves to in light and dark mode. Swatch
          colors read from the primitive scales in tokens.css; the light/dark mappings and usage
          notes come from the Figma design system.
        </p>
      </header>

      {SECTIONS.map((section) => (
        <section key={section.title} style={{ marginBottom: 48 }}>
          <h3 className="t-lg-semibold" style={{ margin: '0 0 2px', color: 'var(--text-primary)' }}>
            {section.title}
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--text-tertiary)' }}>{section.subtitle}</p>
          <Table section={section} />
        </section>
      ))}
    </div>
  ),
};
