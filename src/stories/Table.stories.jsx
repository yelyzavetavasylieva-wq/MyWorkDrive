import React, { useState } from 'react';
import {
  IconSortDown, IconEdit, IconCheckCircle, IconGlobe, IconLockOpen,
  IconArrowDownload, IconErrorCircle, IconWarning,
} from '../ui/icons.jsx';
import { LogoSMB, LogoS3, LogoOneDrive } from '../ui/logos.jsx';
import Checkbox from '../ui/Checkbox.jsx';

// Figma: UI kit → Table (Table header cell, Table cell, Table badge).
// Implemented as `.data-table` / `.th` / `.td` in components.css, used on the
// Shares screen (SharesPage). This story renders a self-contained sample.
const meta = {
  title: 'Design System/Table',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;

const ROWS = [
  { id: 1, name: 'Marketing', status: null, storage: LogoSMB, storageLabel: 'SMB / CIFS', features: [IconGlobe, IconLockOpen], users: 'jsmith, arossi', groups: 'Marketing' },
  { id: 2, name: 'BackupNode-A', status: 'warning', storage: LogoS3, storageLabel: 'Amazon S3', features: [IconArrowDownload], users: 'admin', groups: 'Ops, Backup' },
  { id: 3, name: 'Design assets', status: 'error', storage: LogoOneDrive, storageLabel: 'OneDrive', features: [IconGlobe], users: 'kwong', groups: 'Design' },
];

function StatusIcon({ status }) {
  if (status === 'warning') return <span className="icon-box icon-16 status-icon status-icon--warning"><IconWarning /></span>;
  if (status === 'error') return <span className="icon-box icon-16 status-icon status-icon--error"><IconErrorCircle /></span>;
  return null;
}

export const Default = {
  render: () => {
    const [selected, setSelected] = useState(() => new Set([2]));
    const [sortAsc, setSortAsc] = useState(true);
    const allChecked = ROWS.every((r) => selected.has(r.id));
    const someChecked = ROWS.some((r) => selected.has(r.id));
    const toggleAll = () => setSelected(allChecked ? new Set() : new Set(ROWS.map((r) => r.id)));
    const toggleRow = (id) => setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    return (
      <div className="table-wrap" style={{ maxWidth: 960 }}>
        <table className="data-table">
          <colgroup>
            <col className="col-check" />
            <col className="col-name" />
            <col className="col-features" />
            <col className="col-storage" />
            <col className="col-users" />
            <col className="col-groups" />
            <col className="col-actions" />
          </colgroup>
          <thead>
            <tr>
              <th className="th th--check">
                <Checkbox checked={allChecked} indeterminate={!allChecked && someChecked} onChange={toggleAll} ariaLabel="Select all" />
              </th>
              <th className="th">
                <button type="button" className="th__sort" onClick={() => setSortAsc((v) => !v)}>
                  <span className="t-xs-semibold th__label">Name</span>
                  <span className={'icon-box icon-16 th__sort-icon' + (sortAsc ? ' th__sort-icon--asc' : '')}><IconSortDown /></span>
                </button>
              </th>
              <th className="th"><span className="t-xs-semibold th__label">Features</span></th>
              <th className="th"><span className="t-xs-semibold th__label">Storage type</span></th>
              <th className="th"><span className="t-xs-semibold th__label">Users</span></th>
              <th className="th"><span className="t-xs-semibold th__label">Groups</span></th>
              <th className="th th--actions" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => {
              const Logo = row.storage;
              const checked = selected.has(row.id);
              return (
                <tr key={row.id} className={checked ? 'row--selected' : undefined}>
                  <td className="td td--check">
                    <Checkbox checked={checked} onChange={() => toggleRow(row.id)} ariaLabel={`Select ${row.name}`} />
                  </td>
                  <td className="td td--name">
                    <div className={'cell cell--name' + (row.status ? ' has-status' : '')}>
                      <span className="td-name__text t-sm-data">{row.name}</span>
                      <StatusIcon status={row.status} />
                    </div>
                  </td>
                  <td className="td td--features">
                    <div className="cell cell--features">
                      <div className="feature-badges">
                        {row.features.map((Ico, i) => (
                          <span key={i} className="feature-badge"><span className="icon-box feature-badge__icon"><Ico width="12" height="12" /></span></span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="td td--storage">
                    <div className="cell cell--storage">
                      <span className="icon-box icon-20 storage-logo"><Logo /></span>
                      <span className="t-sm-data">{row.storageLabel}</span>
                    </div>
                  </td>
                  <td className="td"><div className="trunc-cell"><span className="trunc-cell__text t-sm-data">{row.users}</span></div></td>
                  <td className="td"><div className="trunc-cell"><span className="trunc-cell__text t-sm-data">{row.groups}</span></div></td>
                  <td className="td td--actions">
                    <div className="cell cell--actions">
                      <button type="button" className="icon-btn icon-btn--table" aria-label={`Edit ${row.name}`}><span className="icon-box icon-16"><IconEdit /></span></button>
                      <button type="button" className="icon-btn icon-btn--table" aria-label={`Confirm ${row.name}`}><span className="icon-box icon-16"><IconCheckCircle /></span></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
};
