import React from 'react';

// Foundations/Colors — the design-system palette, grouped by tonal family
// exactly as the Figma "UI kit → Colors" page presents it.
//
// Source of truth: the primitive color scales live as CSS variables in
// src/styles/tokens.css (--gray-25 … --gray-950, --brand-*, --error-*, etc.).
// This story reads those values at runtime via getComputedStyle rather than
// hardcoding hex, so the page can never drift from the tokens.
//
// Each shade card renders the color as its own background and shows a WCAG
// contrast badge. The ratio measured is the contrast of the card's *own label
// text* against the swatch — i.e. how readable a label sits on that color —
// which is what the Figma page reports (a swatch-vs-page-background ratio would
// be ~1.0 for every pale shade and tell you nothing). The label/badge color
// auto-switches between a light and a dark "on-color" per swatch luminosity so
// it stays legible on every shade.

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

/* ---- WCAG contrast maths (sRGB relative luminance, WCAG 2.1) ---- */
function channel(v) {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function luminance(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}
function contrast(hexA, hexB) {
  const la = luminance(hexA);
  const lb = luminance(hexB);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}
function grade(ratio) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  return null; // below AA — shown as a bare, de-emphasised ratio
}

/* ---- Palette definition ----
   Only structure + copy live here; every hex is read from the CSS token.
   `onColor` is the dark text token used on light shades; the card picks
   whichever of white / onColor is more readable against each swatch. */
const SHADES = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const GRAY_SHADES = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const FAMILIES = [
  {
    name: 'Gray',
    description: 'Gray is a neutral color and is the foundation of the color system.',
    prefix: 'gray',
    shades: GRAY_SHADES,
    onColor: '--gray-600',
  },
  {
    name: 'Brand',
    description:
      'The brand color is your "primary" color, and is used across all interactive elements such as buttons, inputs, etc.',
    prefix: 'brand',
    shades: SHADES,
    onColor: '--gray-600',
  },
  {
    name: 'Error',
    description:
      'Error colors are used across error states and in "destructive" actions. They communicate a destructive/negative action.',
    prefix: 'error',
    shades: SHADES,
    onColor: '--error-700',
  },
  {
    name: 'Warning',
    description: 'Warning colors can communicate that an action is potentially destructive or "on-hold".',
    prefix: 'warning',
    shades: SHADES,
    onColor: '--warning-700',
  },
  {
    name: 'Success',
    description: 'Success colors communicate a positive action, positive trend, or a successful confirmation.',
    prefix: 'success',
    shades: SHADES,
    onColor: '--success-700',
  },
];

const BASE = {
  name: 'Base',
  description: 'These are base black and white color styles.',
  swatches: [
    { label: 'White', var: '--base-white' },
    { label: 'Black', var: '--base-black' },
    { label: 'Transparent', var: '--base-white', alpha: 0 },
  ],
};

/* Read a CSS custom property off :root and normalise to a 6-digit hex. */
function readToken(name) {
  if (typeof window === 'undefined') return '#000000';
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return raw || '#000000';
}

function ContrastBadge({ ratio, textColor }) {
  const label = grade(ratio);
  const value = ratio.toFixed(2);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 0.2,
        color: textColor,
        opacity: label ? 1 : 0.72, // failing ratios read as a muted warning state
      }}
    >
      {label && <span>{label}</span>}
      <span style={{ fontWeight: label ? 400 : 600 }}>{value}</span>
    </div>
  );
}

function ShadeCard({ shade, hex, onColorHex }) {
  // Auto-switch the label between the light and dark on-colors, keeping the
  // more readable pairing — this is the "luminosity-aware" text swap.
  const onLight = contrast(hex, onColorHex);
  const onWhite = contrast(hex, '#ffffff');
  const textColor = onLight >= onWhite ? onColorHex : '#ffffff';
  const ratio = Math.max(onLight, onWhite);

  return (
    <div
      style={{
        flex: '0 0 auto',
        width: 96,
        minHeight: 92,
        boxSizing: 'border-box',
        background: hex,
        borderRadius: 'var(--radius-md)',
        boxShadow: 'inset 0 0 0 1px rgba(16, 24, 40, 0.08)',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <ContrastBadge ratio={ratio} textColor={textColor} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, color: textColor }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>{shade}</span>
        <span style={{ fontSize: 11, fontWeight: 400, textTransform: 'uppercase', opacity: 0.9 }}>
          {hex}
        </span>
      </div>
    </div>
  );
}

function FamilySection({ family }) {
  const onColorHex = readToken(family.onColor);
  return (
    <section style={{ marginBottom: 44 }}>
      <div style={{ marginBottom: 16, maxWidth: 640 }}>
        <h3 className="t-lg-semibold" style={{ margin: 0, color: 'var(--text-primary)' }}>
          {family.name}
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: 14, lineHeight: 1.5, color: 'var(--text-tertiary)' }}>
          {family.description}
        </p>
      </div>
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
        {family.shades.map((shade) => (
          <ShadeCard
            key={shade}
            shade={shade}
            hex={readToken(`--${family.prefix}-${shade}`)}
            onColorHex={onColorHex}
          />
        ))}
      </div>
    </section>
  );
}

function BaseCard({ swatch }) {
  const hex = readToken(swatch.var);
  const transparent = swatch.alpha === 0;
  // Base cards use pure black/white text for maximum legibility.
  const textColor = luminance(hex) > 0.5 ? '#000000' : '#ffffff';
  const ratio = contrast(hex, textColor);
  return (
    <div
      style={{
        flex: '0 0 auto',
        width: 128,
        minHeight: 92,
        boxSizing: 'border-box',
        background: transparent ? 'var(--bg-primary)' : hex,
        borderRadius: 'var(--radius-md)',
        boxShadow: 'inset 0 0 0 1px rgba(16, 24, 40, 0.08)',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {transparent ? (
        <span style={{ fontSize: 11 }} />
      ) : (
        <ContrastBadge ratio={ratio} textColor={textColor} />
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          color: transparent ? 'var(--text-primary)' : textColor,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 600 }}>{swatch.label}</span>
        <span style={{ fontSize: 11, fontWeight: 400, textTransform: 'uppercase', opacity: 0.9 }}>
          {transparent ? `${hex} 0%` : hex}
        </span>
      </div>
    </div>
  );
}

export const Palette = {
  render: () => (
    <div style={{ padding: 32, background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <header style={{ marginBottom: 40 }}>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 600, color: 'var(--text-primary)' }}>Colors</h2>
        <p style={{ margin: '6px 0 0', fontSize: 15, color: 'var(--text-tertiary)' }}>
          This UI kit leverages a purposeful set of color styles.
        </p>
      </header>

      <section style={{ marginBottom: 44 }}>
        <div style={{ marginBottom: 16, maxWidth: 640 }}>
          <h3 className="t-lg-semibold" style={{ margin: 0, color: 'var(--text-primary)' }}>
            {BASE.name}
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: 14, lineHeight: 1.5, color: 'var(--text-tertiary)' }}>
            {BASE.description}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
          {BASE.swatches.map((s) => (
            <BaseCard key={s.label} swatch={s} />
          ))}
        </div>
      </section>

      {FAMILIES.map((family) => (
        <FamilySection key={family.name} family={family} />
      ))}
    </div>
  ),
};
