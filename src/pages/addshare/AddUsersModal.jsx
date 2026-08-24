import React, { useState, useMemo, useEffect } from 'react';
import { DIRECTORY } from '../../data/wizard.js';
import { IconSearch, IconDismiss } from '../../ui/icons.jsx';
import { IconUsersGroup, IconUserSingle, IconTrash } from '../../ui/wizard-icons.jsx';

function Avatar({ type }) {
  return (
    <span className="icon-box icon-20 dir-item__icon">
      {type === 'group' ? <IconUsersGroup /> : <IconUserSingle />}
    </span>
  );
}

export default function AddUsersModal({ open, onClose, initialIds, onConfirm }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all | user | group
  const [assigned, setAssigned] = useState(() => new Set(initialIds));

  useEffect(() => {
    if (open) { setAssigned(new Set(initialIds)); setQuery(''); setFilter('all'); }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Left pane shows only unassigned entries; clicking one moves it to the right.
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DIRECTORY.filter((d) =>
      !assigned.has(d.id) &&
      (filter === 'all' || d.type === filter) && (!q || d.name.toLowerCase().includes(q))
    );
  }, [query, filter, assigned]);

  const assignedItems = useMemo(() => DIRECTORY.filter((d) => assigned.has(d.id)), [assigned]);

  if (!open) return null;

  const add = (id) => setAssigned((s) => new Set(s).add(id));
  const remove = (id) => setAssigned((s) => { const n = new Set(s); n.delete(id); return n; });

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal modal--wide" role="dialog" aria-modal="true" aria-labelledby="addug-title" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal--wide__header">
          <h2 id="addug-title" className="t-lg-semibold">Add Users &amp; Groups</h2>
          <button type="button" className="modal__close modal__close--inline" onClick={onClose} aria-label="Close">
            <span className="icon-box icon-20"><IconDismiss /></span>
          </button>
        </div>

        <div className="ug-panes">
          {/* Left: directory */}
          <div className="ug-pane ug-pane--list">
            <h3 className="t-sm-semibold ug-pane__title">List of Users &amp; Groups</h3>
            <div className="field field--search ug-search">
              <span className="icon-box icon-24 field__icon"><IconSearch /></span>
              <input className="field__input t-md-regular" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search users and groups" />
            </div>
            <p className="t-sm-regular ug-hint">This list shows the first 100 users &amp; groups. To find others, simply search by name.</p>
            <div className="chip-group">
              {[['all', 'All'], ['user', 'Users'], ['group', 'Groups']].map(([k, lbl]) => (
                <button key={k} type="button" className={'chip' + (filter === k ? ' chip--active' : '')} onClick={() => setFilter(k)}>{lbl}</button>
              ))}
            </div>
            <div className="dir-list">
              {list.map((d) => (
                <button key={d.id} type="button" className="dir-item" onClick={() => add(d.id)}>
                  <Avatar type={d.type} />
                  <span className="t-sm-regular dir-item__name">{d.name}</span>
                </button>
              ))}
              {list.length === 0 && <p className="t-sm-regular ug-empty-text">No matches.</p>}
            </div>
          </div>

          {/* Right: assigned */}
          <div className="ug-pane ug-pane--assigned">
            <h3 className="t-sm-semibold ug-pane__title">Assigned Users &amp; Groups</h3>
            {assignedItems.length === 0 ? (
              <div className="ug-empty">
                <span className="featured-icon featured-icon--gray"><span className="icon-box icon-24"><IconUsersGroup /></span></span>
                <p className="t-md-semibold">No assigned Users &amp; Groups yet</p>
                <p className="t-sm-regular ug-empty__desc">To add user or group, simply click it in the List of Users &amp; Groups</p>
              </div>
            ) : (
              <div className="dir-list">
                {assignedItems.map((d) => (
                  <div key={d.id} className="dir-item dir-item--assigned">
                    <Avatar type={d.type} />
                    <span className="t-sm-regular dir-item__name">{d.name}</span>
                    <button type="button" className="dir-item__remove" onClick={() => remove(d.id)} aria-label={`Remove ${d.name}`}>
                      <span className="icon-box icon-16"><IconTrash /></span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal--wide__footer">
          <button type="button" className="btn btn--secondary" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn--primary" disabled={assignedItems.length === 0} onClick={() => onConfirm([...assigned])}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
