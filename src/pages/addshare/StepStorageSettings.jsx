import React from 'react';

export default function StepStorageSettings({ path, onPath, error }) {
  return (
    <div className="wz-step">
      <div className="wz-step__head">
        <h2 className="t-display-xs-semibold wz-step__title">Configure storage settings</h2>
        <p className="t-md-regular wz-step__subtitle">Enter the details required to access and configure your selected storage.</p>
      </div>

      <div className="form-card">
        <div className="form-field">
          <label className="t-sm-semibold form-label" htmlFor="wz-path">
            Path <span className="req">*</span>
          </label>
          <input
            id="wz-path"
            className={'text-input t-md-regular' + (error ? ' is-error' : '')}
            placeholder="\\mwf\network-share"
            value={path}
            onChange={(e) => onPath(e.target.value)}
          />
          {error && <p className="t-sm-regular field-error">{error}</p>}
        </div>
      </div>
    </div>
  );
}
