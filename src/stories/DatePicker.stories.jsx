import React from 'react';
import { IconChevronRight } from '../ui/icons.jsx';

// Figma: UI kit → Date picker (_Calendar cell, _Date picker menu). A range
// calendar popover with month nav, two range inputs, a day grid and footer
// actions. Implemented as `.calendar` in components.css.
const meta = {
  title: 'Design System/Date picker',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;

const DOW = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'];

// Static January 2024 grid mirroring the Figma mock (range Jan 6–12).
const WEEKS = [
  [{ d: 26, muted: true }, { d: 27, muted: true }, { d: 28, muted: true }, { d: 29, muted: true }, { d: 30, muted: true }, { d: 31, muted: true }, { d: 1 }],
  [{ d: 2 }, { d: 3 }, { d: 4 }, { d: 5 }, { d: 6, rangeStart: true, today: true }, { d: 7, inRange: true }, { d: 8, inRange: true }],
  [{ d: 9, inRange: true }, { d: 10, inRange: true }, { d: 11, inRange: true }, { d: 12, rangeEnd: true, today: true }, { d: 13 }, { d: 14 }, { d: 15 }],
  [{ d: 16 }, { d: 17 }, { d: 18 }, { d: 19 }, { d: 20 }, { d: 21 }, { d: 22 }],
  [{ d: 23 }, { d: 24, today: true }, { d: 25 }, { d: 26 }, { d: 27 }, { d: 28 }, { d: 29 }],
  [{ d: 30 }, { d: 31 }, { d: 1, muted: true }, { d: 2, muted: true }, { d: 3, muted: true }, { d: 4, muted: true }, { d: 5, muted: true }],
];

function dayClass(c) {
  return [
    'calendar__day',
    c.muted && 'calendar__day--muted',
    c.inRange && 'calendar__day--in-range',
    c.rangeStart && 'calendar__day--range-start',
    c.rangeEnd && 'calendar__day--range-end',
    c.today && 'calendar__day--today',
  ].filter(Boolean).join(' ');
}

export const RangePicker = {
  render: () => (
    <div className="calendar">
      <div className="calendar__body">
        <div className="calendar__nav">
          <button type="button" className="calendar__nav-btn calendar__nav-btn--prev" aria-label="Previous month">
            <span className="icon-box icon-16"><IconChevronRight /></span>
          </button>
          <span className="calendar__month">January 2024</span>
          <button type="button" className="calendar__nav-btn" aria-label="Next month">
            <span className="icon-box icon-16"><IconChevronRight /></span>
          </button>
        </div>

        <div className="calendar__range">
          <input className="calendar__range-input" defaultValue="Jan 6, 2024" aria-label="Start date" />
          <span className="calendar__range-dash">–</span>
          <input className="calendar__range-input" defaultValue="Jan 12, 2024" aria-label="End date" />
        </div>

        <div className="calendar__grid" role="grid">
          {DOW.map((d) => <div key={d} className="calendar__dow">{d}</div>)}
          {WEEKS.flat().map((c, i) => (
            <button key={i} type="button" className={dayClass(c)}>
              <span className="calendar__day-num">{c.d}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="calendar__footer">
        <button type="button" className="btn btn--secondary">Cancel</button>
        <button type="button" className="btn btn--primary">Save</button>
      </div>
    </div>
  ),
};
