// Generate React icon components from Microsoft Fluent System Icons (MIT).
//
// Source: the @fluentui/svg-icons package (install with
//   npm install --no-save @fluentui/svg-icons
// or add it as a devDependency). It ships the same SVGs that the Figma
// "System icons" library exports, already hand-optimized per size.
//
// Output: one React component per icon under src/ui/fluent/, each accepting a
// `size` prop that swaps the real per-size SVG content, plus an index.js barrel
// and a README (license). Regular theme only; sizes 16/20/24/28/48.
//
// Usage:
//   node scripts/generate-fluent-icons.mjs            # full run (all icons)
//   node scripts/generate-fluent-icons.mjs --pilot    # ~16 sample icons only
//
// This script is the source of truth for the generated files — regenerate
// rather than hand-editing src/ui/fluent/*.jsx.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'node_modules/@fluentui/svg-icons/icons');
const OUT = path.join(ROOT, 'src/ui/fluent');
const WANT = [16, 20, 24, 28, 48];
const DEFAULT_SIZE = 20; // most-used icon size in this codebase
const PILOT = process.argv.includes('--pilot');
const PILOT_LIST = [
  'access_time', 'accessibility', 'add', 'alert', 'archive_clock', 'arrow_left',
  'calendar_ltr', 'checkmark', 'delete', 'edit', 'folder', 'home', 'search',
  'settings', 'square_text_arrow_repeat_all', 'star', 'warning',
];

const pascal = (base) =>
  base.split(/[_-]/).filter(Boolean).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
const componentName = (base) => pascal(base) + 'Icon';

// Ink fills → currentColor; preserve white knockouts. Attribute-less paths
// inherit currentColor from the root <svg fill="currentColor">.
function inkToCurrentColor(s) {
  return s.replace(/fill="#(?:242424|212121|000000|000)"/gi, 'fill="currentColor"');
}
// Hyphenated SVG attrs → camelCase so the markup is valid JSX.
const HYPHEN_ATTRS = [
  'clip-path', 'fill-rule', 'clip-rule', 'stroke-width', 'stroke-linecap',
  'stroke-linejoin', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-miterlimit',
  'stroke-opacity', 'fill-opacity',
];
function camelAttrs(s) {
  let out = s;
  for (const a of HYPHEN_ATTRS) {
    const camel = a.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out = out.replace(new RegExp(a + '=', 'g'), camel + '=');
  }
  return out;
}

function innerAndViewBox(svg) {
  const vb = (svg.match(/viewBox="([^"]+)"/) || [, ''])[1];
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return { vb, inner: camelAttrs(inkToCurrentColor(inner.trim())) };
}

// --- gather ---
const files = fs.readdirSync(SRC).filter((f) => f.endsWith('_regular.svg'));
const icons = new Map(); // base -> Map(size -> {vb, inner})
for (const f of files) {
  const m = f.match(/^(.+)_(\d+)_regular\.svg$/);
  if (!m) continue;
  const base = m[1];
  const size = Number(m[2]);
  // Keep all sizes: in-scope sizes are used normally; icons that have NONE of
  // the in-scope sizes fall back to their native (out-of-scope, e.g. 32px) art.
  if (!icons.has(base)) icons.set(base, new Map());
  const svg = fs.readFileSync(path.join(SRC, f), 'utf8');
  icons.get(base).set(size, innerAndViewBox(svg));
}

// --- select ---
let bases = [...icons.keys()].filter((b) => icons.get(b).size > 0).sort();
const report = { orphansIncluded: [], missingSizes: [], collisions: [], generated: 0 };
if (PILOT) {
  const found = PILOT_LIST.filter((b) => icons.has(b));
  report.pilotMissing = PILOT_LIST.filter((b) => !icons.has(b));
  bases = found.sort();
}

// Case-insensitive name uniqueness. Windows/macOS filesystems are
// case-insensitive, so two components whose names differ only in case (e.g.
// ReOrderIcon vs ReorderIcon) would clobber each other on disk. Disambiguate
// deterministically (bases are processed in sorted order) and flag.
const usedLower = new Map(); // lowerName -> base that claimed it
function uniqueName(base) {
  const orig = componentName(base);
  const lower = orig.toLowerCase();
  if (!usedLower.has(lower)) { usedLower.set(lower, base); return orig; }
  let n = 2, alt;
  do { alt = orig.replace(/Icon$/, n + 'Icon'); n++; } while (usedLower.has(alt.toLowerCase()));
  report.collisions.push({ base, wanted: orig, renamedTo: alt, clashesWith: usedLower.get(lower) });
  usedLower.set(alt.toLowerCase(), base);
  return alt;
}

// --- emit ---
fs.mkdirSync(OUT, { recursive: true });
// On a full run, clear previously generated component files to avoid stale ones.
if (!PILOT) {
  for (const f of fs.readdirSync(OUT)) {
    if (f.endsWith('.jsx')) fs.rmSync(path.join(OUT, f));
  }
}

