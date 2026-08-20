import React from 'react';

// Neutral placeholder for nav areas that are not yet designed. Reuses the page
// header pattern; intentionally introduces no new product UX (per the spec).
export default function Placeholder({ title, subtitle }) {
  return (
    <div className="page">
      <header className="page-header">
        <div className="page-header__text">
          <h1 className="t-display-xs-semibold page-header__title">{title}</h1>
          {subtitle && <p className="t-md-regular page-header__subtitle">{subtitle}</p>}
        </div>
      </header>

      <div className="placeholder">
        <p className="t-md-semibold placeholder__title">This section isn’t designed yet</p>
        <p className="t-sm-regular placeholder__desc">
          The “{title}” screen hasn’t been provided in the design source yet. Once its Figma design
          is available it will be implemented here, following the same components and patterns as the
          Shares page.
        </p>
      </div>
    </div>
  );
}
