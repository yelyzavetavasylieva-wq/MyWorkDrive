import React from 'react';
import * as Icons from '../ui/fluent/index.js';

// Foundations/Fluent icons — browsable gallery of the generated Microsoft Fluent
// System Icons (Regular theme). Searchable, with a size selector that exercises
// each icon's per-size SVG content. Separate from Foundations/Icons, which is
// the small in-app icon set (src/ui/icons.jsx).
const meta = {
  title: 'Foundations/Fluent icons',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

const ALL = Object.entries(Icons)
  .filter(([, v]) => typeof v === 'function')
  .sort((a, b) => a[0].localeCompare(b[0]));

const SIZES = [16, 20, 24, 28, 48];
const RENDER_CAP = 900; // keep the grid responsive; refine search to see more

function Gallery() {
  const [query, setQuery] = React.useState('');
  const [size, setSize] = React.useState(24);

  const q = query.trim().toLowerCase();
  const matches = React.useMemo(
    () => (q ? ALL.filter(([name]) => name.toLowerCase().includes(q)) : ALL),
    [q],
  );
  const shown = matches.slice(0, RENDER_CAP);

  const inputStyle = {
    flex: 1, minWidth: 240, padding: '10px 14px', fontSize: 14,
    border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)', background: 'var(--bg-primary)',
  };
  const sizeBtn = (s) => ({
    padding: '6px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
    borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-primary)',
    background: s === size ? 'var(--bg-brand-solid)' : 'var(--bg-primary)',
    color: s === size ? 'var(--text-white)' : 'var(--text-secondary)',
  });

  return (
    <div style={{ padding: 32, background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <header style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 600, color: 'var(--text-primary)' }}>Fluent icons</h2>
        <p style={{ margin: '6px 0 0', fontSize: 15, color: 'var(--text-tertiary)' }}>
          Microsoft Fluent System Icons (Regular). {ALL.length.toLocaleString()} components — one per icon,
          each with a <code>size</code> prop. MIT licensed; see <code>src/ui/fluent/README.md</code>.
        </p>
      </header>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 24, position: 'sticky', top: 0, background: 'var(--bg-primary)', paddingBottom: 12, zIndex: 1 }}>
        <input
          style={inputStyle}
          placeholder="Search icons (e.g. arrow, calendar, folder)…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div style={{ display: 'flex', gap: 6 }}>
          {SIZES.map((s) => (
            <button key={s} type="button" style={sizeBtn(s)} onClick={() => setSize(s)}>{s}</button>
          ))}
        </div>
      </div>

      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-quaternary)' }}>
        Showing {Math.min(shown.length, matches.length).toLocaleString()} of {matches.length.toLocaleString()}
        {matches.length > RENDER_CAP && ' — refine your search to narrow the results.'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
        {shown.map(([name, Icon]) => (
          <div key={name} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            padding: '20px 12px', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)',
            color: 'var(--fg-secondary)', textAlign: 'center',
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 48 }}>
              <Icon size={size} />
            </span>
            <code style={{ fontSize: 11, color: 'var(--text-tertiary)', wordBreak: 'break-word' }}>{name}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

export const AllIcons = { render: () => <Gallery /> };
