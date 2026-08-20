import React from 'react';
import { DRIVE_LETTERS } from '../../data/wizard.js';
import { IconChevronDown } from '../../ui/icons.jsx';

export default function StepShareDetails({ name, onName, driveLetter, onDriveLetter }) {
  return (
    <div className="wz-step">
      <div className="wz-step__head">
        <h2 className="t-display-xs-semibold wz-step__title">Share details</h2>
        <p className="t-md-regular wz-step__subtitle">
          Name your share and, if supported, assign a drive letter that users will see when accessing it.
        </p>
      </div>

      <div className="form-card">
        <div className="form-field">
          <label className="t-sm-semibold form-label" htmlFor="wz-name">Name <span className="req">*</span></label>
          <input
            id="wz-name"
            className="text-input t-md-regular"
            placeholder="e.g. SMB share"
            value={name}
            onChange={(e) => onName(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="t-sm-semibold form-label" htmlFor="wz-drive">Drive letter <span className="req">*</span></label>
          <div className="select select--sm">
            <select id="wz-drive" className="select__native t-md-regular" value={driveLetter} onChange={(e) => onDriveLetter(e.target.value)}>
              {DRIVE_LETTERS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <span className="icon-box icon-20 select__chevron"><IconChevronDown /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
