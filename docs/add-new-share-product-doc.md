# Add New Share

> Implementation-ready product documentation extracted from the current frontend of the **MyWorkDrive Admin** prototype (`myworkdrive-admin`). Behavior described here is what the code actually does. The flow is **frontend-only with an in-memory store — there is no backend/API**. Anything not derivable from the code is marked **"Not determined from the current implementation."**

---

## 1. Product Area

**Share Management (Configuration)**

The feature lives in the **Configuration → Shares** area of the admin panel (sidebar section "Configuration", route `/shares`). This area is where an administrator manages the server's file shares — the storage locations, features, and user/group access that MyWorkDrive exposes to end users. Add New Share is the creation entry point for that area.

---

## 2. Epic

**Manage Shares**

Manage Shares covers viewing, searching, sorting, selecting, and creating file shares from the Shares screen. Add New Share is the create capability within this epic; the Shares table (list, drive-letter toggle, per-row edit/confirm affordances) is the read/manage side. (Edit/delete of existing shares are present only as non-wired affordances — see §8/§9 notes.)

---

## 3. Feature

**Add New Share**

Add New Share is a six-step wizard that lets an administrator create a new share by:
1. choosing a **storage provider**,
2. entering the **provider-specific connection settings**,
3. naming the share and assigning a **drive letter**,
4. enabling **features** (Download, Office online editing, Public sharing),
5. assigning **users/groups** and setting per-permission access, and
6. **reviewing** all choices before creating it.

On confirmation the new share is prepended to the in-memory Shares list and the user returns to the Shares screen.

---

## 4. User Flow

### Main flow
Admin → Shares screen → **Add new share** → **Storage Type** (pick provider) → **Storage Settings** (fill provider fields) → **Share Details** (name + drive letter) → **Features** (toggles) → **Users & Groups** (assign + permissions) → **Review & Confirm** → **Confirm & create** → Share created (prepended to list) → returned to Shares screen

Compact: `Admin → Shares → Add new share → 6-step wizard → Confirm & create → Shares list (new share on top)`

### Alternative / branch flows

**Assign users/groups (modal branch):**
Users & Groups step → **Add Users & Groups** → modal opens → search/filter (All/Users/Groups) → click directory entries to add/remove → **Confirm** → rows appear in the permission table (new rows get default permissions) → back to Users & Groups step
(Cancel / Escape / overlay click closes the modal with no changes.)

**Edit a choice from Review:**
Review & Confirm → section **Edit** → returns to that step with data intact → navigate forward again to Review.

**Back-navigation via Stepper:**
Any step → click a **completed** step node in the stepper → jumps back to that step (upcoming steps are not clickable).

**Abandon via sidebar (guarded):**
Any step → click a sidebar nav item → **Leave wizard?** modal → **Discard and leave** (navigates away, progress lost) OR **Back to wizard** / Escape / overlay (stays).

**Abandon via breadcrumb (unguarded):**
Any step → click the **Shares** breadcrumb link → leaves immediately, progress lost, no prompt.

---

## 5. Screens

The wizard is a single route (`/shares/new`) that swaps a step body by index; the stepper, breadcrumbs, title, and footer are constant.

### Shares screen (entry point)
**Purpose:** View/manage shares; launch creation.
**Entry:** Sidebar → Shares (`/shares`), or app default redirect.
**Content:** Page header ("Shares" + subtitle), "Enable drive letter assignment" toggle card, search field, shares table, pagination, and the **Add new share** primary button.
**Actions:** Click **Add new share**.
**Exit:** → Add New Share wizard (`/shares/new`).

### Step 1 — Storage Type
**Purpose:** Choose the storage provider for the share.
**Entry:** Opening the wizard (default step).
**Content:** Title "Choose storage type"; accordion with three categories — **On premises** (SMB), **Microsoft 365** (OneDrive, SharePoint), **Cloud storage** (Azure Blob, Azure Files, S3) — all expanded by default; a radio card per provider with name + description.
**Actions:** Select one provider; expand/collapse categories.
**Exit:** **Next** (enabled once a provider is selected) → Step 2.

