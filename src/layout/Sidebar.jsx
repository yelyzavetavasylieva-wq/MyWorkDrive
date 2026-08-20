import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  IconShares, IconSettings, IconIntegrations, IconClustering,
  IconDevices, IconPublicSharing, IconUserActivity, IconHealth,
  IconSearch, IconPanel, IconPersonFooter,
} from '../ui/icons.jsx';
import { BrandLogo } from '../ui/logos.jsx';
import Tooltip from '../ui/Tooltip.jsx';
import UserMenu from './UserMenu.jsx';

const NAV = [
  {
    title: 'Configuration',
    items: [
      { to: '/shares', label: 'Shares', Icon: IconShares },
      { to: '/settings', label: 'Settings', Icon: IconSettings },
      { to: '/integrations', label: 'Integrations', Icon: IconIntegrations },
      { to: '/clustering', label: 'Clustering', Icon: IconClustering },
    ],
  },
  {
    title: 'Monitoring',
    items: [
      { to: '/devices', label: 'Devices', Icon: IconDevices },
      { to: '/public-sharing', label: 'Public sharing', Icon: IconPublicSharing },
      { to: '/user-activity', label: 'User activity', Icon: IconUserActivity },
      { to: '/health', label: 'Health', Icon: IconHealth },
    ],
  },
];

function NavItem({ to, label, Icon, collapsed, guardActive, onGuardedNav }) {
  const link = (
    <NavLink
      to={to}
      className={({ isActive }) => 'nav-item' + (isActive ? ' nav-item--active' : '')}
      onClickCapture={guardActive ? (e) => { e.preventDefault(); e.stopPropagation(); onGuardedNav(to, label); } : undefined}
    >
      <span className="icon-box icon-24 nav-item__icon"><Icon /></span>
      {!collapsed && <span className="nav-item__label t-md-semibold">{label}</span>}
    </NavLink>
  );
  return collapsed ? <Tooltip label={label}>{link}</Tooltip> : link;
}

export default function Sidebar({ collapsed, onToggle, onOpenUserMenu, userMenuOpen, userBtnRef, menuRef, onLogout, guardActive, onGuardedNav }) {
  return (
    <aside className={'sidebar' + (collapsed ? ' sidebar--collapsed' : '')}>
      <div className="sidebar__top">
        {/* Header: logo + collapse toggle */}
        <div className="sidebar__header">
          {!collapsed && (
            <span className="sidebar__logo"><BrandLogo /></span>
          )}
          <Tooltip label={collapsed ? 'Open sidebar' : 'Close sidebar'}>
            <button
              type="button"
              className="icon-btn sidebar__toggle"
              onClick={onToggle}
              aria-label={collapsed ? 'Open sidebar' : 'Close sidebar'}
              aria-expanded={!collapsed}
            >
              <span className="icon-box icon-24"><IconPanel /></span>
            </button>
          </Tooltip>
        </div>

        {/* Search */}
        <div className="sidebar__search-wrap">
          {collapsed ? (
            <Tooltip label="Search">
              <button type="button" className="icon-btn sidebar__search-icon" aria-label="Search">
                <span className="icon-box icon-24"><IconSearch /></span>
              </button>
            </Tooltip>
          ) : (
            <div className="field">
              <span className="icon-box icon-24 field__icon"><IconSearch /></span>
              <input className="field__input t-md-regular" placeholder="Search" aria-label="Search" />
            </div>
          )}
        </div>

        {collapsed && <div className="sidebar__divider" />}

        {/* Navigation */}
        <nav className="sidebar__nav">
          {NAV.map((section) => (
            <div className="nav-section" key={section.title}>
              {!collapsed && <div className="nav-section__title t-md-regular">{section.title}</div>}
              {section.items.map((it) => (
                <NavItem key={it.to} {...it} collapsed={collapsed} guardActive={guardActive} onGuardedNav={onGuardedNav} />
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer: user */}
      <div className="sidebar__footer" ref={menuRef}>
        {userMenuOpen && <UserMenu onLogout={onLogout} />}
        {collapsed ? (
          <Tooltip label="MWF\yelyzaveta">
            <button
              type="button"
              ref={userBtnRef}
              className={'nav-item nav-item--button' + (userMenuOpen ? ' nav-item--active' : '')}
              onClick={onOpenUserMenu}
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
            >
              <span className="icon-box icon-24 nav-item__icon"><IconPersonFooter /></span>
            </button>
          </Tooltip>
        ) : (
          <button
            type="button"
            ref={userBtnRef}
            className={'nav-item nav-item--button' + (userMenuOpen ? ' nav-item--active' : '')}
            onClick={onOpenUserMenu}
            aria-haspopup="menu"
            aria-expanded={userMenuOpen}
          >
            <span className="icon-box icon-24 nav-item__icon"><IconPersonFooter /></span>
            <span className="nav-item__label t-md-semibold">{'MWF\\yelyzaveta'}</span>
          </button>
        )}
      </div>
    </aside>
  );
}
