import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import LogoutModal from './LogoutModal.jsx';

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const userBtnRef = useRef(null);
  const menuRef = useRef(null);

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
    </div>
  );
}
