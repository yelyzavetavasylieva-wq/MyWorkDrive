import React, { useRef, useState } from 'react';

// Segmented-control Tabs — Figma "Tabs" / "TabButtonBase". Styling lives in the
// `.seg-tabs` classes in components.css (distinct from the underline `.tabs`).
// Controlled via `value`, or uncontrolled via `defaultValue`. Sizes: sm / md.
export default function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  size = 'md',
  'aria-label': ariaLabel,
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.id);
  const active = isControlled ? value : internal;
  const refs = useRef([]);

  const select = (id) => {
    if (!isControlled) setInternal(id);
    onChange?.(id);
  };

  // Arrow-key roving focus between enabled tabs (Left/Right + Home/End).
  const onKeyDown = (e, index) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const enabled = tabs.map((t, i) => ({ ...t, i })).filter((t) => !t.disabled);
    if (!enabled.length) return;
    const pos = enabled.findIndex((t) => t.i === index);
    let next;
    if (e.key === 'Home') next = enabled[0];
    else if (e.key === 'End') next = enabled[enabled.length - 1];
    else if (e.key === 'ArrowRight') next = enabled[(pos + 1) % enabled.length];
    else next = enabled[(pos - 1 + enabled.length) % enabled.length];
    refs.current[next.i]?.focus();
    select(next.id);
  };

  return (
    <div className={`seg-tabs seg-tabs--${size}`} role="tablist" aria-label={ariaLabel} aria-orientation="horizontal">
      {tabs.map((tab, index) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            ref={(el) => { refs.current[index] = el; }}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            disabled={tab.disabled}
            className={'seg-tabs__tab' + (selected ? ' is-selected' : '')}
            onClick={() => select(tab.id)}
            onKeyDown={(e) => onKeyDown(e, index)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
