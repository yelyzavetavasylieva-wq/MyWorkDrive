# MyWorkDrive Admin — project guide

Standalone admin-panel prototype for **MyWorkDrive**. This is its own project and git repo — it is **not** part of, or subsidiary to, any other project (e.g. "PM Engine"). Treat this folder as the project root.

## What this is
A design-to-code prototype of the MyWorkDrive admin panel, reproduced faithfully from a Figma design. It is a **frontend-only prototype**: there is no backend/API. All data is in-memory sample data and resets on reload.

## Stack
- **Vite 8** + **React 19** + **React Router 7**, plain CSS with design tokens (no CSS framework).
- **Storybook 10** (`@storybook/react-vite`) for the component library.
- Lint: `oxlint`.

## Run
- App: `npm run dev` → http://localhost:5173 (falls back to 5174 if busy).
- Storybook: `npm run storybook` → http://localhost:6006.
- Build: `npm run build`; Storybook build: `npm run build-storybook`.

## Source of truth
Figma file key `2KzrZEcTwc7s3W46RI1eUN` ("MyWorkDrive"), one page "UI kit" containing the design system plus a "Sidebar behaviour" section with the Shares screen. This is a **design-to-code** effort — reproduce the design faithfully; do **not** redesign or invent UX for undesigned screens. Only build components that exist in the design/code; do not fabricate Figma-only components.

## What's implemented
- **App shell** (`src/layout/`): collapsible sidebar, user menu + language submenu, logout modal, and a "Leave wizard?" guard modal shown when navigating away from the wizard via the sidebar.
- **Shares page** (`src/pages/SharesPage.jsx`): table with search, name sort, row selection, pagination, and a "drive letter assignment" toggle that reveals a Drive Letter column.
- **Add new share** wizard (`src/pages/AddSharePage.jsx` + `src/pages/addshare/`): 6 steps — Storage Type → Storage Settings → Share Details → Features → Users & Groups → Review & Confirm. Storage Settings is **provider-specific** (schema in `src/data/wizard.js` → `STORAGE_SETTINGS`); switching provider resets entered settings; validation is gating-based (the Next button is disabled until each step's requirements are met); creation is in-memory via `src/store/SharesContext.jsx` (`addShare`).
- The other nav areas (Settings, Integrations, Clustering, Devices, Public sharing, User activity, Health) are routed **placeholders** awaiting designs.
- Full product documentation of the Add New Share flow lives in `docs/` (`add-new-share-spec.md` and `add-new-share-product-doc.md`).

## Structure
- `src/pages/` — screens; `src/pages/addshare/` — wizard steps + modals.
- `src/layout/` — shell, sidebar, modals.
- `src/ui/` — reusable components (`Toggle`, `Checkbox`, `Pagination`, `Tooltip`) and Figma-exported SVGs: `icons.jsx` (monochrome, `currentColor`), `logos.jsx` (colored storage/app logos), `wizard-icons.jsx`. `Flags.jsx` holds authored national flags (the only non-exported assets).
- `src/data/` — sample data + constants (`shares.js`, `wizard.js`).
- `src/store/` — `SharesContext` (in-memory shares list).
- `src/styles/` — `tokens.css` (design tokens extracted from Figma), `global.css`, `layout.css`, `components.css`, `wizard.css`. No `@media` queries — the app is not responsive.

## Storybook
Stories are grouped **Foundations → Design System → Components** (sort order in `.storybook/preview.jsx`, which also imports all five global stylesheets so components render with real tokens).
- **Foundations**: Colors, Color usage, Typography, Icons, Storage logos, Flags (galleries auto-generated via `import * as`).
- **Design System** (CSS-class primitives rendered as markup): Buttons, Text field, Select, Search field, Chip, Badges, Featured icon, Info banner, Breadcrumbs, Alert, Tabs, Progress bar, Tag, Label, Notification, Page header, Table, Sidebar navigation, Metric item, Integration card, Date picker.
- **Components** (real React components): Toggle, Checkbox, Tooltip, Pagination, Stepper, Modals.
The whole Figma "UI kit" page is now storied. Elements already used by the app (Page header, Table, Sidebar navigation) reference their existing CSS; the remaining Figma-only pieces (Tabs, Progress bar, Tag, Label, Notification, Metric item, Integration card, Date picker) were built as faithful CSS under the "UI-kit catalog components" section of `components.css`. Only the **File type icon** set (~40 SVGs) is intentionally still out of scope.

## Conventions
- Match existing code style: plain CSS with tokens, semantic class names, `currentColor` icons via `icon-box`/`icon-NN` sizing classes.
- Keep the design faithful to Figma; extract SVGs from Figma rather than authoring new artwork (flags excepted).
- Prototype only: keep everything client-side; no real credentials or network calls.
