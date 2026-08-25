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
- **Add new share** — a full 6-step wizard (route replaces the main content, per
  the design). Each step has its own URL for usability testing:
  `/shares/new` (Storage type), `/shares/new/storage` (Storage settings),
  `/shares/new/details`, `/shares/new/features`, `/shares/new/users`,
  `/shares/new/review`. Wizard state is held by the layout so it persists across
  step navigation.
  1. Storage type — accordion of provider categories (SMB, OneDrive, SharePoint,
     Azure Blob, Azure Files, S3) with radio selection.
  2. Storage settings — required Path field.
  3. Share details — Name + Drive-letter select.
  4. Features — Download / Office online editing / Public sharing toggles.
  5. Users & Groups — permission matrix (Web/Mapped/Mobile/Download/Public
     sharing/Office Online edit + disabled Guest access), populated via the
     two-pane "Add Users & Groups" modal (searchable directory, All/Users/Groups
     filter, assign/remove).
  6. Review & Confirm — per-section summaries with Edit links and a check/✗
     permission matrix.
  A completed wizard creates the share and it appears at the top of the Shares
  table (in-memory `SharesContext`). Navigating away mid-wizard via the sidebar
  raises the "Leave wizard?" confirmation.

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
