import React from 'react';
import { settingsFieldsFor, findProvider } from '../../data/wizard.js';
import { IconChevronDown } from '../../ui/icons.jsx';

export default function StepStorageSettings({ provider, settings, onChange, errors = {} }) {
  const fields = settingsFieldsFor(provider);
  const providerName = findProvider(provider)?.name;

  return (
    <div className="wz-step">
      <div className="wz-step__head">
        <h2 className="t-display-xs-semibold wz-step__title">Configure storage settings</h2>
        <p className="t-md-regular wz-step__subtitle">
          {providerName
            ? `Enter the details required to access and configure your ${providerName} storage.`
            : 'Enter the details required to access and configure your selected storage.'}
        </p>
      </div>

      <div className="form-card">
        {fields.map((f) => {
          const id = `wz-${f.key}`;
          const value = (settings && settings[f.key]) || '';
          const err = errors[f.key];
          return (
            <div className="form-field" key={f.key}>
              <label className="t-sm-semibold form-label" htmlFor={id}>
                {f.label} {f.required && <span className="req">*</span>}
              </label>

              {f.type === 'select' ? (
                <div className="select select--full">
                  <select
                    id={id}
                    className={'select__native t-md-regular' + (err ? ' is-error' : '')}
                    value={value}
                    onChange={(e) => onChange(f.key, e.target.value)}
                  >
                    <option value="" disabled>Select {f.label.toLowerCase()}</option>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <span className="icon-box icon-20 select__chevron"><IconChevronDown /></span>
                </div>
              ) : (
                <input
                  id={id}
                  type={f.type === 'password' ? 'password' : 'text'}
                  autoComplete={f.type === 'password' ? 'new-password' : 'off'}
                  className={'text-input t-md-regular' + (err ? ' is-error' : '')}
                  placeholder={f.placeholder}
                  value={value}
                  onChange={(e) => onChange(f.key, e.target.value)}
                />
              )}

              {err
                ? <p className="t-sm-regular field-error">{err}</p>
                : f.hint && <p className="t-sm-regular field-hint">{f.hint}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
