import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stepper from './addshare/Stepper.jsx';
import StepStorageType from './addshare/StepStorageType.jsx';
import StepStorageSettings from './addshare/StepStorageSettings.jsx';
import StepShareDetails from './addshare/StepShareDetails.jsx';
import StepFeatures from './addshare/StepFeatures.jsx';
import StepUsers from './addshare/StepUsers.jsx';
import StepReview from './addshare/StepReview.jsx';
import { findProvider, settingsComplete, validateSettings } from '../data/wizard.js';
import { useShares } from '../store/SharesContext.jsx';

const LAST = 5;

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
  const { addShare } = useShares();

  const [step, setStep] = useState(0);
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

  const goNext = () => {
    if (step === 1) {
      const errs = validateSettings(provider, settings);
      if (Object.keys(errs).length) { setSettingsErrors(errs); return; }
    }
    setSettingsErrors({});
    setStep((s) => Math.min(LAST, s + 1));
  };
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const confirm = () => {
    addShare(toShare({ provider, settings, name, driveLetter, features, users }));
    navigate('/shares');
  };

  return (
    <div className="wizard">
      <nav className="breadcrumbs t-md-regular" aria-label="Breadcrumb">
        <Link to="/shares" className="breadcrumbs__link breadcrumbs__link--muted">Shares</Link>
        <span className="breadcrumbs__sep">›</span>
        <span className="breadcrumbs__link">Add new share</span>
      </nav>

      <h1 className="t-display-xs-semibold wizard__title">Add new share</h1>

      <Stepper current={step} onStepClick={(i) => setStep(i)} />

      <div className="wizard__body">
        {step === 0 && <StepStorageType value={provider} onChange={changeProvider} />}
        {step === 1 && <StepStorageSettings provider={provider} settings={settings} onChange={changeSetting} errors={settingsErrors} />}
        {step === 2 && <StepShareDetails name={name} onName={setName} driveLetter={driveLetter} onDriveLetter={setDriveLetter} />}
        {step === 3 && <StepFeatures features={features} onToggle={(k, v) => setFeatures((f) => ({ ...f, [k]: v }))} />}
        {step === 4 && <StepUsers rows={users} setRows={setUsers} />}
        {step === 5 && <StepReview state={{ provider, settings, name, driveLetter, features, users }} onEdit={(i) => setStep(i)} />}
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
