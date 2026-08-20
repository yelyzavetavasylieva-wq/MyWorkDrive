import React, { useState } from 'react';
import {
  IconPerson, IconChevronRight, IconQuestionCircle, IconHeadset, IconSignOut,
} from '../ui/icons.jsx';
import { FLAGS } from '../ui/Flags.jsx';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'German' },
  { code: 'fr', label: 'French' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'sv', label: 'Swedish' },
  { code: 'nl', label: 'Dutch' },
  { code: 'es', label: 'Spanish' },
];

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13.5 4.5L6.5 11.5L3 8" stroke="#3388ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function UserMenu({ onLogout }) {
  const [lang, setLang] = useState('en');
  const [langOpen, setLangOpen] = useState(false);
  const CurrentFlag = FLAGS[lang];
  const currentLabel = LANGUAGES.find((l) => l.code === lang).label;

  return (
    <div className="menu menu--user" role="menu">
      {/* Header */}
      <div className="menu__header">
        <span className="icon-box icon-20"><IconPerson /></span>
        <span className="t-sm-semibold menu__header-name">{'MWF\\yelyzaveta'}</span>
      </div>

      {/* Language (with submenu) */}
      <div
        className="menu__row"
        onMouseEnter={() => setLangOpen(true)}
        onMouseLeave={() => setLangOpen(false)}
      >
        <button type="button" className="menu-item menu-item--hoverable" aria-haspopup="menu" aria-expanded={langOpen}>
          <span className="menu-item__icon icon-box icon-20"><CurrentFlag /></span>
          <span className="menu-item__label t-sm-regular">{currentLabel}</span>
          <span className="icon-box icon-16 menu-item__chevron"><IconChevronRight /></span>
        </button>

        {langOpen && (
          <div className="menu menu--sub" role="menu">
            {LANGUAGES.map(({ code, label }) => {
              const Flag = FLAGS[code];
              return (
                <button
                  key={code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={lang === code}
                  className="menu-item menu-item--sub"
                  onClick={() => { setLang(code); setLangOpen(false); }}
                >
                  <span className="menu-item__icon icon-box icon-20"><Flag /></span>
                  <span className="menu-item__label t-sm-regular">{label}</span>
                  {lang === code && <span className="icon-box icon-16 menu-item__check"><Check /></span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="menu__divider" />

      <button type="button" className="menu-item" role="menuitem">
        <span className="menu-item__icon icon-box icon-20"><IconQuestionCircle /></span>
        <span className="menu-item__label t-sm-regular">Help</span>
      </button>
      <button type="button" className="menu-item" role="menuitem">
        <span className="menu-item__icon icon-box icon-20"><IconHeadset /></span>
        <span className="menu-item__label t-sm-regular">Contact support</span>
      </button>

      <div className="menu__divider" />

      <button type="button" className="menu-item" role="menuitem" onClick={onLogout}>
        <span className="menu-item__icon icon-box icon-20"><IconSignOut /></span>
        <span className="menu-item__label t-sm-regular">Log out</span>
      </button>
    </div>
  );
}
