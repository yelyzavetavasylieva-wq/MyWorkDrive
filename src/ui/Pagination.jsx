import React from 'react';
import { IconArrowLeft, IconArrowRight, IconChevronDown } from './icons.jsx';

// Matches the Figma pagination: a "Show N rows" dropdown on the left and a
// bordered button group [‹ | 1 2 3 … 8 9 10 | ›] on the right.
const PAGES = [1, 2, 3, '…', 8, 9, 10];

export default function Pagination({ page, onPage, rows, onRowsClick }) {
  return (
    <div className="pagination">
      <button type="button" className="rows-select t-md-regular" onClick={onRowsClick}>
        <span>{`Show ${rows} rows`}</span>
        <span className="icon-box icon-20 rows-select__chevron"><IconChevronDown /></span>
      </button>

      <div className="page-group">
        <button
          type="button"
          className="page-btn page-btn--arrow"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPage(Math.max(1, page - 1))}
        >
          <span className="icon-box icon-20"><IconArrowLeft /></span>
        </button>

        {PAGES.map((p, i) =>
          p === '…' ? (
            <span key={`e${i}`} className="page-btn page-btn--ellipsis t-sm-regular">…</span>
          ) : (
            <button
              key={p}
              type="button"
              aria-current={page === p ? 'page' : undefined}
              className={'page-btn' + (page === p ? ' page-btn--active t-sm-semibold' : ' t-sm-regular')}
              onClick={() => onPage(p)}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          className="page-btn page-btn--arrow"
          aria-label="Next page"
          disabled={page >= 10}
          onClick={() => onPage(Math.min(10, page + 1))}
        >
          <span className="icon-box icon-20"><IconArrowRight /></span>
        </button>
      </div>
    </div>
  );
}
