import React from 'react';

export default ({ sortBy, onSortByClick }) => {
  return (
    <div>
      <p className="menu-label">Sort on:</p>

      <ul className="menu-list">
        <li>
          <a
            className={sortBy === 'voteScore' ? 'is-active' : null}
            onClick={() => onSortByClick('voteScore')}
          >
            Votescore
          </a>
        </li>
        <li>
          <a
            className={sortBy === 'timestamp' ? 'is-active' : null}
            onClick={() => onSortByClick('timestamp')}
          >
            Date/time
          </a>
        </li>
      </ul>
    </div>
  );
};
