# Add New Share

> Specification extracted from the current frontend implementation of the **MyWorkDrive Admin** prototype (`myworkdrive-admin`). It documents behavior as implemented in code. The flow is **frontend-only with an in-memory store — there is no backend/API integration**. Items that cannot be determined from the code are marked **"Not determined from the current implementation."**

---

## 1. Overview

### Purpose
The Add New Share flow lets an admin create a new file share by choosing a storage provider, entering provider-specific connection settings, naming the share and assigning a drive letter, enabling share features, assigning users/groups with per-permission access, and reviewing everything before creation. On confirmation the new share is prepended to the in-memory Shares list.

### Entry Point
- Route `/shares/new`, rendered by `AddSharePage` (registered in `App.jsx`).
- Reached from the **Shares** page (`SharesPage`) via the **"Add new share"** primary button in the page header, which calls `navigate('/shares/new')`.
- There is no other entry point in the code (no deep-link button elsewhere).

### User Goal
Create and configure a new share and have it appear at the top of the Shares table.

### High-Level Flow
1. User clicks **Add new share** on the Shares page → wizard opens at Step 1 (`Storage Type`).
2. User selects a storage provider (`Storage Type`).
3. User fills the provider-specific connection fields (`Storage Settings`).
4. User enters a **Name** and selects a **Drive letter** (`Share Details`).
5. User toggles features (`Features`) — all enabled by default.
6. User assigns users/groups and sets permissions (`Users & Groups`).
7. User reviews all sections (`Review & Confirm`) and clicks **Confirm & create**.
8. `addShare()` prepends the new share to the in-memory list and the app navigates back to `/shares`.

---

## 2. Screen / Layout

The wizard is a single page (`AddSharePage`) with a fixed frame and one step body swapped in by `step` index.

| Order | Section | Purpose | Components / controls | Visibility |
|---|---|---|---|---|
| 1 | **Breadcrumbs** | Context + back to Shares | `Shares` link (`Link to="/shares"`), separator `›`, current crumb "Add new share" | Always |
| 2 | **Page title** | Identifies the flow | `<h1>` "Add new share" | Always |
| 3 | **Stepper** (`Stepper`) | Shows the 6 steps and allows jumping back to completed steps | 6 numbered nodes with labels: `Storage Type`, `Storage Settings`, `Share Details`, `Features`, `Users & Groups`, `Review & Confirm` | Always |
| 4 | **Step body** (`wizard__body`) | Renders the current step | One of: `StepStorageType`, `StepStorageSettings`, `StepShareDetails`, `StepFeatures`, `StepUsers`, `StepReview` | Always (content conditional on `step`) |
| 5 | **Footer** (`wizard__footer`) | Navigation | **Back** button (or empty spacer on step 0); **Next** button (steps 0–4) or **Confirm & create** button (step 5) | Always |

Each step body has a common head (`wz-step__head`): an `<h2>` title and a subtitle.

Overlay layers that can appear over the wizard:
- **Add Users & Groups modal** (`AddUsersModal`) — opened from the `Users & Groups` step.
- **Leave wizard? modal** (`LeaveWizardModal`) — opened from `AppShell` when the user clicks a sidebar nav item while inside the wizard.

---

## 3. Components and Controls

| Component / Control | Type | Purpose | Required? | Default | Options / Values | Conditional behavior |
|---|---|---|---|---|---|---|
| Stepper node | Button / static node | Jump to a step | — | Step 0 active | 6 steps | Clickable only for steps where `i < current` (completed). Active/upcoming are non-clickable |
| Storage provider card | Radio (`name="storage-provider"`) | Choose provider | Yes (to advance) | none selected (`provider = null`) | `smb`, `onedrive`, `sharepoint`, `azureBlob`, `azureFiles`, `s3` | Selecting a provider resets `settings` and `settingsErrors` |
| Accordion header | Button | Expand/collapse a category | — | All expanded | `On premises`, `Microsoft 365`, `Cloud storage` | Toggles the category's provider list |
| Storage setting field | text / password / select | Provider connection details | Per-field (see §6) | empty (`''`) | Depends on provider (see §5/§6) | Field set is entirely determined by the selected provider |
| Region select | Select | S3 region | Yes | empty (placeholder "Select region") | `us-east-1, us-east-2, us-west-1, us-west-2, eu-west-1, eu-central-1, ap-southeast-1, ap-southeast-2, ap-northeast-1` | S3 only |
| Name | Text input | Share name | Yes (to advance) | `''` | free text | — |
| Drive letter | Select | Assigned drive letter | Yes (to advance) | `M:` | `M:, N:, O:, P:, S:, T:, U:, V:, W:, X:, Y:, Z:` | — |
| Feature toggle (`Toggle`) | Switch | Enable a feature | No | **all on** | `download`, `officeOnline`, `publicSharing` | — |
| Search assigned | Text input | Filter assigned users/groups | No | `''` | free text | **Disabled when `rows.length === 0`** |
| Import | Button | (labelled action) | — | — | — | **No click handler — non-functional** |
| Add Users & Groups | Button (primary) | Open the add-users modal | — | — | — | Opens `AddUsersModal` |
| Permission checkbox (`Checkbox`) | Checkbox | Toggle a permission for a row | No | per `defaultPermissions()` | on/off | Rendered for all columns **except** `guest` (which renders `—`) |
| Guest access help (`Tooltip`) | Tooltip | Explain disabled column | — | — | — | Guest column only; label: "Guest access is disabled — turned off in Settings." |
| Pagination (`Pagination`) | Control group | Page navigation | — | page 1 | fixed pages `1 2 3 … 8 9 10`, "Show 10 rows" | **Decorative** in the wizard — no data slicing; "Show N rows" handler is a no-op |
| Modal search | Text input | Filter the directory | No | `''` | free text | Resets when modal opens |
| Filter chip | Button | Filter directory by type | — | `all` | `All`, `Users`, `Groups` | — |
| Directory item | Button | Add/remove a directory entry | — | — | 15 `DIRECTORY` entries | Click toggles assigned; shows "Added" when assigned |
| Remove (assigned) | Button | Remove from assigned pane | — | — | — | Assigned pane only |
| Modal Cancel | Button (secondary) | Close modal without applying | — | — | — | — |
| Modal Confirm | Button (primary) | Apply assignments | — | — | — | **Disabled when no items assigned** |
| Section Edit (Review) | Button | Jump back to a step | — | — | — | `onEdit(index)` sets `step` |
| Back | Button (secondary) | Previous step | — | — | — | Hidden (empty spacer) on step 0 |
| Next | Button (primary) | Next step | — | — | — | **Disabled unless the step's `canNext` is satisfied** |
| Confirm & create | Button (primary) | Create the share | — | — | — | Shown only on step 5; always enabled |

