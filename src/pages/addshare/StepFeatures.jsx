import React from 'react';
import { FEATURES } from '../../data/wizard.js';
import Toggle from '../../ui/Toggle.jsx';

export default function StepFeatures({ features, onToggle }) {
  return (
    <div className="wz-step">
      <div className="wz-step__head">
        <h2 className="t-display-xs-semibold wz-step__title">Features</h2>
        <p className="t-md-regular wz-step__subtitle">Configure how users can interact with this share by enabling the features below.</p>
      </div>

      <div className="feature-grid">
        {FEATURES.map((f) => (
          <div className="feature-card" key={f.key}>
            <Toggle checked={features[f.key]} onChange={(v) => onToggle(f.key, v)} ariaLabel={f.title} />
            <div className="feature-card__text">
              <span className="t-md-semibold feature-card__title">{f.title}</span>
              <span className="t-md-regular feature-card__desc">{f.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
