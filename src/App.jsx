import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './layout/AppShell.jsx';
import SharesPage from './pages/SharesPage.jsx';
import AddSharePage from './pages/AddSharePage.jsx';
import Placeholder from './pages/Placeholder.jsx';
import { SharesProvider } from './store/SharesContext.jsx';

// Only the Shares screen is designed so far. Other areas are real routes that
// render a neutral placeholder until their designs are provided.
const PLACEHOLDERS = [
  { path: 'settings', title: 'Settings', subtitle: 'Configure server behavior, security, networking, and system options.' },
  { path: 'integrations', title: 'Integrations', subtitle: 'Configure external services and identity/storage integrations.' },
  { path: 'clustering', title: 'Clustering', subtitle: 'Manage server clustering and related configuration.' },
  { path: 'devices', title: 'Devices', subtitle: 'View and manage connected client devices.' },
  { path: 'public-sharing', title: 'Public sharing', subtitle: 'Configure and manage publicly shared files and links.' },
  { path: 'user-activity', title: 'User activity', subtitle: 'Monitor user sessions and activity, including active connections.' },
  { path: 'health', title: 'Health', subtitle: 'Monitor server health and operational status.' },
];

export default function App() {
  return (
    <SharesProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/shares" replace />} />
          <Route path="/shares" element={<SharesPage />} />
          <Route path="/shares/new" element={<AddSharePage />} />
          {PLACEHOLDERS.map((p) => (
            <Route key={p.path} path={`/${p.path}`} element={<Placeholder title={p.title} subtitle={p.subtitle} />} />
          ))}
          <Route path="*" element={<Navigate to="/shares" replace />} />
        </Route>
      </Routes>
    </SharesProvider>
  );
}