---

## 4. User Flow

### Step 0 — Storage Type (`StepStorageType`)
**User action:** Selects one provider radio card inside the `On premises` / `Microsoft 365` / `Cloud storage` accordions (all expanded by default). Can collapse/expand categories.
**UI response:** Chosen card gets `is-selected`. Any previously entered `settings` are cleared (`changeProvider` resets `settings` and `settingsErrors`).
**System behavior:** `provider` set to the provider key.
**Next state:** **Next** enabled once a provider is chosen (`canNext = !!provider`). → Step 1.

### Step 1 — Storage Settings (`StepStorageSettings`)
**User action:** Fills the provider-specific fields (text / password / select). Subtitle reads "…configure your {provider name} storage." when a provider name resolves.
**UI response:** Each field updates via `changeSetting(key, value)`. Required fields are marked with `*`; a hint line shows under fields that define one.
**System behavior:** `settings[key]` updated; any existing error for that key is cleared.
**Next state:** **Next** enabled when `settingsComplete(provider, settings)` (all required fields non-empty). → Step 2.

### Step 2 — Share Details (`StepShareDetails`)
**User action:** Types a **Name** and picks a **Drive letter**.
**UI response:** Fields reflect `name` / `driveLetter`.
**System behavior:** `name`, `driveLetter` updated.
**Next state:** **Next** enabled when `name.trim().length > 0 && !!driveLetter`. → Step 3.

### Step 3 — Features (`StepFeatures`)
**User action:** Toggles **Download**, **Office online editing**, **Public sharing** (all on by default).
**UI response:** Each `Toggle` reflects its boolean.
**System behavior:** `features[key]` updated via `onToggle`.
**Next state:** **Next** always enabled (`canNext = true`). → Step 4.

### Step 4 — Users & Groups (`StepUsers`)
**User action:** Clicks **Add Users & Groups** to open the modal; assigns entries; sets per-row permission checkboxes; optionally searches assigned rows.
**UI response:** Table lists assigned rows with permission checkboxes (except `guest`, shown as `—`). Empty/no-match states render accordingly. Info banner always shown.
**System behavior:** `rows` (users) updated on modal confirm and on permission change (`setPerm`).
**Next state:** **Next** enabled when `users.length > 0`. → Step 5.

#### Modal branch — Add Users & Groups (`AddUsersModal`)
**User action:** Search/filter the directory; click entries to add/remove; click **Confirm** or **Cancel**.
**UI response:** Left pane marks assigned entries "Added"; right pane lists assigned with remove buttons; empty pane shows guidance.
**System behavior on Confirm:** `handleConfirm(ids)` keeps existing rows whose id is still in `ids` (preserving their permissions), appends newly added ids with `defaultPermissions()`, drops de-selected rows. Modal closes.
**System behavior on Cancel / Escape / overlay click:** Modal closes with no changes applied.
**Next state:** Returns to Step 4.

### Step 5 — Review & Confirm (`StepReview`)
**User action:** Reviews all five sections; may click a section **Edit** to return to that step; clicks **Confirm & create**.
**UI response:** Read-only summary. Storage settings show entered values (password fields masked as `••••••••`, empty optional fields as `—`). Features show Enabled/Disabled; Guest access always "Disabled". Users table renders permissions as check/x icons.
**System behavior:** `confirm()` → `addShare(toShare(state))` prepends `{ ...share, id: Date.now() }` to the in-memory shares; then `navigate('/shares')`.
**Next state:** Shares page, new share at the top of the list.

---

## 5. Conditional Logic

