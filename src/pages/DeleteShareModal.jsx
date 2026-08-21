import React, { useEffect, useRef } from 'react';
import { IconDismiss } from '../ui/icons.jsx';
import { IconTrash } from '../ui/wizard-icons.jsx';

// Confirmation dialog for deleting one or more shares (Figma: Shares delete flow).
export default function DeleteShareModal({ open, count, name, onCancel, onConfirm }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    cancelRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  const multiple = count > 1;
  const title = multiple ? `Delete ${count} shares` : `Delete “${name}” share`;
  const desc = multiple
    ? 'Are you sure you want to delete these shares? This action cannot be undone.'
    : 'Are you sure you want to delete this share? This action cannot be undone.';

  return (
    <div className="modal-overlay" onMouseDown={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-desc"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <div className="modal__content">
            <span className="featured-icon featured-icon--error">
              <span className="icon-box icon-24"><IconTrash /></span>
            </span>
            <div className="modal__text">
              <p id="delete-title" className="t-lg-semibold modal__title">{title}</p>
              <p id="delete-desc" className="t-sm-regular modal__desc">{desc}</p>
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
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
