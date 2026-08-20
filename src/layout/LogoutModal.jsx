import React, { useEffect, useRef } from 'react';
import { IconSignOutLarge, IconDismiss } from '../ui/icons.jsx';

export default function LogoutModal({ open, onCancel, onConfirm }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    cancelRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onMouseDown={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        aria-describedby="logout-desc"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <div className="modal__content">
            <span className="featured-icon featured-icon--error">
              <span className="icon-box icon-24"><IconSignOutLarge /></span>
            </span>
            <div className="modal__text">
              <p id="logout-title" className="t-lg-semibold modal__title">Log out of MyWorkDrive?</p>
              <p id="logout-desc" className="t-sm-regular modal__desc">
                Are you sure you want to log out? You’ll need to sign in again to access the admin panel.
              </p>
            </div>
          </div>
          <button type="button" className="modal__close" onClick={onCancel} aria-label="Close">
            <span className="icon-box icon-20"><IconDismiss /></span>
          </button>
        </div>

        <div className="modal__actions">
          <button ref={cancelRef} type="button" className="btn btn--secondary btn--block" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn--destructive btn--block" onClick={onConfirm}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
