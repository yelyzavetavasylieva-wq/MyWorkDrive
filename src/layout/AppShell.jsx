import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import LogoutModal from './LogoutModal.jsx';
import LeaveWizardModal from './LeaveWizardModal.jsx';

export default function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingNav, setPendingNav] = useState(null); // {path,label} when leaving the wizard
  const userBtnRef = useRef(null);
  const menuRef = useRef(null);

  const inWizard = location.pathname === '/shares/new';

  // Close the user menu on outside click or Escape.
  useEffect(() => {
    if (!userMenuOpen) return undefined;
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setUserMenuOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [userMenuOpen]);

  return (
    <div className="shell">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        onOpenUserMenu={() => setUserMenuOpen((o) => !o)}
        userMenuOpen={userMenuOpen}
        userBtnRef={userBtnRef}
        menuRef={menuRef}
        onLogout={() => { setUserMenuOpen(false); setModalOpen(true); }}
        guardActive={inWizard}
        onGuardedNav={(path, label) => setPendingNav({ path, label })}
      />

      <main className="shell__main">
        <div className="shell__content">
          <Outlet />
        </div>
      </main>

      <LogoutModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={() => setModalOpen(false)}
      />

      <LeaveWizardModal
        open={!!pendingNav}
        targetLabel={pendingNav?.label}
        onStay={() => setPendingNav(null)}
        onLeave={() => { const to = pendingNav.path; setPendingNav(null); navigate(to); }}
      />
    </div>
  );
}