### Step 2 — Storage Settings
**Purpose:** Enter the connection details for the chosen provider.
**Entry:** From Step 1 via Next.
**Content:** Title "Configure storage settings"; subtitle names the provider; a provider-specific set of fields (text/password/select) with required markers (`*`) and hint lines where defined (see §8 for the field sets).
**Actions:** Fill fields.
**Exit:** **Next** (enabled when all required fields are non-empty) → Step 3.

### Step 3 — Share Details
**Purpose:** Name the share and assign a drive letter.
**Entry:** From Step 2 via Next.
**Content:** Title "Share details"; **Name** text input (placeholder "e.g. SMB share"); **Drive letter** select (default `M:`).
**Actions:** Type a name; pick a drive letter.
**Exit:** **Next** (enabled when name is non-empty and a drive letter is set) → Step 4.

### Step 4 — Features
**Purpose:** Toggle share features.
**Entry:** From Step 3 via Next.
**Content:** Title "Features"; three toggle cards — **Download**, **Office online editing**, **Public sharing** — all enabled by default, each with a description.
**Actions:** Toggle any feature on/off.
**Exit:** **Next** (always enabled) → Step 5.

### Step 5 — Users & Groups
**Purpose:** Assign users/groups and set their per-permission access.
**Entry:** From Step 4 via Next.
**Content:** Title "Users & Groups"; toolbar with a **Search assigned** input (disabled when empty), an **Import** button (non-functional), and an **Add Users & Groups** button; a permission table (columns: Web client, Mapped Drive client, Mobile client, Download, Public sharing, Office Online edit, and **Guest access** which is disabled and shows `—` with a tooltip); an info banner ("New shares will be available to currently logged in users after logoff / login"); decorative pagination when rows exist.
**Actions:** Open the add-users modal; set permission checkboxes; search assigned rows.
**Exit:** **Next** (enabled when at least one user/group is assigned) → Step 6.

### Add Users & Groups modal (overlay on Step 5)
**Purpose:** Pick which directory users/groups are assigned.
**Entry:** "Add Users & Groups" button on Step 5.
**Content:** Two panes — left "List of Users & Groups" (search, hint "This list shows the first 100 users & groups", filter chips **All / Users / Groups**, a directory list where entries toggle "Added"), right "Assigned Users & Groups" (empty guidance or the assigned list with remove buttons).
**Actions:** Search/filter; click to add/remove; **Confirm** (disabled when nothing assigned) or **Cancel**.
**Exit:** Confirm → returns to Step 5 with rows merged (new rows get default permissions, de-selected rows removed, kept rows retain permissions); Cancel/Escape/overlay → returns with no change.

### Step 6 — Review & Confirm
**Purpose:** Final review before creation.
**Entry:** From Step 5 via Next.
**Content:** Title "Review & Confirm"; five read-only sections — Storage type, Storage settings (password fields masked as `••••••••`, empty optional fields as `—`), Share details, Features (Enabled/Disabled; Guest access always "Disabled"), Users & Groups (permission matrix with check/x icons) — each with an **Edit** button.
**Actions:** Edit any section (jumps back to its step); **Confirm & create**.
**Exit:** Confirm & create → share created → **Shares screen**.

### Leave wizard? modal (overlay, any step)
**Purpose:** Prevent accidental loss of progress on sidebar navigation.
**Entry:** Clicking a sidebar nav item while in the wizard.
**Content:** Warning icon, title "Leave wizard?", message naming the target and warning progress will be lost.
**Actions:** **Back to wizard** (stay) or **Discard and leave** (navigate away).
**Exit:** Stay in wizard, or navigate to the chosen destination.

