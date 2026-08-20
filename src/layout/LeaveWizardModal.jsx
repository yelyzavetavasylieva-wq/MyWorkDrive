import React, { useEffect } from 'react';
import { IconWarning, IconDismiss } from '../ui/icons.jsx';

export default function LeaveWizardModal({ open, targetLabel, onStay, onLeave }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onStay(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onStay]);

  if (!open) return null;
  return (
    <div className="modal-overlay" onMouseDown={onStay}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="leave-title" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div className="modal__content">
            <span className="featured-icon featured-icon--warning"><span className="icon-box icon-24"><IconWarning /></span></span>
            <div className="modal__text">
              <p id="leave-title" className="t-lg-semibold modal__title">Leave wizard?</p>
              <p className="t-sm-regular modal__desc">
                You’re about to exit the Add Share wizard{targetLabel ? ` and go to ${targetLabel}` : ''}. Any progress you’ve made here will be lost.
              </p>
            </div>
          </div>
          <button type="button" className="modal__close" onClick={onStay} aria-label="Close">
            <span className="icon-box icon-20"><IconDismiss /></span>
          </button>
        </div>
        <div className="modal__actions">
          <button type="button" className="btn btn--secondary btn--block" onClick={onStay}>Back to wizard</button>
          <button type="button" className="btn btn--primary btn--block" onClick={onLeave}>Discard and leave</button>
        </div>
      </div>
    </div>
  );
}
