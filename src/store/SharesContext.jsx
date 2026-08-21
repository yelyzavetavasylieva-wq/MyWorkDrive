import React, { createContext, useContext, useState, useCallback } from 'react';
import { SHARES } from '../data/shares.js';

const SharesContext = createContext(null);

export function SharesProvider({ children }) {
  const [shares, setShares] = useState(SHARES);

  const addShare = useCallback((share) => {
    setShares((prev) => [{ ...share, id: Date.now() }, ...prev]);
  }, []);

  const removeShares = useCallback((ids) => {
    const set = new Set(ids);
    setShares((prev) => prev.filter((s) => !set.has(s.id)));
  }, []);

  return (
    <SharesContext.Provider value={{ shares, addShare, removeShares }}>
      {children}
    </SharesContext.Provider>
  );
}

export function useShares() {
  const ctx = useContext(SharesContext);
  if (!ctx) throw new Error('useShares must be used within SharesProvider');
  return ctx;
}