### Empty / no-data states (within Step 5 and the modal)
- **Users table empty:** "No users or groups assigned" + "Select which users or groups should have access to this share".
- **Users table no-match:** `No matches for "{query}"`.
- **Modal assigned pane empty:** "No assigned Users & Groups yet" + guidance.

### Success state
No dedicated success screen or toast. Success = navigation back to `/shares` with the new share at the top of the table.

### Loading / API-error states
**Not present** — creation is synchronous and in-memory; there is no loading spinner or server-error screen.

---

## 6. Components

### Wizard frame (all steps) — `AddSharePage`
- **Breadcrumbs** — Purpose: context + link back to Shares. Behavior: "Shares" link navigates immediately (not guarded); current crumb static. Dependencies: router. Reusable: feature-specific markup (`.breadcrumbs`).
- **Stepper** — Purpose: show the 6 steps and allow jumping to completed ones. Behavior: nodes render upcoming/active/done; done nodes (`i < current`) are clickable and call `setStep(i)`. Dependencies: `current`, `onStepClick`. Reusable: feature-specific (`Stepper.jsx`).
- **Back button** — Purpose: previous step. Behavior: hidden (empty spacer) on step 0; else `step-1`. Reusable component style `.btn--secondary`.
- **Next button** — Purpose: advance. Behavior: disabled unless the step's `canNext` is satisfied. Reusable `.btn--primary`.
- **Confirm & create button** — Purpose: create the share. Behavior: shown only on step 6; always enabled; runs creation + navigation. Reusable `.btn--primary`.

### Storage Type — `StepStorageType`
- **Accordion category** — expands/collapses each provider group; all open by default.
- **Provider radio card** — single-select provider (`storage-provider`); selecting resets storage settings. Feature-specific.

### Storage Settings — `StepStorageSettings`
- **Provider-specific field** — text / password / select input driven by the `STORAGE_SETTINGS` schema; required marker, hint or error line. Feature-specific; renders shared `.text-input` / `.select` styles.

### Share Details — `StepShareDetails`
- **Name input** — text (`.text-input`), required to advance.
- **Drive letter select** — native select (`.select--sm`) from `DRIVE_LETTERS`, default `M:`.

### Features — `StepFeatures`
- **Feature toggle** — `Toggle` component (reusable, `ui/Toggle.jsx`), one per feature, all on by default.

### Users & Groups — `StepUsers`
- **Search assigned input** — filters assigned rows; disabled when none.
- **Import button** — present, **no handler** (non-functional).
- **Add Users & Groups button** — opens the modal.
- **Permission table** — rows × `PERMISSION_COLUMNS`; per-cell **Checkbox** (reusable, `ui/Checkbox.jsx`); Guest access column disabled (`—` + Tooltip).
- **Info banner** — static informational message (`.info-banner`).
- **Pagination** — `Pagination` component (reusable) but decorative here (no slicing; "Show N rows" is a no-op).
- **Tooltip** — reusable (`ui/Tooltip.jsx`), used on the Guest access header.

### Add Users & Groups modal — `AddUsersModal`
- **Modal search input**, **filter chips** (All/Users/Groups), **directory item** (add/remove), **assigned item + remove**, **Cancel**, **Confirm** (disabled when zero assigned). Feature-specific.

### Review & Confirm — `StepReview`
- **Section + Edit button** — jumps back to the corresponding step.
- **KV table** — read-only field/value summary (masks passwords, `—` for empty).
- **Read-only permission matrix** — check/x icons per permission.

### Overlays
- **LeaveWizardModal** — feature-specific confirmation (Back to wizard / Discard and leave).

### Shared/reusable UI (used across the flow)
`Toggle`, `Checkbox`, `Pagination`, `Tooltip`, storage logos (`ui/logos.jsx`), icons (`ui/icons.jsx`, `ui/wizard-icons.jsx`), and the `.btn` / `.text-input` / `.select` / `.featured-icon` / `.modal` style families.