### Condition: Provider selection gates and defines the Storage Settings fields
**IF** `provider` is `smb` **THEN** show: `path`* (text).
**IF** `provider` is `onedrive` **THEN** show: `account`* (text), `rootFolder` (text).
**IF** `provider` is `sharepoint` **THEN** show: `siteUrl`* (text), `library`* (text), `rootFolder` (text).
**IF** `provider` is `azureBlob` **THEN** show: `accountName`* (text), `container`* (text), `accessKey`* (password), `prefix` (text).
**IF** `provider` is `azureFiles` **THEN** show: `accountName`* (text), `fileShare`* (text), `accessKey`* (password), `path` (text).
**IF** `provider` is `s3` **THEN** show: `bucket`* (text), `region`* (select), `endpoint` (text), `accessKeyId`* (text), `secretAccessKey`* (password), `prefix` (text).
(Source: `STORAGE_SETTINGS` in `data/wizard.js`. `*` = required.)

### Condition: Changing provider after entering settings
**IF** the user changes the provider selection **THEN** `changeProvider` resets `settings = {}` and `settingsErrors = {}` (previously entered dependent data is discarded).

### Condition: Step advancement (`canNext`)
**IF** step 0 → require `provider` selected. **IF** step 1 → require `settingsComplete`. **IF** step 2 → require non-empty `name` and a `driveLetter`. **IF** step 3 → always allowed. **IF** step 4 → require `users.length > 0`. **ELSE** (step 5) → allowed. When not satisfied, **Next** is disabled.

### Condition: Stepper back-navigation
**IF** a step index `i < current` **THEN** its node is a clickable button (`Go to {label}`) that sets `step = i`. **ELSE** the node is non-interactive.

### Condition: Footer primary button
**IF** `step < 5` **THEN** render **Next** (`disabled = !canNext`). **ELSE** render **Confirm & create** (always enabled).
**IF** `step > 0` **THEN** render **Back**. **ELSE** render an empty spacer.

### Condition: Guest access permission column
**IF** column key is `guest` (`disabled: true`) **THEN** the header shows a Tooltip and the cells render `—` (no checkbox). **ELSE** render a `Checkbox`. Guest access is not editable anywhere in the flow.

### Condition: Users step search enabled
**IF** `rows.length === 0` **THEN** the "Search assigned" input is disabled. **ELSE** enabled.

### Condition: Users step table body
**IF** `rows.length === 0` **THEN** show "No users or groups assigned" + guidance. **ELSE IF** the query filters out everything **THEN** show `No matches for "{query}"`. **ELSE** show the rows.

### Condition: Modal Confirm enablement
**IF** no items are assigned in the modal **THEN** **Confirm** is disabled. **ELSE** enabled.

### Condition: Leave-wizard guard
**IF** the current path is `/shares/new` (`inWizard`) and the user clicks a **sidebar** nav item **THEN** navigation is intercepted (`preventDefault`) and `LeaveWizardModal` opens with the target label. **ELSE** navigation proceeds normally. (The guard covers sidebar nav items only — see §17.)

---

## 6. Fields and Validation

