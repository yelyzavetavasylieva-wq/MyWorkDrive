import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { STORAGE_LABELS } from '../data/shares.js';
import { useShares } from '../store/SharesContext.jsx';
import {
  IconSearch, IconSortDown, IconEdit, IconCheckCircle, IconChevronDown, IconDismiss,
  IconErrorCircle, IconWarning, IconGlobe, IconLockOpen, IconArrowDownload, IconDocEdit, IconShares,
} from '../ui/icons.jsx';
import { IconTrash } from '../ui/wizard-icons.jsx';
import {
  LogoS3, LogoSMB, LogoOneDrive, LogoAzureBlob, LogoSharePoint, LogoAzureFiles,
} from '../ui/logos.jsx';
import Toggle from '../ui/Toggle.jsx';
import Checkbox from '../ui/Checkbox.jsx';
import Pagination from '../ui/Pagination.jsx';
import DeleteShareModal from './DeleteShareModal.jsx';
import AssignedUsersModal from './AssignedUsersModal.jsx';

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

function TruncCell({ text, more, onMore }) {
  return (
    <div className="trunc-cell">
      <span className="trunc-cell__text t-sm-data">{text}</span>
      {more && <button type="button" className="more-link t-sm-data" onClick={onMore}>More</button>}
    </div>
  );
}

export default function SharesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { shares, removeShares } = useShares();
  const [driveLetters, setDriveLetters] = useState(false);
  const [driveLetterMap, setDriveLetterMap] = useState({});
  const [query, setQuery] = useState('');
  // null = design's natural order; 'asc' / 'desc' after the user sorts by Name.
  const [sortDir, setSortDir] = useState(null);
  const [selected, setSelected] = useState(() => new Set());
  const [page, setPage] = useState(1);
  const [assignedShare, setAssignedShare] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

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

  const driveLetterFor = (row, i) => driveLetterMap[row.id] ?? DRIVE_LETTERS[i % DRIVE_LETTERS.length];
  const setDriveLetter = (id, value) => setDriveLetterMap((m) => ({ ...m, [id]: value }));

  const pushToast = (text) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  };
  const dismissToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  // Show a confirmation toast when arriving here after creating a share.
  useEffect(() => {
    if (location.state?.toast) {
      pushToast(location.state.toast);
      navigate(location.pathname, { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const selectedCount = selected.size;
  const selectedShares = shares.filter((s) => selected.has(s.id));

  const confirmDelete = () => {
    const ids = [...selected];
    const text = ids.length === 1
      ? `“${selectedShares[0]?.name}” share successfully deleted`
      : `${ids.length} shares successfully deleted`;
    removeShares(ids);
    setSelected(new Set());
    setDeleteOpen(false);
    pushToast(text);
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
          {selectedCount > 0 && (
            <button type="button" className="btn btn--destructive-secondary" onClick={() => setDeleteOpen(true)}>
              <span className="icon-box icon-20"><IconTrash /></span>Delete
            </button>
          )}
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
                      <td className="td">
                        <div className="select select--drive">
                          <select
                            className="select__native t-sm-data"
                            value={driveLetterFor(row, i)}
                            onChange={(e) => setDriveLetter(row.id, e.target.value)}
                            aria-label={`Drive letter for ${row.name}`}
                          >
                            {DRIVE_LETTERS.map((d) => <option key={d} value={d}>{d}</option>)}
                          </select>
                          <span className="icon-box icon-20 select__chevron"><IconChevronDown /></span>
                        </div>
                      </td>
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
                    <td className="td"><TruncCell text={row.users.join(', ')} more={row.usersMore} onMore={() => setAssignedShare(row)} /></td>
                    <td className="td"><TruncCell text={row.groups.join(', ')} more={row.groupsMore} onMore={() => setAssignedShare(row)} /></td>
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
                  <td className="td td--empty" colSpan={driveLetters ? 8 : 7}>
                    <div className="table-empty">
                      <span className="featured-icon featured-icon--gray"><span className="icon-box icon-24"><IconShares /></span></span>
                      <p className="t-md-semibold">{query ? 'No shares found' : 'No shares yet'}</p>
                      <p className="t-sm-regular table-empty__desc">
                        {query ? `No shares match “${query}”.` : 'Add your first share to make files available to users.'}
                      </p>
                      {!query && (
                        <button type="button" className="btn btn--secondary" onClick={() => navigate('/shares/new')}>Add new share</button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={page} onPage={setPage} rows={10} onRowsClick={() => {}} />
      </section>

      <AssignedUsersModal open={!!assignedShare} share={assignedShare} onClose={() => setAssignedShare(null)} />
      <DeleteShareModal
        open={deleteOpen}
        count={selectedCount}
        name={selectedShares[0]?.name}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />

      {toasts.length > 0 && (
        <div className="toast-wrap">
          {toasts.map((t) => (
            <div key={t.id} className="toast" role="status">
              <span className="icon-box icon-20 toast__icon"><IconCheckCircle /></span>
              <span className="t-sm-regular toast__text">{t.text}</span>
              <button type="button" className="toast__close" onClick={() => dismissToast(t.id)} aria-label="Dismiss">
                <span className="icon-box icon-16"><IconDismiss /></span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
