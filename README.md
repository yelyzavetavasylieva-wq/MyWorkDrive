# MyWorkDrive Admin Panel — prototype

A working React prototype of the MyWorkDrive Admin Panel, implemented as a
faithful design-to-code reproduction of the provided Figma designs. This is a
standalone project, unrelated to any other prototype in this account.

## Status

- **Shares** — fully implemented, pixel-faithful to the Figma "Sidebar behaviour /
  Shares" frames, including all interaction states.
- **Settings, Integrations, Clustering, Devices, Public sharing, User activity,
  Health** — real routes that render a neutral placeholder. They are intentionally
  *not* designed here; their screens will be built once their Figma designs are
  provided. No new UX was invented for them.

## What works on the Shares screen

- Collapsible sidebar (260 ↔ 72 px) with tooltips on the collapsed rail.
- User menu popover with a nested language switcher (7 languages + flags).
- "Log out of MyWorkDrive?" confirmation modal (blurred overlay).
- Data table: row selection (+ select-all/indeterminate), sort by Name,
  status/feature/storage iconography, truncation with "More", pagination.
- Search filter and the "Enable drive letter assignment" toggle, which reveals
  the Drive Letter column exactly as the toggle's description states.

## Design fidelity

- Tokens (color, spacing, radius, shadow, type) are extracted verbatim from the
  Figma UI kit into [`src/styles/tokens.css`](src/styles/tokens.css).
- Icons and brand/storage logos are the Figma-exported SVGs, converted to React
  components ([`src/ui/icons.jsx`](src/ui/icons.jsx),
  [`src/ui/logos.jsx`](src/ui/logos.jsx)). Monochrome icons use `currentColor`
  for state theming; multi-color logos keep their original fills.
- Type: Segoe UI Variable (design default; system font on Windows) with an Inter
  fallback loaded for table cell values, matching the design.
- The only authored (non-exported) assets are the national flags in
  [`src/ui/Flags.jsx`](src/ui/Flags.jsx) — standard flags with no bespoke artwork.

## Stack

Vite 8 · React 19 · React Router. Plain CSS with design tokens (no CSS framework).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Structure

```
src/
  main.jsx            Router + global style imports
  App.jsx             Routes (Shares + placeholders)
  layout/             AppShell, Sidebar, UserMenu, LogoutModal
  pages/              SharesPage, Placeholder
  ui/                 icons, logos, Flags, Tooltip, Toggle, Checkbox, Pagination
  data/shares.js      Sample data mirroring the Figma table
  styles/             tokens, global, layout, components
```