> Validation across the wizard is **gating-based** (the **Next** button is disabled until the step's `canNext` is met). There are no inline, per-field error messages shown in normal use except the unreachable path noted for Storage Settings (see §17).

### Storage provider (Step 0)
- **Type:** Radio group (`storage-provider`)
- **Required:** Yes (to leave step 0)
- **Default value:** none (`provider = null`)
- **Allowed values:** `smb`, `onedrive`, `sharepoint`, `azureBlob`, `azureFiles`, `s3`
- **Validation rules:** must be selected to advance
- **When validation occurs:** live (Next disabled until selected)
- **Validation message:** none
- **Disabled conditions:** none
- **Visibility conditions:** always (within its accordion category)

### Storage settings fields (Step 1) — vary by provider
- **Type:** `text`, `password`, or `select` per `STORAGE_SETTINGS`
- **Required:** per the field's `required` flag (see §5)
- **Default value:** empty string
- **Allowed values:** free text, except S3 `region` (fixed option list)
- **Validation rules:** required fields must be non-empty/trimmed (`validateSettings` / `settingsComplete`)
- **When validation occurs:** live for Next enablement; `validateSettings` also runs in `goNext` for step 1 and would populate `settingsErrors` (see §17 — effectively unreachable because Next is disabled while incomplete)
- **Validation message (defined but not normally shown):** `"{label} is required."`
- **Disabled conditions:** none
- **Visibility conditions:** only fields belonging to the selected provider

### Name (Step 2)
- **Type:** Text input
- **Required:** Yes (to advance) — value is trimmed before the check and in `toShare`
- **Default value:** `''`
- **Allowed values:** free text
- **Validation rules:** `name.trim().length > 0`
- **When validation occurs:** live (Next disabled)
- **Validation message:** none (no inline error UI on this field)
- **Disabled conditions:** none
- **Visibility conditions:** always
- Duplicate-name / character validation: **Not present in the current implementation.**

### Drive letter (Step 2)
- **Type:** Select
- **Required:** Yes (to advance)
- **Default value:** `M:`
- **Allowed values:** `M:, N:, O:, P:, S:, T:, U:, V:, W:, X:, Y:, Z:` (note: no `Q:`/`R:`)
- **Validation rules:** `!!driveLetter` (always true given the default)
- **When validation occurs:** live
- **Validation message:** none
- **Disabled conditions:** none
- **Visibility conditions:** always

### Features (Step 3): Download / Office online editing / Public sharing
- **Type:** Toggle (boolean)
- **Required:** No
- **Default value:** all **on** (`{ download: true, officeOnline: true, publicSharing: true }`)
- **Allowed values:** on/off
- **Validation rules:** none
- **When validation occurs:** n/a
- **Validation message:** none
- **Disabled conditions:** none
- **Visibility conditions:** always

### Users & Groups (Step 4)
- **Type:** collection (`rows`) built from the modal; per-row permission checkboxes
- **Required:** At least one row to advance (`users.length > 0`)
- **Default value:** `[]`; each added row gets `defaultPermissions()` = `{ web: true, mapped: false, mobile: true, download: false, publicSharing: false, officeOnline: false, guest: false }`
- **Allowed values:** entries from `DIRECTORY`
- **Validation rules:** count > 0 to advance; no per-permission validation
- **When validation occurs:** live (Next disabled)
- **Validation message:** none
- **Disabled conditions:** `guest` permission never editable; search disabled when empty
- **Visibility conditions:** always

---

## 7. States

### Form states
- **Initial/default:** step 0; `provider = null`; `settings = {}`; `name = ''`; `driveLetter = 'M:'`; features all on; `users = []`.
- **Filled:** per-step state populated; **Next** enabled when the step's `canNext` is met.
- **Validation error:** expressed as a **disabled Next button** per step. A per-field error style/message exists for Storage Settings but is effectively unreachable (§17). No form-level error banner.
- **Submitting/loading:** **Not present** — creation is synchronous and in-memory; no loading/spinner state.
- **Server/API error:** **Not present** — no API.
- **Success:** `addShare` runs and the app navigates to `/shares`; the new share appears at the top. No success toast/confirmation message.
- **Disabled:** **Next** disabled until `canNext`; modal **Confirm** disabled with zero assigned; **Confirm & create** always enabled.

### Component states
- **Provider card:** default / selected (`is-selected`).
- **Toggle:** off / on (`toggle--on`).
- **Checkbox:** unchecked / checked (`checkbox--on`) / indeterminate (supported by the component; used on the Shares table "select all", not inside the wizard).
- **Stepper node:** `upcoming` / `active` / `done` (done nodes are clickable buttons).
- **Directory item (modal):** default / assigned (`is-assigned`, shows "Added").
- **Next button:** enabled / disabled.
- **Search (Users step):** enabled / disabled (empty rows).
- **Empty states:** Users table empty; modal assigned-pane empty; no-match query state.

Purely visual hover/focus states are defined in CSS but do not change behavior and are omitted here.

---

## 8. Actions

| Action | Trigger | Preconditions | Behavior | Result | Error handling |
|---|---|---|---|---|---|
| Open wizard | Click "Add new share" on Shares page | — | `navigate('/shares/new')` | Wizard at step 0 | — |
| Select provider | Click a provider radio card | — | `changeProvider(key)` sets `provider`, resets `settings`/errors | Provider selected; Next enabled | — |
| Expand/collapse category | Click accordion header | — | Toggle category open state | Provider list shown/hidden | — |
| Edit a setting | Change a Storage Settings field | on step 1 | `changeSetting(key, value)`, clears that field's error | `settings` updated | Required-empty keeps Next disabled |
| Set Name / Drive letter | Type / select | on step 2 | Update `name` / `driveLetter` | Next enabled when valid | — |
| Toggle feature | Click a feature Toggle | on step 3 | `onToggle(key, value)` | `features` updated | — |
| Open add-users modal | Click "Add Users & Groups" | on step 4 | `setModalOpen(true)` | Modal opens seeded with current ids | — |
| Add/remove directory entry | Click a directory item / remove button | modal open | Toggle id in `assigned` set | Assigned pane updates | — |
| Confirm assignments | Click modal **Confirm** | ≥1 assigned | `handleConfirm([...assigned])` merges/removes rows | `rows` updated, modal closes | Confirm disabled if none assigned |
| Cancel assignments | Click **Cancel** / Escape / overlay | modal open | `onClose` | Modal closes, no changes | — |
| Set permission | Toggle a permission checkbox | row exists, non-`guest` column | `setPerm(id, key, val)` | Row permission updated | — |
| Next | Click **Next** | `canNext` true (button enabled) | For step 1 validates settings then advances; else `setStep(min(5, s+1))` | Advances one step | Next disabled when invalid |
| Back | Click **Back** | step > 0 | `setStep(max(0, s-1))` | Goes back one step | — |
| Jump to completed step | Click a done Stepper node | node index < current | `setStep(i)` | Jumps to that step | — |
| Edit from Review | Click a section **Edit** | on step 5 | `onEdit(i)` → `setStep(i)` | Returns to that step | — |
| Confirm & create | Click **Confirm & create** | on step 5 | `addShare(toShare(state))`, then `navigate('/shares')` | Share created (in-memory), returns to Shares | No error handling (synchronous) |
| Leave via sidebar | Click a sidebar nav item while in wizard | `inWizard` | Intercepted; `LeaveWizardModal` opens | Prompt to stay/discard | — |
| Discard and leave | Click in leave modal | modal open | `navigate(pendingNav.path)` | Leaves wizard (state discarded) | — |
| Back to wizard | Click / Escape / overlay in leave modal | modal open | `onStay` clears `pendingNav` | Stays in wizard | — |
| Import (Users step) | Click **Import** | on step 4 | **No handler** | Nothing happens | — |
| Pagination (wizard) | Click page controls | rows present | Updates local `page` only | No data change (decorative) | — |

---

## 9. Data Flow

**Collected (in `AddSharePage` state):** `provider` (string key), `settings` (object keyed by provider field keys), `name` (string), `driveLetter` (string), `features` (`{download, officeOnline, publicSharing}`), `users` (array of `{id, name, type, permissions}`).

**Transformation (`toShare(state)`):**
- `provider = findProvider(state.provider)`.
- `features` array built from toggles: `publicSharing → 'globe'`, `download → 'download'`, `officeOnline → 'docedit'`. (No `'lock'` is ever produced by the wizard.)
- `users` = entries with `type === 'user'`, names stripped of the `MWF\` prefix; if none, `['—']`. `usersMore = users.length > 2`.
- `groups` = entries with `type === 'group'`, names stripped of `MWF\`; if none, `['—']`. `groupsMore = groups.length > 2`.
- Output record: `{ name: name.trim(), status: null, features, storage: provider?.key ?? 'smb', users, usersMore, groups, groupsMore, driveLetter }`.

**Request/API:** none. `addShare(share)` (from `SharesContext`) does `setShares(prev => [{ ...share, id: Date.now() }, ...prev])`.

**Response:** none (synchronous state update).

**UI update after response:** `navigate('/shares')`; `SharesPage` reads `shares` from context and renders the new record at the top of the table (its features render as badge icons, storage as a logo + label, users/groups as truncated cells; `driveLetter` shows only when the Shares page "Enable drive letter assignment" toggle is on, and that column uses its own sample letters, **not** the value captured here — see §17).

**Persistence:** in-memory only; a page reload resets to the seed `SHARES`. No localStorage/sessionStorage.

---

## 10. API / Backend Behavior

**No backend/API interaction exists in the flow.**

- Creation operation: `addShare` in `store/SharesContext.jsx` — a client-side state update only.
- Endpoint / HTTP method / request payload / response: **Not applicable — Not determined from the current implementation** (there is no network call, `fetch`, or client library anywhere in the flow).
- The directory of users/groups (`DIRECTORY`) and the seed shares (`SHARES`) are hardcoded constants; the modal hint text "This list shows the first 100 users & groups" describes intended backend behavior that is **not** implemented.

---

## 11. Permissions and Access

- **Who can access / create:** No role/permission gating exists in the frontend. Any user reaching `/shares/new` can complete the flow. The signed-in user is hardcoded as `MWF\yelyzaveta` in the sidebar footer.
- **Conditional actions based on permissions:** None found.
- **Fields hidden/disabled by permission:** The **Guest access** permission column is hardcoded as disabled (`disabled: true`) with the tooltip "Guest access is disabled — turned off in Settings." This is a static data flag, not a live permission/role check, and there is no Settings screen wired to it.
- Overall: **Permission behavior cannot be determined from the frontend beyond the hardcoded Guest-access flag.**

---

## 12. Success and Error Handling

### Success
- **What happens:** `addShare(toShare(state))` prepends the new share; `navigate('/shares')` returns to the Shares list.
- **Confirmation/message:** None (no toast, banner, or success screen).
- **Navigation:** To `/shares`.
- **UI updates:** New share appears at the top of the Shares table.
- **Reset/cleanup:** The wizard component unmounts on navigation, so its local state is discarded naturally. There is no explicit reset call.

### Errors
- **Field/step incompleteness:** Prevented proactively by disabling **Next** (no error message surfaces).
- **Storage Settings required-field error:** A message (`"{label} is required."`) and `is-error` styling are implemented but effectively unreachable during normal use (§17).
- **API/server errors:** **Not applicable** — no network layer, so no server-error path, retry logic, or data-preservation-on-error handling exists.
- **Retry / data preservation:** State persists across step navigation within the mounted wizard; leaving via the guard (Discard and leave) or by finishing discards it.

---

## 13. Responsive Behavior

**No responsive behavior is implemented for this flow.**
- There are **no `@media` queries** in any stylesheet (`tokens.css`, `global.css`, `layout.css`, `components.css`, `wizard.css`).
- There is **no JS breakpoint logic** (`matchMedia`, `innerWidth`, resize handling, `useMediaQuery`) anywhere in `src`.
- Some elements use fixed widths (e.g. form fields `max-width: 512px`, search `width: 420px; max-width: 50%`), but there are no defined breakpoints, mobile layouts, or narrow-screen adaptations.
- Mobile/narrow-screen, scrolling, and button-reflow behavior: **Not determined from the current implementation** (not present).

---

## 14. Design-to-Code Mapping

| UI element / Design concept | Implemented component | Variants / States | Notes |
|---|---|---|---|
| Add Share wizard shell | `pages/AddSharePage.jsx` | steps 0–5 | Orchestrates state, `canNext`, footer, `toShare` |
| Step progress indicator | `pages/addshare/Stepper.jsx` | upcoming / active / done | Done steps clickable |
| Step 1 · Choose storage type | `pages/addshare/StepStorageType.jsx` | provider selected / not | Accordion categories from `STORAGE_CATEGORIES` |
| Step 2 · Configure storage settings | `pages/addshare/StepStorageSettings.jsx` | per-provider field sets; text/password/select | Driven by `STORAGE_SETTINGS` |
| Step 3 · Share details | `pages/addshare/StepShareDetails.jsx` | — | Name + Drive letter (`DRIVE_LETTERS`) |
| Step 4 · Features | `pages/addshare/StepFeatures.jsx` | toggles on/off | From `FEATURES` |
| Step 5 · Users & Groups | `pages/addshare/StepUsers.jsx` | empty / populated / no-match | Permission matrix (`PERMISSION_COLUMNS`) |
| Add users dialog | `pages/addshare/AddUsersModal.jsx` | empty / assigned; filter chips | Two-pane; `DIRECTORY` |
| Step 6 · Review & Confirm | `pages/addshare/StepReview.jsx` | read-only summary | Masks passwords, `—` for empty |
| Toggle switch | `ui/Toggle.jsx` | off / on | Used in Features (and Shares page) |
| Checkbox | `ui/Checkbox.jsx` | unchecked / checked / indeterminate | Indeterminate used only on Shares page |
| Pagination | `ui/Pagination.jsx` | page 1 default | Decorative in wizard |
| Tooltip | `ui/Tooltip.jsx` | hover/focus | Guest-access help; sidebar (collapsed) |
| Storage provider logos | `ui/logos.jsx` | per provider | `LogoS3, LogoSMB, LogoOneDrive, LogoAzureBlob, LogoSharePoint, LogoAzureFiles` |
| Icons | `ui/icons.jsx`, `ui/wizard-icons.jsx` | — | e.g. `IconCheckDot`/`IconXDot` in Review matrix |
| Leave-wizard prompt | `layout/LeaveWizardModal.jsx` | open/closed | Triggered from `AppShell`/`Sidebar` |
| Entry point button | `pages/SharesPage.jsx` | — | "Add new share" → `/shares/new` |
| In-memory store | `store/SharesContext.jsx` | — | `addShare`, `shares` |
| Constants / schema | `data/wizard.js`, `data/shares.js` | — | All field/option/permission definitions |

---

## 15. Acceptance Criteria

### AC-01 — Open the wizard from Shares
**Given** the Shares page is displayed
**When** the user clicks **Add new share**
**Then** the app navigates to `/shares/new` and the wizard shows Step `Storage Type` with no provider selected.

### AC-02 — Provider required to advance
**Given** the wizard is on `Storage Type` with no selection
**When** the user views the footer
**Then** **Next** is disabled until a provider radio is selected.

### AC-03 — Provider defines settings fields
**Given** a provider is selected
**When** the user reaches `Storage Settings`
**Then** exactly that provider's fields from `STORAGE_SETTINGS` are shown (e.g. S3 shows Bucket, Region, Endpoint, Access key ID, Secret access key, Path prefix).

### AC-04 — Required settings gate Next
**Given** `Storage Settings` with unfilled required fields
**When** the user views the footer
**Then** **Next** is disabled until all required (`*`) fields are non-empty.

### AC-05 — Switching provider clears settings
**Given** the user has typed values in `Storage Settings`
**When** the user returns to `Storage Type` and selects a different provider
**Then** the previously entered settings are cleared and the new provider's empty fields are shown.

### AC-06 — Share details required
**Given** the `Share Details` step
**When** the Name is empty
**Then** **Next** is disabled; **When** a Name is entered (drive letter defaults to `M:`) **Then** **Next** is enabled.

### AC-07 — Features default on
**Given** the `Features` step is reached
**When** it first renders
**Then** Download, Office online editing, and Public sharing are all enabled, and **Next** is always enabled.

### AC-08 — At least one user/group required
**Given** the `Users & Groups` step with no rows
**When** the user views the footer
**Then** **Next** is disabled and the search input is disabled; **When** at least one entry is assigned **Then** **Next** is enabled.

### AC-09 — Add-users modal confirm rules
**Given** the Add Users & Groups modal is open with nothing assigned
**When** the user views the footer
**Then** **Confirm** is disabled; **When** ≥1 item is assigned and Confirm is clicked **Then** those rows appear in the table (new rows with default permissions) and the modal closes.

### AC-10 — Guest access not editable
**Given** the permission matrix (Step 5 or Review)
**When** the user inspects the Guest access column
**Then** it shows `—` (and a tooltip in the editable step) and cannot be toggled.

### AC-11 — Review reflects entries and masks secrets
**Given** all steps completed
**When** the user reaches `Review & Confirm`
**Then** each section shows the entered values, password fields show `••••••••`, empty optional fields show `—`, and Guest access shows "Disabled".

### AC-12 — Edit from review returns to the step
**Given** the Review step
**When** the user clicks a section **Edit**
**Then** the wizard navigates back to the corresponding step with entered data intact.

### AC-13 — Create the share
**Given** the Review step
**When** the user clicks **Confirm & create**
**Then** a new share is prepended to the Shares list (feature toggles mapped to `globe`/`download`/`docedit`, storage = provider key, users/groups stripped of `MWF\`) and the app navigates to `/shares`.

### AC-14 — Leave-wizard guard (sidebar)
**Given** the user is in the wizard
**When** the user clicks a sidebar nav item
**Then** navigation is blocked and the "Leave wizard?" modal appears; **Discard and leave** navigates away, **Back to wizard** (or Escape/overlay) stays.

### AC-15 — Stepper back-navigation
**Given** the user has advanced past a step
**When** the user clicks a completed step node
**Then** the wizard returns to that step; upcoming steps are not clickable.

---

## 16. Edge Cases

- **Missing required data:** Handled by disabling **Next**; the user cannot advance. No message.
- **Invalid input:** Only "required/non-empty" is checked (Name trimmed; required settings non-empty). No format validation (URLs, UNC paths, keys) — any non-empty string passes.
- **Duplicate share name:** Not checked; duplicate names can be created.
- **Changing a selection after entering dependent data:** Changing the provider clears all `Storage Settings` (dependent data intentionally discarded).
- **Removing all assigned users via the modal:** Confirm becomes disabled at zero; if the user had rows and removes all then confirms is not possible at zero — but they can Cancel, keeping prior rows. If they reduce to some subset, removed rows are dropped and kept rows retain permissions.
- **Empty options:** Directory search with no match shows "No matches."; Users table with a non-matching query shows `No matches for "{query}"`.
- **API failure / slow loading:** Not applicable — creation is synchronous and local; no loading or failure states.
- **User cancelling midway:** Sidebar navigation triggers the Leave-wizard guard; discarding loses all progress. Leaving via the breadcrumb **Shares** link is **not** guarded and discards immediately (see §17).
- **Unexpected backend response:** Not applicable — no backend.
- **Pagination with many rows:** Wizard pagination is decorative; all assigned rows render regardless of page.

---

## 17. Known Gaps / Ambiguities

**Issue:** Storage Settings inline validation is unreachable.
**Location:** `pages/AddSharePage.jsx` (`goNext` step-1 branch, `canNext`) + `StepStorageSettings.jsx` (`errors`, `is-error`, `.field-error`).
**Impact:** Because **Next** is disabled whenever `settingsComplete` is false (same predicate that would trigger the error), the `settingsErrors` path in `goNext` never runs, so field-level "{label} is required." messages/`is-error` styling never appear. Users get no explicit per-field feedback.
**Confidence:** Medium.

**Issue:** Leave-wizard guard does not cover the breadcrumb link.
**Location:** `pages/AddSharePage.jsx` breadcrumb `Link to="/shares"` vs. `layout/Sidebar.jsx`/`AppShell.jsx` guard (`onGuardedNav`).
**Impact:** The guard only intercepts **sidebar** nav items. Clicking the breadcrumb **Shares** (or the browser back button) leaves the wizard immediately and discards progress without the "Leave wizard?" prompt — inconsistent exit behavior.
**Confidence:** High.

**Issue:** No backend/API; creation is in-memory and non-persistent.
**Location:** `store/SharesContext.jsx` (`addShare` uses `Date.now()` id), `data/*`.
**Impact:** Created shares vanish on reload; no real create request, no server validation, no error/loading states. The flow cannot be QA'd against real backend behavior.
**Confidence:** High.

**Issue:** Drive letter captured in the wizard is not shown on the Shares table.
**Location:** `toShare` sets `driveLetter`; `pages/SharesPage.jsx` renders a separate hardcoded `DRIVE_LETTERS` sample array by row index, and only when the page's "Enable drive letter assignment" toggle is on.
**Impact:** The value the user selects during creation is stored on the record but never surfaced; the Shares table shows unrelated sample letters. Potentially confusing for QA/stakeholders.
**Confidence:** High.

**Issue:** "Import" button and wizard Pagination are non-functional.
**Location:** `StepUsers.jsx` (Import has no `onClick`; `Pagination` `onRowsClick={() => {}}` and no data slicing).
**Impact:** Controls are visible but do nothing; may read as implemented functionality.
**Confidence:** High.

**Issue:** Directory is a hardcoded 15-entry list; modal hint claims "first 100 users & groups".
**Location:** `data/wizard.js` (`DIRECTORY`), `AddUsersModal.jsx` hint text.
**Impact:** The hint describes unimplemented backend paging/search over a large directory.
**Confidence:** High.

**Issue:** Guest access "disabled — turned off in Settings" references a non-existent Settings behavior.
**Location:** `data/wizard.js` (`PERMISSION_COLUMNS` `guest.disabled`), `StepUsers.jsx` tooltip.
**Impact:** The disabled state is hardcoded, not driven by any Settings toggle; the referenced Settings screen is a placeholder.
**Confidence:** Medium.

**Issue:** Feature-to-badge mapping omits the padlock (`lock`) feature.
**Location:** `toShare` in `AddSharePage.jsx` (maps only `globe`/`download`/`docedit`); `data/shares.js` seed rows include `lock`.
**Impact:** Newly created shares can never carry the `lock` badge that seed data displays; feature vocabulary differs between created and seed records.
**Confidence:** Medium.

**Issue:** No format validation on connection fields (URLs, UNC paths, access keys, bucket names).
**Location:** `validateSettings` in `data/wizard.js`.
**Impact:** Any non-empty value is accepted; invalid connection strings pass review.
**Confidence:** High.

**Issue:** Secret fields are masked only in Review, not in the input step.
**Location:** `StepStorageSettings.jsx` uses `type="password"` inputs (masked while typing); `StepReview.jsx` shows `••••••••`. This is consistent, but note secrets are held in plain React state (prototype only).
**Confidence:** Medium (behavioral note, not a defect for a prototype).

---

## 18. Implementation Checklist

### UX
- [ ] Six steps present in order: Storage Type → Storage Settings → Share Details → Features → Users & Groups → Review & Confirm.
- [ ] Stepper allows returning to completed steps only.
- [ ] Review section Edit buttons return to the correct step with data intact.
- [ ] Leave-wizard prompt appears on sidebar navigation (decide whether breadcrumb/back should also be guarded — see §17).

### UI
- [ ] Provider accordion (On premises / Microsoft 365 / Cloud storage) expanded by default.
- [ ] Storage Settings render the correct field set per provider (text/password/select) with `*` on required fields and hint lines where defined.
- [ ] Features render three toggles, all on by default.
- [ ] Users table shows the permission matrix with Guest access as a disabled `—` column + tooltip.
- [ ] Review masks password fields (`••••••••`) and shows `—` for empty optional fields.

### Behavior
- [ ] Selecting/changing a provider resets Storage Settings.
- [ ] Add-users modal seeds from current rows, supports add/remove, filter chips, search; Confirm merges (new rows get default permissions), Cancel/Escape/overlay discards.
- [ ] Confirm & create prepends the share and navigates to `/shares`.
- [ ] `toShare` maps features → `globe`/`download`/`docedit`, strips `MWF\` from names, sets `usersMore`/`groupsMore` at >2.

### Validation
- [ ] Next disabled until each step's `canNext` is satisfied (provider / required settings / name+drive letter / ≥1 user).
- [ ] Decide handling for the unreachable per-field settings error path (§17).
- [ ] Add format validation for connection fields if required by product (currently none).
- [ ] Add duplicate-name handling if required by product (currently none).

### Error handling
- [ ] Confirm modal disabled with zero assigned.
- [ ] (If a backend is added) define loading, server-error, retry, and data-preservation behavior — none currently exists.

### API / integration
- [ ] Replace in-memory `addShare` with a real create request; define endpoint, payload, response, success and error handling.
- [ ] Back the directory list and "first 100" search/paging with a real source.
- [ ] Drive the Guest-access disabled state from real Settings.

### Responsive behavior
- [ ] No responsive rules exist; add breakpoints/mobile layout if in scope.

### QA
- [ ] Verify each acceptance criterion in §15.
- [ ] Verify created share appears at top of Shares list.
- [ ] Verify drive-letter capture vs. Shares-table display discrepancy (§17) is acceptable or fixed.
- [ ] Verify Import button / wizard Pagination are intentionally inert or wired up.

---

## 19. Source Files

- `src/pages/AddSharePage.jsx` — Wizard orchestrator: step state, `canNext` gating, provider/settings handlers, footer (Back/Next/Confirm & create), `toShare` transformation, `confirm()`. Primary source of the flow.
- `src/pages/addshare/Stepper.jsx` — Step progress indicator and back-jump behavior for completed steps.
- `src/pages/addshare/StepStorageType.jsx` — Step 1 provider selection (accordion + radio cards).
- `src/pages/addshare/StepStorageSettings.jsx` — Step 2 provider-specific connection fields (text/password/select), required markers, hints, (unreachable) error display.
- `src/pages/addshare/StepShareDetails.jsx` — Step 3 Name + Drive letter.
- `src/pages/addshare/StepFeatures.jsx` — Step 4 feature toggles.
- `src/pages/addshare/StepUsers.jsx` — Step 5 users/groups table, permission matrix, search/import/pagination, modal trigger, `handleConfirm` merge logic.
- `src/pages/addshare/AddUsersModal.jsx` — Two-pane add-users dialog (directory, filter chips, assigned pane, Confirm/Cancel).
- `src/pages/addshare/StepReview.jsx` — Step 6 read-only summary, secret masking, per-permission icons, Edit buttons.
- `src/data/wizard.js` — Constants/schema: `STORAGE_CATEGORIES`, `STORAGE_SETTINGS`, `validateSettings`/`settingsComplete`, `DRIVE_LETTERS`, `FEATURES`, `PERMISSION_COLUMNS`, `defaultPermissions`, `DIRECTORY`, `findProvider`.
- `src/store/SharesContext.jsx` — In-memory store; `addShare` (creation) and `shares` (list).
- `src/data/shares.js` — Seed shares and `STORAGE_LABELS`; relevant for how a created share renders on the Shares page.
- `src/pages/SharesPage.jsx` — Entry point ("Add new share" button) and the destination list after creation; drive-letter display discrepancy.
- `src/layout/AppShell.jsx` — Hosts the wizard route, wires the leave-wizard guard (`inWizard`, `pendingNav`).
- `src/layout/Sidebar.jsx` — Intercepts sidebar nav while in the wizard (`guardActive`, `onGuardedNav`).
- `src/layout/LeaveWizardModal.jsx` — "Leave wizard?" confirmation (Back to wizard / Discard and leave).
- `src/App.jsx` — Routing (`/shares/new` → `AddSharePage`) and `SharesProvider`.
- `src/ui/Toggle.jsx`, `src/ui/Checkbox.jsx`, `src/ui/Pagination.jsx`, `src/ui/Tooltip.jsx` — Shared controls used in the flow.
- `src/ui/logos.jsx`, `src/ui/icons.jsx`, `src/ui/wizard-icons.jsx` — Provider logos and icons used across the steps and review matrix.
- `src/styles/*.css` — Confirmed to contain **no `@media` queries** (basis for §13).
