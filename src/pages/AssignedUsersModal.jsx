import React, { useState, useMemo, useEffect } from 'react';
import { IconSearch, IconDismiss } from '../ui/icons.jsx';
import { IconUsersGroup, IconUserSingle } from '../ui/wizard-icons.jsx';

// Read-only modal listing all users & groups assigned to a share.
// Opened from the "More" link in the Users / Groups cells of the Shares table
// (Figma: Shares → Assigned Users & Groups).
export default function AssignedUsersModal({ open, onClose, share }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all | user | group

  useEffect(() => {
    if (open) { setQuery(''); setFilter('all'); }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const items = useMemo(() => {
    if (!share) return [];
    const users = (share.users || []).filter((n) => n !== '—').map((name) => ({ name, type: 'user' }));
    const groups = (share.groups || []).filter((n) => n !== '—').map((name) => ({ name, type: 'group' }));
    return [...groups, ...users];
  }, [share]);

  const counts = useMemo(() => ({
    groups: items.filter((i) => i.type === 'group').length,
    users: items.filter((i) => i.type === 'user').length,
  }), [items]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) =>
      (filter === 'all' || i.type === filter) && (!q || i.name.toLowerCase().includes(q))
    );
  }, [items, query, filter]);

  if (!open || !share) return null;

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="assigned-title" onMouseDown={(e) => e.stopPropagation()}>
        <div className="assigned-modal__header">
          <div className="assigned-modal__titles">
            <h2 id="assigned-title" className="t-lg-semibold assigned-modal__title">Assigned Users &amp; Groups</h2>
            <p className="t-sm-regular assigned-modal__subtitle">{share.name}</p>
          </div>
          <button type="button" className="modal__close modal__close--inline" onClick={onClose} aria-label="Close">
            <span className="icon-box icon-20"><IconDismiss /></span>
          </button>
        </div>

        <div className="assigned-modal__body">
          <p className="t-sm-regular assigned-modal__count">{counts.groups} groups, {counts.users} users</p>

          <div className="field field--search assigned-modal__search">
            <span className="icon-box icon-24 field__icon"><IconSearch /></span>
            <input className="field__input t-md-regular" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search assigned users and groups" />
          </div>

          <div className="chip-group">
            {[['all', 'All'], ['group', 'Groups'], ['user', 'Users']].map(([k, lbl]) => (
              <button key={k} type="button" className={'chip' + (filter === k ? ' chip--active' : '')} onClick={() => setFilter(k)}>{lbl}</button>
            ))}
          </div>

          <div className="dir-list">
            {list.map((it, i) => (
              <div key={`${it.type}-${it.name}-${i}`} className="assigned-row">
                <span className="icon-box icon-20 dir-item__icon">{it.type === 'group' ? <IconUsersGroup /> : <IconUserSingle />}</span>
                <span className="t-sm-regular dir-item__name">{it.name}</span>
              </div>
            ))}
            {list.length === 0 && <p className="t-sm-regular ug-empty-text">No matches.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
