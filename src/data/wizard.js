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

// Step 2 — provider-specific storage settings.
// Each provider defines the fields required to access and configure that store.
// Field types: 'text' | 'password' | 'select'. `required` fields gate the Next button.
const S3_REGIONS = [
  'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'eu-west-1', 'eu-central-1', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1',
];

export const STORAGE_SETTINGS = {
  smb: [
    { key: 'path', label: 'Path', type: 'text', required: true, placeholder: '\\\\mwf\\network-share',
      hint: 'UNC path to the on-prem Windows or NAS file share.' },
  ],
  onedrive: [
    { key: 'account', label: 'OneDrive account (UPN)', type: 'text', required: true, placeholder: 'user@contoso.com',
      hint: 'User principal name whose OneDrive for Business will be connected.' },
    { key: 'rootFolder', label: 'Root folder', type: 'text', required: false, placeholder: '/Documents',
      hint: 'Optional subfolder to expose as the share root. Leave blank for the full OneDrive.' },
  ],
  sharepoint: [
    { key: 'siteUrl', label: 'Site URL', type: 'text', required: true, placeholder: 'https://contoso.sharepoint.com/sites/Team',
      hint: 'URL of the SharePoint site to connect.' },
    { key: 'library', label: 'Document library', type: 'text', required: true, placeholder: 'Shared Documents',
      hint: 'Name of the document library within the site.' },
    { key: 'rootFolder', label: 'Root folder', type: 'text', required: false, placeholder: '/General',
      hint: 'Optional subfolder within the library.' },
  ],
  azureBlob: [
    { key: 'accountName', label: 'Storage account name', type: 'text', required: true, placeholder: 'mystorageaccount' },
    { key: 'container', label: 'Container', type: 'text', required: true, placeholder: 'documents' },
    { key: 'accessKey', label: 'Access key', type: 'password', required: true, placeholder: 'Enter the storage account access key',
      hint: 'Primary or secondary key from the storage account.' },
    { key: 'prefix', label: 'Path prefix', type: 'text', required: false, placeholder: '/team' },
  ],
  azureFiles: [
    { key: 'accountName', label: 'Storage account name', type: 'text', required: true, placeholder: 'mystorageaccount' },
    { key: 'fileShare', label: 'File share', type: 'text', required: true, placeholder: 'team-share' },
    { key: 'accessKey', label: 'Access key', type: 'password', required: true, placeholder: 'Enter the storage account access key',
      hint: 'Primary or secondary key from the storage account.' },
    { key: 'path', label: 'Path', type: 'text', required: false, placeholder: '/subfolder' },
  ],
  s3: [
    { key: 'bucket', label: 'Bucket name', type: 'text', required: true, placeholder: 'my-bucket' },
    { key: 'region', label: 'Region', type: 'select', required: true, options: S3_REGIONS },
    { key: 'endpoint', label: 'Endpoint', type: 'text', required: false, placeholder: 'https://s3.amazonaws.com',
      hint: 'Custom endpoint for S3-compatible providers. Leave blank for AWS S3.' },
    { key: 'accessKeyId', label: 'Access key ID', type: 'text', required: true, placeholder: 'AKIAIOSFODNN7EXAMPLE' },
    { key: 'secretAccessKey', label: 'Secret access key', type: 'password', required: true, placeholder: 'Enter the secret access key' },
    { key: 'prefix', label: 'Path prefix', type: 'text', required: false, placeholder: '/team' },
  ],
};

export function settingsFieldsFor(providerKey) {
  return STORAGE_SETTINGS[providerKey] || [];
}

// Returns a map of { fieldKey: errorMessage } for missing required fields.
export function validateSettings(providerKey, settings) {
  const errors = {};
  for (const f of settingsFieldsFor(providerKey)) {
    if (f.required && !String((settings && settings[f.key]) || '').trim()) {
      errors[f.key] = `${f.label} is required.`;
    }
  }
  return errors;
}

export function settingsComplete(providerKey, settings) {
  return providerKey != null && Object.keys(validateSettings(providerKey, settings)).length === 0;
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
