import React, { useState } from 'react';
import { findProvider, PERMISSION_COLUMNS, settingsFieldsFor } from '../../data/wizard.js';
import { IconEdit, IconSortDown } from '../../ui/icons.jsx';
import { IconCheckDot, IconXDot, IconUsersGroup, IconUserSingle } from '../../ui/wizard-icons.jsx';
import { LogoS3, LogoSMB, LogoOneDrive, LogoAzureBlob, LogoSharePoint, LogoAzureFiles } from '../../ui/logos.jsx';
import Pagination from '../../ui/Pagination.jsx';

const LOGOS = { s3: LogoS3, smb: LogoSMB, onedrive: LogoOneDrive, azureBlob: LogoAzureBlob, sharepoint: LogoSharePoint, azureFiles: LogoAzureFiles };

function Section({ index, title, onEdit, children }) {
  return (
    <section className="review-card">
      <header className="review-card__head">
        <h3 className="t-md-semibold">{index}. {title}</h3>
        <button type="button" className="btn btn--secondary btn--sm" onClick={onEdit}>
          <span className="icon-box icon-16"><IconEdit /></span><span className="btn__label">Edit</span>
        </button>
      </header>
      {children}
    </section>
  );
}

function KVTable({ rows }) {
  return (
    <table className="kv-table">
      <thead><tr><th className="kv-th t-xs-semibold">Field</th><th className="kv-th t-xs-semibold">Value</th></tr></thead>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k}><td className="kv-td t-sm-data">{k}</td><td className="kv-td kv-td--value t-sm-data">{v}</td></tr>
        ))}
      </tbody>
    </table>
  );
}

export default function StepReview({ state, onEdit }) {
  const [page, setPage] = useState(1);
  const provider = findProvider(state.provider);
  const Logo = provider ? LOGOS[provider.logo] : null;
  const en = (b) => (b ? 'Enabled' : 'Disabled');

  const settingsRows = settingsFieldsFor(state.provider).map((f) => {
    const raw = String((state.settings && state.settings[f.key]) || '');
    const value = raw
      ? (f.type === 'password' ? '••••••••' : raw)
      : <span className="kv-empty">—</span>;
    return [f.label, value];
  });

  return (
    <div className="wz-step">
      <div className="wz-step__head">
        <h2 className="t-display-xs-semibold wz-step__title">Review &amp; Confirm</h2>
        <p className="t-md-regular wz-step__subtitle">
          Review the settings for this share. To change something, click <strong>Edit</strong> in the corresponding section – you’ll be brought back there before creating the share.
        </p>
      </div>

      <div className="review-list">
        <Section index="1" title="Storage type" onEdit={() => onEdit(0)}>
          <KVTable rows={[['Selected type',
            <span className="review-storage"><span className="icon-box icon-20">{Logo && <Logo />}</span>{provider?.name}</span>]]} />
        </Section>

        <Section index="2" title="Storage settings" onEdit={() => onEdit(1)}>
          <KVTable rows={settingsRows} />
        </Section>

        <Section index="3" title="Share details" onEdit={() => onEdit(2)}>
          <KVTable rows={[['Name', state.name], ['Drive letter', state.driveLetter]]} />
        </Section>

        <Section index="4" title="Features" onEdit={() => onEdit(3)}>
          <KVTable rows={[
            ['Download', en(state.features.download)],
            ['Public sharing', en(state.features.publicSharing)],
            ['Office Online edit', en(state.features.officeOnline)],
            ['Guest access', 'Disabled'],
          ]} />
        </Section>

        <Section index="5" title="Users & Groups" onEdit={() => onEdit(4)}>
          <div className="table-wrap review-perm-wrap">
            <table className="data-table perm-table">
              <thead>
                <tr>
                  <th className="th perm-th--name"><span className="th__sort"><span className="t-xs-semibold th__label">User / Group</span><span className="icon-box icon-16 th__sort-icon"><IconSortDown /></span></span></th>
                  {PERMISSION_COLUMNS.map((c) => <th key={c.key} className="th perm-th"><span className="t-xs-semibold th__label">{c.label}</span></th>)}
                </tr>
              </thead>
              <tbody>
                {state.users.map((r) => (
                  <tr key={r.id}>
                    <td className="td">
                      <div className="cell cell--name perm-name">
                        <span className="icon-box icon-20 perm-name__icon">{r.type === 'group' ? <IconUsersGroup /> : <IconUserSingle />}</span>
                        <span className="td-name__text t-sm-data">{r.name}</span>
                      </div>
                    </td>
                    {PERMISSION_COLUMNS.map((c) => (
                      <td key={c.key} className="td perm-td">
                        <span className="icon-box icon-16">{r.permissions[c.key] ? <IconCheckDot /> : <IconXDot />}</span>
                      </td>
                    ))}
                  </tr>
                ))}
                {state.users.length === 0 && (
                  <tr><td className="td perm-empty td--empty" colSpan={PERMISSION_COLUMNS.length + 1}>No users or groups assigned.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {state.users.length > 0 && <div className="review-perm-pagination"><Pagination page={page} onPage={setPage} rows={10} onRowsClick={() => {}} /></div>}
        </Section>
      </div>
    </div>
  );
}
