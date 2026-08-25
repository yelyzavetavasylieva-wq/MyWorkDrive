import React, { useState } from 'react';
import { Link, Outlet, useOutletContext, useLocation, useNavigate } from 'react-router-dom';
import Stepper from './addshare/Stepper.jsx';
import StepStorageType from './addshare/StepStorageType.jsx';
import StepStorageSettings from './addshare/StepStorageSettings.jsx';
import StepShareDetails from './addshare/StepShareDetails.jsx';
import StepFeatures from './addshare/StepFeatures.jsx';
import StepUsers from './addshare/StepUsers.jsx';
import StepReview from './addshare/StepReview.jsx';
import { findProvider, settingsComplete, validateSettings } from '../data/wizard.js';
import { useShares } from '../store/SharesContext.jsx';

// Each wizard step has its own URL so Maze can track it as a distinct screen.
// The step index (used by the Stepper and gating logic) is derived from the path.
const STEP_PATHS = [
  '/shares/new',          // 0 — Storage Type
  '/shares/new/storage',  // 1 — Storage Settings
  '/shares/new/details',  // 2 — Share Details
  '/shares/new/features', // 3 — Features
  '/shares/new/users',    // 4 — Users & Groups
  '/shares/new/review',   // 5 — Review & Confirm
];
const LAST = STEP_PATHS.length - 1;

const stepFromPath = (pathname) => {
  const clean = pathname.replace(/\/+$/, '') || '/shares/new';
  const i = STEP_PATHS.indexOf(clean);
  return i === -1 ? 0 : i;
};

function toShare(state) {
  const provider = findProvider(state.provider);
  const features = [];
  if (state.features.publicSharing) features.push('globe');
  if (state.features.download) features.push('download');
  if (state.features.officeOnline) features.push('docedit');
  const shortName = (n) => n.replace(/^MWF\\/, '');
  const users = state.users.filter((u) => u.type === 'user').map((u) => shortName(u.name));
  const groups = state.users.filter((u) => u.type === 'group').map((u) => shortName(u.name));
  return {
    name: state.name.trim(),
    status: null,
    features,
    storage: provider ? provider.key : 'smb',
    users: users.length ? users : ['—'],
    usersMore: users.length > 2,
    groups: groups.length ? groups : ['—'],
    groupsMore: groups.length > 2,
    driveLetter: state.driveLetter,
  };
}

export default function AddSharePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addShare } = useShares();

  const step = stepFromPath(location.pathname);

  const [provider, setProvider] = useState(null);
  const [settings, setSettings] = useState({});
  const [settingsErrors, setSettingsErrors] = useState({});
  const [name, setName] = useState('');
  const [driveLetter, setDriveLetter] = useState('M:');
  const [features, setFeatures] = useState({ download: true, officeOnline: true, publicSharing: true });
  const [users, setUsers] = useState([]);

  const canNext = (() => {
    switch (step) {
      case 0: return !!provider;
      case 1: return settingsComplete(provider, settings);
      case 2: return name.trim().length > 0 && !!driveLetter;
      case 3: return true;
      case 4: return users.length > 0;
      default: return true;
    }
  })();

  // Switching provider clears settings collected for the previous one.
  const changeProvider = (key) => {
    setProvider(key);
    setSettings({});
    setSettingsErrors({});
  };

  const changeSetting = (key, value) => {
    setSettings((s) => ({ ...s, [key]: value }));
    if (settingsErrors[key]) setSettingsErrors((e) => { const next = { ...e }; delete next[key]; return next; });
  };

  const goToStep = (i) => navigate(STEP_PATHS[Math.max(0, Math.min(LAST, i))]);

  const goNext = () => {
    if (step === 1) {
      const errs = validateSettings(provider, settings);
      if (Object.keys(errs).length) { setSettingsErrors(errs); return; }
    }
    setSettingsErrors({});
    goToStep(step + 1);
  };
  const goBack = () => goToStep(step - 1);

  const confirm = () => {
    addShare(toShare({ provider, settings, name, driveLetter, features, users }));
    navigate('/shares', { state: { toast: `“${name.trim()}” created successfully.` } });
  };

  const ctx = {
    provider, settings, settingsErrors, name, driveLetter, features, users,
    changeProvider, changeSetting, setName, setDriveLetter, setFeatures, setUsers,
    goToStep,
  };

  return (
    <div className="wizard">
      <nav className="breadcrumbs t-md-regular" aria-label="Breadcrumb">
        <Link to="/shares" className="breadcrumbs__link breadcrumbs__link--muted">Shares</Link>
        <span className="breadcrumbs__sep">›</span>
        <span className="breadcrumbs__link">Add new share</span>
      </nav>

      <h1 className="t-display-xs-semibold wizard__title">Add new share</h1>

      <Stepper current={step} onStepClick={goToStep} />

      <div className="wizard__body">
        <Outlet context={ctx} />
      </div>

      <div className="wizard__footer">
        {step > 0 ? (
          <button type="button" className="btn btn--secondary" onClick={goBack}>Back</button>
        ) : <span />}

        {step < LAST ? (
          <button type="button" className="btn btn--primary" disabled={!canNext} onClick={goNext}>Next</button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={confirm}>Confirm &amp; create</button>
        )}
      </div>
    </div>
  );
}

// Step route components — each reads shared wizard state from the layout's Outlet
// context and renders the same step body/props as before, unchanged.
export function StorageTypeStep() {
  const { provider, changeProvider } = useOutletContext();
  return <StepStorageType value={provider} onChange={changeProvider} />;
}

export function StorageSettingsStep() {
  const { provider, settings, changeSetting, settingsErrors } = useOutletContext();
  return <StepStorageSettings provider={provider} settings={settings} onChange={changeSetting} errors={settingsErrors} />;
}

export function ShareDetailsStep() {
  const { name, setName, driveLetter, setDriveLetter } = useOutletContext();
  return <StepShareDetails name={name} onName={setName} driveLetter={driveLetter} onDriveLetter={setDriveLetter} />;
}

export function FeaturesStep() {
  const { features, setFeatures } = useOutletContext();
  return <StepFeatures features={features} onToggle={(k, v) => setFeatures((f) => ({ ...f, [k]: v }))} />;
}

export function UsersStep() {
  const { users, setUsers } = useOutletContext();
  return <StepUsers rows={users} setRows={setUsers} />;
}

export function ReviewStep() {
  const { provider, settings, name, driveLetter, features, users, goToStep } = useOutletContext();
  return <StepReview state={{ provider, settings, name, driveLetter, features, users }} onEdit={(i) => goToStep(i)} />;
}
