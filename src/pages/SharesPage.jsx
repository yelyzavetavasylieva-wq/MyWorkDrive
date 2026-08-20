import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STORAGE_LABELS } from '../data/shares.js';
import { useShares } from '../store/SharesContext.jsx';
import {
  IconSearch, IconSortDown, IconEdit, IconCheckCircle,
  IconErrorCircle, IconWarning, IconGlobe, IconLockOpen, IconArrowDownload, IconDocEdit,
} from '../ui/icons.jsx';
import {
  LogoS3, LogoSMB, LogoOneDrive, LogoAzureBlob, LogoSharePoint, LogoAzureFiles,
} from '../ui/logos.jsx';
import Toggle from '../ui/Toggle.jsx';
import Checkbox from '../ui/Checkbox.jsx';
import Pagination from '../ui/Pagination.jsx';

const STORAGE_LOGOS = {
  s3: LogoS3, smb: LogoSMB, onedrive: LogoOneDrive,
  azureBlob: LogoAzureBlob, sharepoint: LogoSharePoint, azureFiles: LogoAzureFiles,
};
const FEATURE_ICONS = {
  globe: IconGlobe, lock: IconLockOpen, download: IconArrowDownload, docedit: IconDocEdit,
};
// Sample drive letters, revealed only when the toggle is enabled.
const DRIVE_LETTERS = ['Z:', 'Y:', 'X:', 'W:', 'V:', 'U:', 'T:', 'S:', 'R:', 'Q:'];

function StatusIcon({ status }) {
  if (status === 'error') return <span className="icon-box icon-16 status-icon status-icon--error"><IconErrorCircle /></span>;
  if (status === 'warning') return <span className="icon-box icon-16 status-icon status-icon--warning"><IconWarning /></span>;
  return null;
}

function FeatureCell({ features }) {
  if (!features.length) return <span className="cell-dash t-md-regular">—</span>;
  return (
    <div className="feature-badges">
      {features.map((f) => {
        const Ico = FEATURE_ICONS[f];
        return (
          <span key={f} className="feature-badge">
            <span className="icon-box feature-badge__icon"><Ico width="12" height="12" /></span>
          </span>
        );
      })}
    </div>
  );
}

function TruncCell({ text, more }) {
  return (
    <div className="trunc-cell">
      <span className="trunc-cell__text t-sm-data">{text}</span>
      {more && <button type="button" className="more-link t-sm-data">More</button>}
    </div>
  );
}

export default function SharesPage() {
  const navigate = useNavigate();
  const { shares } = useShares();
  const [driveLetters, setDriveLetters] = useState(false);
  const [query, setQuery] = useState('');
  // null = design's natural order; 'asc' / 'desc' after the user sorts by Name.
  const [sortDir, setSortDir] = useState(null);
  const [selected, setSelected] = useState(() => new Set());
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = shares.filter((s) => !q || s.name.toLowerCase().includes(q));
    if (sortDir) {
      list = [...list].sort((a, b) =>
        sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
    }
    return list;
  }, [shares, query, sortDir]);

  const allChecked = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const someChecked = rows.some((r) => selected.has(r.id));

  const toggleAll = () => {
    setSelected((prev) => {
      if (rows.every((r) => prev.has(r.id))) return new Set();
      return new Set(rows.map((r) => r.id));
    });
  };
  const toggleRow = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="page">
      {/* Page header */}
      <header className="page-header">
        <div className="page-header__text">
          <h1 className="t-display-xs-semibold page-header__title">Shares</h1>
          <p className="t-md-regular page-header__subtitle">
            Manage and configure server file shares and user access.
          </p>
        </div>
        <div className="page-header__actions">
          <button type="button" className="btn btn--primary" onClick={() => navigate('/shares/new')}>Add new share</button>
        </div>
      </header>

      {/* Drive-letter toggle card */}
      <section className="toggle-card">
        <div className="toggle-row">
          <Toggle
            id="drive-letter-toggle"
            checked={driveLetters}
            onChange={setDriveLetters}
            ariaLabel="Enable drive letter assignment"
          />
          <label htmlFor="drive-letter-toggle" className="toggle-row__text">
            <span className="t-md-semibold toggle-row__title">Enable drive letter assignment</span>
            <span className="t-md-regular toggle-row__desc">
              When enabled, a Drive Letter column will appear in the list, allowing you to assign a drive letter to each share.
            </span>
          </label>
        </div>
      </section>

      {/* Table area */}
      <section className="table-area">
        <div className="table-toolbar">
          <div className="field field--search">
            <span className="icon-box icon-24 field__icon"><IconSearch /></span>
            <input
              className="field__input t-md-regular"
              placeholder="Search"
              aria-label="Search shares"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrap">
          <table className={'data-table' + (driveLetters ? ' data-table--drive' : '')}>
            <colgroup>
              <col className="col-check" />
              <col className="col-name" />
              {driveLetters && <col className="col-drive" />}
              <col className="col-features" />
              <col className="col-storage" />
              <col className="col-users" />
              <col className="col-groups" />
              <col className="col-actions" />
            </colgroup>
            <thead>
              <tr>
                <th className="th th--check">
                  <Checkbox
                    checked={allChecked}
                    indeterminate={!allChecked && someChecked}
                    onChange={toggleAll}
                    ariaLabel="Select all shares"
                  />
                </th>
                <th className="th">
                  <button
                    type="button"
                    className="th__sort"
                    onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
                  >
                    <span className="t-xs-semibold th__label">Name</span>
                    <span className={'icon-box icon-16 th__sort-icon' + (sortDir === 'asc' ? ' th__sort-icon--asc' : '')}>
                      <IconSortDown />
                    </span>
                  </button>
                </th>
                {driveLetters && <th className="th"><span className="t-xs-semibold th__label">Drive Letter</span></th>}
                <th className="th"><span className="t-xs-semibold th__label">Features</span></th>
                <th className="th"><span className="t-xs-semibold th__label">Storage type</span></th>
                <th className="th"><span className="t-xs-semibold th__label">Users</span></th>
                <th className="th"><span className="t-xs-semibold th__label">Groups</span></th>
                <th className="th th--actions" aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const Logo = STORAGE_LOGOS[row.storage];
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
                    {driveLetters && (
                      <td className="td"><span className="t-sm-data">{DRIVE_LETTERS[i % DRIVE_LETTERS.length]}</span></td>
                    )}
                    <td className="td td--features">
                      <div className="cell cell--features"><FeatureCell features={row.features} /></div>
                    </td>
                    <td className="td td--storage">
                      <div className="cell cell--storage">
                        <span className="icon-box icon-20 storage-logo"><Logo /></span>
                        <span className="t-sm-data">{STORAGE_LABELS[row.storage]}</span>
                      </div>
                    </td>
                    <td className="td"><TruncCell text={row.users.join(', ')} more={row.usersMore} /></td>
                    <td className="td"><TruncCell text={row.groups.join(', ')} more={row.groupsMore} /></td>
                    <td className="td td--actions">
                      <div className="cell cell--actions">
                        <button type="button" className="icon-btn icon-btn--table" aria-label={`Edit ${row.name}`}>
                          <span className="icon-box icon-16"><IconEdit /></span>
                        </button>
                        <button type="button" className="icon-btn icon-btn--table" aria-label={`Confirm ${row.name}`}>
                          <span className="icon-box icon-16"><IconCheckCircle /></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td className="td td--empty" colSpan={driveLetters ? 8 : 7}>No shares match “{query}”.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={page} onPage={setPage} rows={10} onRowsClick={() => {}} />
      </section>
    </div>
  );
}
