import React, { useState } from 'react';
import { STORAGE_CATEGORIES } from '../../data/wizard.js';
import { IconChevronDown } from '../../ui/icons.jsx';
import { LogoS3, LogoSMB, LogoOneDrive, LogoAzureBlob, LogoSharePoint, LogoAzureFiles } from '../../ui/logos.jsx';

const LOGOS = {
  s3: LogoS3, smb: LogoSMB, onedrive: LogoOneDrive,
  azureBlob: LogoAzureBlob, sharepoint: LogoSharePoint, azureFiles: LogoAzureFiles,
};

export default function StepStorageType({ value, onChange }) {
  const [open, setOpen] = useState(() => STORAGE_CATEGORIES.map((c) => c.id)); // all expanded

  const toggle = (id) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  return (
    <div className="wz-step">
      <div className="wz-step__head">
        <h2 className="t-display-xs-semibold wz-step__title">Choose storage type</h2>
        <p className="t-md-regular wz-step__subtitle">Select where the share data is stored.</p>
      </div>

      <div className="accordion-list">
        {STORAGE_CATEGORIES.map((cat) => {
          const isOpen = open.includes(cat.id);
          return (
            <div className="accordion" key={cat.id}>
              <button type="button" className="accordion__header" aria-expanded={isOpen} onClick={() => toggle(cat.id)}>
                <span className={'icon-box icon-20 accordion__chevron' + (isOpen ? ' is-open' : '')}><IconChevronDown /></span>
                <span className="t-md-semibold accordion__title">{cat.label}</span>
                <span className="t-md-regular accordion__count">({cat.providers.length})</span>
              </button>

              {isOpen && (
                <div className="accordion__body">
                  {cat.providers.map((p) => {
                    const Logo = LOGOS[p.logo];
                    const selected = value === p.key;
                    return (
                      <label className={'provider-card' + (selected ? ' is-selected' : '')} key={p.key}>
                        <span className="control-box">
                          <input
                            type="radio"
                            name="storage-provider"
                            className="radio"
                            checked={selected}
                            onChange={() => onChange(p.key)}
                          />
                        </span>
                        <span className="provider-card__body">
                          <span className="provider-card__title">
                            <span className="icon-box icon-20"><Logo /></span>
                            <span className="t-sm-semibold">{p.name}</span>
                          </span>
                          <span className="t-sm-regular provider-card__desc">{p.desc}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