---

## 7. States

### Wizard (form) states
- **Initial/default** — Trigger: opening `/shares/new`. UI: step 0; provider unselected; settings empty; name empty; drive letter `M:`; features all on; no users. Actions: select a provider. Transition: Next enabled after selection.
- **Filled (per step)** — Trigger: user enters valid data for the step. UI: fields reflect input. Actions: **Next**. Transition: advance one step.
- **Blocked / step-invalid** — Trigger: the step's required data is missing. UI: **Next** disabled (no error banner/message shown in normal use). Actions: complete the fields. Transition: none until valid.
- **Submitting/loading** — **Not present** (synchronous in-memory creation).
- **API error** — **Not present** (no network layer).
- **Success** — Trigger: **Confirm & create**. UI: navigation to `/shares`; new share at top of table. Actions: continue managing shares. Transition: wizard unmounts (state discarded).
- **Disabled controls** — **Next** disabled per `canNext`; modal **Confirm** disabled with zero assigned; search disabled with zero rows. **Confirm & create** is always enabled.

### Storage Settings state
- **Provider-dependent fields** — Trigger: provider selection. UI: exactly that provider's fields render. Transition: changing provider **clears** all entered settings.
- **Required-field error (implemented but unreachable in normal use)** — a `"{label} is required."` message + `is-error` style exist, but because **Next** is disabled while incomplete, this path does not surface (see §9 AC and Known behavior note).

### Users & Groups / modal states
- **Empty** — no rows → empty-state message; search disabled; Next disabled.
- **Populated** — ≥1 row → table + permission checkboxes; Next enabled.
- **No-match** — non-matching search query → no-match message.
- **Modal empty vs. assigned** — Confirm disabled until ≥1 assigned.

### Component states (behavioral)
- **Provider card:** default / selected.
- **Toggle:** off / on.
- **Checkbox:** unchecked / checked (indeterminate exists in the component but is used only on the Shares table, not the wizard).
- **Stepper node:** upcoming / active / done(clickable).
- **Directory item:** default / assigned ("Added").
- **Guest access permission:** permanently disabled (`—`).

---

## 8. Conditional Logic

### Provider selection defines and gates Storage Settings
**IF** provider = `smb` → show **path\***.
**IF** provider = `onedrive` → show **account (UPN)\***, **rootFolder**.
**IF** provider = `sharepoint` → show **siteUrl\***, **library\***, **rootFolder**.
**IF** provider = `azureBlob` → show **accountName\***, **container\***, **accessKey\*** (password), **prefix**.
**IF** provider = `azureFiles` → show **accountName\***, **fileShare\***, **accessKey\*** (password), **path**.
**IF** provider = `s3` → show **bucket\***, **region\*** (select), **endpoint**, **accessKeyId\***, **secretAccessKey\*** (password), **prefix**.
(`*` = required.)

### Changing provider after entering settings
**IF** the provider selection changes **THEN** all previously entered storage settings and their errors are cleared **ELSE** entered values persist.

### Step advancement (Next enablement)
**IF** step = Storage Type → require a provider selected.
**IF** step = Storage Settings → require all required fields non-empty.
**IF** step = Share Details → require non-empty Name and a Drive letter.
**IF** step = Features → always allowed.
**IF** step = Users & Groups → require at least one assigned user/group.
**ELSE** (Review) → allowed.
When not satisfied, **Next** is disabled.

### Footer button
**IF** step < Review → render **Next** (disabled unless `canNext`). **ELSE** render **Confirm & create** (always enabled).
**IF** step > 0 → render **Back**. **ELSE** render an empty spacer.

### Stepper node interactivity
**IF** a step index is before the current step → its node is a clickable "Go to {label}" button. **ELSE** it is non-interactive.

### Guest access permission column
**IF** the column is Guest access (`disabled: true`) → render `—` and a tooltip ("Guest access is disabled — turned off in Settings.") **ELSE** render an editable checkbox. Guest access cannot be enabled anywhere in the flow.

