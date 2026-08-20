import React, { useState, useMemo } from 'react';
import { PERMISSION_COLUMNS, defaultPermissions, DIRECTORY } from '../../data/wizard.js';
import { IconSearch, IconSortDown, IconQuestionCircle } from '../../ui/icons.jsx';
import { IconImport, IconPlus, IconInfo, IconUsersGroup, IconUserSingle } from '../../ui/wizard-icons.jsx';
import Checkbox from '../../ui/Checkbox.jsx';
import Pagination from '../../ui/Pagination.jsx';
import Tooltip from '../../ui/Tooltip.jsx';
import AddUsersModal from './AddUsersModal.jsx';

export default function StepUsers({ rows, setRows }) {
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => !q || r.name.toLowerCase().includes(q));
  }, [rows, query]);

  const setPerm = (id, key, val) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, permissions: { ...r.permissions, [key]: val } } : r)));

  const handleConfirm = (ids) => {
    setRows((rs) => {
      const existing = new Set(rs.map((r) => r.id));
      const additions = ids
        .filter((id) => !existing.has(id))
        .map((id) => {
          const d = DIRECTORY.find((x) => x.id === id);
          return { id: d.id, name: d.name, type: d.type, permissions: defaultPermissions() };
        });
      // keep only rows still in ids (allow removal via modal), then append new
      const kept = rs.filter((r) => ids.includes(r.id));
      return [...kept, ...additions];
    });
    setModalOpen(false);
  };

  return (
    <div className="wz-step">
      <div className="wz-step__head">
        <h2 className="t-display-xs-semibold wz-step__title">Users &amp; Groups</h2>
        <p className="t-md-regular wz-step__subtitle">Assign users and groups to this share and configure their access permissions.</p>
      </div>

      <div className="ug-toolbar">
        <div className="field field--search ug-toolbar__search">
          <span className="icon-box icon-24 field__icon"><IconSearch /></span>
          <input className="field__input t-md-regular" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search assigned" disabled={rows.length === 0} />
        </div>
        <div className="ug-toolbar__actions">
          <button type="button" className="btn btn--secondary"><span className="icon-box icon-20"><IconImport /></span>Import</button>
          <button type="button" className="btn btn--primary" onClick={() => setModalOpen(true)}><span className="icon-box icon-20"><IconPlus /></span>Add Users &amp; Groups</button>
        </div>
      </div>

      <div className="table-wrap">
        <table className="data-table perm-table">
          <thead>
            <tr>
              <th className="th perm-th--name">
                <span className="th__sort"><span className="t-xs-semibold th__label">User / Group</span><span className="icon-box icon-16 th__sort-icon"><IconSortDown /></span></span>
              </th>
              {PERMISSION_COLUMNS.map((c) => (
                <th key={c.key} className="th perm-th">
                  {c.disabled ? (
                    <span className="perm-th__disabled">
                      <span className="t-xs-semibold th__label">{c.label}</span>
                      <Tooltip label="Guest access is disabled — turned off in Settings." placement="right">
                        <span className="icon-box icon-16 perm-th__help"><IconQuestionCircle /></span>
                      </Tooltip>
                    </span>
                  ) : (
                    <span className="t-xs-semibold th__label">{c.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td className="td">
                  <div className="cell cell--name perm-name">
                    <span className="icon-box icon-20 perm-name__icon">{r.type === 'group' ? <IconUsersGroup /> : <IconUserSingle />}</span>
                    <span className="td-name__text t-sm-data">{r.name}</span>
                  </div>
                </td>
                {PERMISSION_COLUMNS.map((c) => (
                  <td key={c.key} className="td perm-td">
                    {c.disabled ? (
                      <span className="cell-dash t-md-regular">—</span>
                    ) : (
                      <Checkbox checked={!!r.permissions[c.key]} onChange={(v) => setPerm(r.id, c.key, v)} ariaLabel={`${c.label} for ${r.name}`} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="td perm-empty" colSpan={PERMISSION_COLUMNS.length + 1}>
                  <div className="ug-empty">
                    <span className="featured-icon featured-icon--gray"><span className="icon-box icon-20"><IconUsersGroup /></span></span>
                    <p className="t-md-semibold">{rows.length === 0 ? 'No users or groups assigned' : `No matches for “${query}”`}</p>
                    {rows.length === 0 && <p className="t-sm-regular ug-empty__desc">Select which users or groups should have access to this share</p>}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="info-banner">
        <span className="icon-box icon-20 info-banner__icon"><IconInfo /></span>
        <span className="t-sm-regular">New shares will be available to currently logged in users after logoff / login</span>
      </div>

      {rows.length > 0 && <Pagination page={page} onPage={setPage} rows={10} onRowsClick={() => {}} />}

      <AddUsersModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialIds={rows.map((r) => r.id)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
