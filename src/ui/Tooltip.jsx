// Tooltip pill — mirrors the Figma Tooltip (bg-tertiary, radius-md, xs-semibold,
// left-pointing arrow, shadow-lg). Shown on hover/focus of its trigger.
import React, { useState, useId } from 'react';

export default function Tooltip({ label, placement = 'right', children }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span
      className="tt-wrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={() => setOpen(false)}
    >
      {React.cloneElement(children, { 'aria-describedby': open ? id : undefined })}
      {open && (
        <span role="tooltip" id={id} className={`tt tt--${placement} t-xs-semibold`}>
          {label}
        </span>
      )}
    </span>
  );
}