const barrel = [];
for (const base of bases) {
  const name = uniqueName(base);
  const full = icons.get(base);
  const inScope = new Map([...full].filter(([s]) => WANT.includes(s)));
  const sizeMap = inScope.size ? inScope : full; // orphans use native (32px) art
  const sizes = [...sizeMap.keys()].sort((a, b) => a - b);
  if (inScope.size === 0) {
    report.orphansIncluded.push({ base, sizes });
  } else {
    const missing = WANT.filter((s) => !sizeMap.has(s));
    if (missing.length) report.missingSizes.push({ base, have: sizes, missing });
  }

  const vEntries = sizes.map((s) => `  ${s}: '${sizeMap.get(s).vb}',`).join('\n');
  const cEntries = sizes.map((s) => `  ${s}: (<>${sizeMap.get(s).inner}</>),`).join('\n');

  const code = `// ${name} — Microsoft Fluent System Icons (Regular theme).
// Auto-generated by scripts/generate-fluent-icons.mjs — do not edit by hand.
// Source: @fluentui/svg-icons (MIT). See ./README.md.
import React from 'react';

const V = {
${vEntries}
};
const C = {
${cEntries}
};
const SIZES = [${sizes.join(', ')}];

function pick(size) {
  if (C[size]) return size;
  let best = SIZES[0], bd = Infinity;
  for (const s of SIZES) { const d = Math.abs(s - size); if (d < bd) { bd = d; best = s; } }
  return best;
}

export function ${name}({ size = ${DEFAULT_SIZE}, ...props }) {
  const k = pick(size);
  return (
    <svg width={size} height={size} viewBox={V[k]} fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>{C[k]}</svg>
  );
}
`;
  fs.writeFileSync(path.join(OUT, `${name}.jsx`), code);
  barrel.push(`export { ${name} } from './${name}.jsx';`);
  report.generated++;
}

// --- MyWorkDrive app icons (migrated from src/ui/icons.jsx) ---
// These are hand-exported single-size, often non-square SVGs. We emit them with
// the same size-prop pattern, preserving aspect ratio, and keep their existing
// IconXxx names (no clash with the XxxIcon library components). Extracted from
// icons.jsx so re-running keeps them in sync.
report.customIcons = 0;
const ICONS_JSX = path.join(ROOT, 'src/ui/icons.jsx');
if (fs.existsSync(ICONS_JSX)) {
  const src = fs.readFileSync(ICONS_JSX, 'utf8');
  const re = /export function (Icon\w+)\(props\)\s*\{[\s\S]*?<svg([^>]*)>([\s\S]*?)<\/svg>/g;
  let m;
  while ((m = re.exec(src))) {
    const [, name, attrs, innerRaw] = m;
    const vb = (attrs.match(/viewBox="([^"]+)"/) || [, ''])[1];
    const vbParts = vb.split(/\s+/).map(Number);
    const w = Number((attrs.match(/width="([\d.]+)"/) || [, vbParts[2] || 0])[1]);
    const h = Number((attrs.match(/height="([\d.]+)"/) || [, vbParts[3] || 0])[1]);
    const inner = innerRaw.trim();
    const lower = name.toLowerCase();
    if (usedLower.has(lower)) {
      report.collisions.push({ base: 'icons.jsx:' + name, wanted: name, renamedTo: '(skipped)', clashesWith: usedLower.get(lower) });
      continue;
    }
    usedLower.set(lower, 'icons.jsx');
    const code = `// ${name} — MyWorkDrive app icon (migrated from src/ui/icons.jsx).
// Auto-generated by scripts/generate-fluent-icons.mjs — do not edit by hand.
import React from 'react';

const VB = '${vb}';
const NW = ${w}, NH = ${h};

export function ${name}({ size = ${DEFAULT_SIZE}, ...props }) {
  const s = size / Math.max(NW, NH); // fit within a size×size box, preserving aspect
  return (
    <svg width={+(NW * s).toFixed(3)} height={+(NH * s).toFixed(3)} viewBox={VB} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>${inner}</svg>
  );
}
`;
    fs.writeFileSync(path.join(OUT, `${name}.jsx`), code);
    barrel.push(`export { ${name} } from './${name}.jsx';`);
    report.generated++;
    report.customIcons++;
  }
  barrel.sort();
}

// barrel
fs.writeFileSync(path.join(OUT, 'index.js'),
  `// Auto-generated barrel for Fluent System Icon components. Do not edit by hand.\n${barrel.join('\n')}\n`);

// report
const summary = {
  mode: PILOT ? 'pilot' : 'full',
  totalIconsDiscovered: icons.size,
  generated: report.generated,
  customAppIcons: report.customIcons,
  iconsMissingSomeSize: report.missingSizes.length,
  orphansIncludedOutOfScopeSize: report.orphansIncluded.length,
  nameCollisions: report.collisions.length,
  pilotMissing: report.pilotMissing || undefined,
};
fs.writeFileSync(path.join(ROOT, 'scripts/.fluent-report.json'),
  JSON.stringify({ summary, ...report }, null, 2));
console.log(JSON.stringify(summary, null, 2));
if (report.collisions.length) {
  console.log('CASE-INSENSITIVE COLLISIONS (disambiguated):');
  for (const c of report.collisions) console.log(`  ${c.base}: ${c.wanted} -> ${c.renamedTo} (clashes with base "${c.clashesWith}")`);
}
