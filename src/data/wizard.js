// Data for the "Add new share" wizard, mirroring the Figma flow.

// Step 1 — storage type accordion. storage keys map to STORAGE_LABELS/logos.
export const STORAGE_CATEGORIES = [
  {
    id: 'on-prem',
    label: 'On premises',
    providers: [
      { key: 'smb', name: 'SMB', logo: 'smb',
        desc: 'Use an on-prem Windows or NAS file share (\\server\\share). Best for traditional file servers integrated with Active Directory.' },
    ],
  },
  {
    id: 'm365',
    label: 'Microsoft 365',
    providers: [
      { key: 'onedrive', name: 'OneDrive', logo: 'onedrive',
        desc: 'Connect to a user’s individual OneDrive for Business storage. Best for personal or user-specific file access through MyWorkDrive.' },
      { key: 'sharepoint', name: 'SharePoint', logo: 'sharepoint',
        desc: 'Connect to a SharePoint Document Library. Ideal for accessing team sites and shared cloud documents through MyWorkDrive.' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud storage',
    providers: [
      { key: 'azureBlob', name: 'Azure Blob', logo: 'azureBlob',
        desc: 'Store files in Azure Blob Storage. Supports hierarchical namespaces and cloud-optimized workloads.' },
      { key: 'azureFiles', name: 'Azure Files', logo: 'azureFiles',
        desc: 'Use Azure File Shares secured with Active Directory authentication. Ideal for hybrid or cloud-hosted file storage.' },
      { key: 's3', name: 'S3', logo: 's3',
        desc: 'Use an S3-compatible storage provider. Requires separate configuration of access credentials and bucket permissions outside of MyWorkDrive.' },
    ],
  },
];

export function findProvider(key) {
  for (const c of STORAGE_CATEGORIES) {
    const p = c.providers.find((x) => x.key === key);
    if (p) return p;
  }
  return null;
}

// Step 3 — drive letters
export const DRIVE_LETTERS = ['M:', 'N:', 'O:', 'P:', 'S:', 'T:', 'U:', 'V:', 'W:', 'X:', 'Y:', 'Z:'];

// Step 4 — feature toggles (in display order, 2-col grid)
export const FEATURES = [
  { key: 'download', title: 'Download', desc: 'Allow users to download files from this share.' },
  { key: 'officeOnline', title: 'Office online editing', desc: 'Enable opening and editing documents in Office Online.' },
  { key: 'publicSharing', title: 'Public sharing', desc: 'Make this share available via a public link for external access.' },
];

// Step 5 — permission matrix columns. `guestAccess` is disabled globally (Settings).
export const PERMISSION_COLUMNS = [
  { key: 'web', label: 'Web client' },
  { key: 'mapped', label: 'Mapped Drive client' },
  { key: 'mobile', label: 'Mobile client' },
  { key: 'download', label: 'Download' },
  { key: 'publicSharing', label: 'Public sharing' },
  { key: 'officeOnline', label: 'Office Online edit' },
  { key: 'guest', label: 'Guest access', disabled: true },
];

export function defaultPermissions() {
  return { web: true, mapped: false, mobile: true, download: false, publicSharing: false, officeOnline: false, guest: false };
}

// Directory shown in the "Add Users & Groups" modal.
export const DIRECTORY = [
  { id: 'g-backup', name: 'MWF\\Backup Operators', type: 'group' },
  { id: 'g-cert', name: 'MWF\\Cert Publishers', type: 'group' },
  { id: 'g-rdp', name: 'MWF\\Remote Desktop Users', type: 'group' },
  { id: 'g-eventlog', name: 'MWF\\Event Log Readers', type: 'group' },
  { id: 'g-endpoint', name: 'MWF\\Endpoint Servers', type: 'group' },
  { id: 'g-db', name: 'MWF\\Database Servers', type: 'group' },
  { id: 'g-app', name: 'MWF\\Application Servers', type: 'group' },
  { id: 'g-filestore', name: 'MWF\\File Storage Servers', type: 'group' },
  { id: 'g-web', name: 'MWF\\Web Servers', type: 'group' },
  { id: 'u-liza', name: 'MWF\\liza', type: 'user' },
  { id: 'u-oles', name: 'MWF\\oles', type: 'user' },
  { id: 'u-scott', name: 'MWF\\scottadmin', type: 'user' },
  { id: 'u-jason', name: 'MWF\\jasonadmin', type: 'user' },
  { id: 'u-liam', name: 'MWF\\liam', type: 'user' },
  { id: 'u-nora', name: 'MWF\\nora', type: 'user' },
];