### Users step search
**IF** there are no assigned rows → the Search input is disabled. **ELSE** enabled.

### Users table body
**IF** no rows → "No users or groups assigned" + guidance. **ELSE IF** the query matches nothing → `No matches for "{query}"`. **ELSE** show rows.

### Modal Confirm
**IF** nothing is assigned in the modal → **Confirm** disabled. **ELSE** enabled.

### Leave-wizard guard
**IF** in the wizard and a **sidebar** nav item is clicked → intercept and show the Leave wizard? modal. **ELSE** (breadcrumb link, programmatic navigation) → navigate immediately, no prompt.

### Data mapping on creation (`toShare`)
**IF** Public sharing on → include `globe`; **IF** Download on → include `download`; **IF** Office online editing on → include `docedit`. (No `lock` badge is ever produced.)
Users/groups are split by type and stripped of the `MWF\` prefix; if none, stored as `['—']`; `usersMore`/`groupsMore` true when count > 2; `status` set to `null`; `storage` = provider key (fallback `smb`).

---

## 9. Acceptance Criteria

### AC-01 — Open the wizard
**Given** the Shares screen
**When** the admin clicks **Add new share**
**Then** the app navigates to `/shares/new` and shows Step 1 (Storage Type) with no provider selected and **Back** hidden.

### AC-02 — Provider required
**Given** Step 1 with no provider selected
**When** the admin views the footer
**Then** **Next** is disabled until a provider radio is selected.

### AC-03 — Provider defines settings fields
**Given** a selected provider
**When** the admin reaches Storage Settings
**Then** exactly that provider's fields (per §8) are shown, with required fields marked `*`.

### AC-04 — Required settings gate Next
**Given** Storage Settings with any required field empty
**When** the admin views the footer
**Then** **Next** is disabled until all required fields are non-empty.

### AC-05 — Changing provider clears settings
**Given** values entered in Storage Settings
**When** the admin returns to Storage Type and selects a different provider
**Then** the previously entered settings are discarded and the new provider's empty fields are shown.

### AC-06 — Share details required
**Given** the Share Details step (drive letter defaults to `M:`)
**When** the Name is empty
**Then** **Next** is disabled; **When** a Name is entered **Then** **Next** is enabled.

### AC-07 — Features default on
**Given** the Features step is reached
**When** it first renders
**Then** Download, Office online editing, and Public sharing are all enabled, and **Next** is always enabled.

### AC-08 — At least one user/group required
**Given** the Users & Groups step with no rows
**When** the admin views the footer
**Then** **Next** is disabled and the Search input is disabled; **When** ≥1 entry is assigned **Then** **Next** is enabled.

### AC-09 — Add-users modal confirm rule
**Given** the Add Users & Groups modal with nothing assigned
**When** the admin views the footer
**Then** **Confirm** is disabled; **When** ≥1 item is assigned and **Confirm** is clicked **Then** those entries appear in the permission table (new rows with default permissions) and the modal closes.

### AC-10 — Default permissions on newly added rows
**Given** a user/group newly added via the modal
**When** it appears in the permission table
**Then** its permissions are Web client = on, Mobile client = on, all others off, Guest access = off.

### AC-11 — Guest access not editable
**Given** the permission matrix (Users & Groups or Review)
**When** the admin inspects the Guest access column
**Then** it shows `—` (with a tooltip on the editable step) and cannot be toggled.

### AC-12 — Review reflects entries and masks secrets
**Given** all steps completed
**When** the admin reaches Review & Confirm
**Then** each section shows the entered values, password fields show `••••••••`, empty optional fields show `—`, and Guest access shows "Disabled".

### AC-13 — Edit from Review
**Given** the Review step
**When** the admin clicks a section **Edit**
**Then** the wizard returns to that step with entered data intact.

### AC-14 — Successful creation
**Given** the Review step
**When** the admin clicks **Confirm & create**
**Then** a new share is prepended to the Shares list (features mapped to globe/download/docedit, storage = provider key, user/group names stripped of `MWF\`) and the app navigates to `/shares` — with no loading state or confirmation toast.

### AC-15 — Stepper back-navigation
**Given** the admin has advanced past a step
**When** a completed step node is clicked
**Then** the wizard returns to that step; upcoming step nodes are not clickable.

### AC-16 — Leave-wizard guard (sidebar)
**Given** the admin is in the wizard
**When** a sidebar nav item is clicked
**Then** navigation is blocked and the "Leave wizard?" modal appears; **Discard and leave** navigates away, **Back to wizard**/Escape/overlay stays.

### AC-17 — Unguarded breadcrumb exit
**Given** the admin is in the wizard
**When** the **Shares** breadcrumb link is clicked
**Then** the wizard is exited immediately and progress is lost, with no confirmation prompt.

### AC-18 — Loading / API error
**Given** the create action
**When** it runs
**Then** no loading indicator and no server-error handling occur (creation is synchronous, in-memory). *Backend behavior: Not determined from the current implementation.*

### AC-19 — Permissions to access/create
**Given** any user who can reach `/shares/new`
**When** they use the flow
**Then** no role/permission checks gate access or creation. *Real permission model: Not determined from the current implementation.*

### AC-20 — Persistence
**Given** a share created via the wizard
**When** the page is reloaded
**Then** the created share is lost (in-memory store resets to seed data).

---

## 10. Flow Summary

**Product Area:**
Share Management (Configuration → Shares).

**Epic:**
Manage Shares — view, search, sort, select, and create file shares.

**Feature:**
Add New Share — a 6-step wizard to create and configure a share.

**User Flow:**
Admin → Shares → Add new share → Storage Type → Storage Settings → Share Details → Features → Users & Groups → Review & Confirm → Confirm & create → Shares list (new share on top).

**Screens:**
Shares (entry) · Storage Type · Storage Settings · Share Details · Features · Users & Groups · Add Users & Groups modal · Review & Confirm · Leave wizard? modal · empty/no-match states. (No dedicated loading/success/API-error screens.)

**Key Components:**
Stepper, provider radio cards, provider-specific setting fields (text/password/select), Name input, Drive-letter select, feature Toggles, permission table with Checkboxes, Tooltip, AddUsersModal (chips/search/two panes), Review KV tables, Back/Next/Confirm & create buttons, LeaveWizardModal.

**Key States:**
Per-step gating (Next disabled until valid), provider-dependent fields (reset on provider change), users empty/populated/no-match, modal confirm-disabled-when-empty, success = navigate to Shares. No loading or API-error states.

**Key Acceptance Criteria:**
Provider required (AC-02); provider defines/gates settings (AC-03/04); provider change clears settings (AC-05); name+drive-letter required (AC-06); ≥1 user required (AC-08); default permissions on add (AC-10); Guest access locked (AC-11); review masks secrets (AC-12); create prepends + navigates with no loading/toast (AC-14); sidebar guard vs. unguarded breadcrumb (AC-16/17); no permission gating and non-persistent (AC-19/20).

---

### Notes on undetermined / backend-dependent behavior
- **API / backend:** No network calls exist; creation, the users/groups directory, and the "first 100 users & groups" hint are all client-side/hardcoded. Endpoints, payloads, responses, real validation, loading, and error handling are **Not determined from the current implementation.**
- **Permissions/roles:** No access control in the frontend beyond the hardcoded, non-editable Guest access column; the real permission model is **Not determined from the current implementation.**
- **Non-wired affordances:** the **Import** button, wizard **Pagination**, and the Shares-table per-row Edit/Confirm buttons have no behavior in the current code.
- **Responsive behavior:** none is implemented (no breakpoints/media queries).
