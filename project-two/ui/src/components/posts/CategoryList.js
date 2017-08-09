import React from 'react';
import { CATEGORIES } from '../../options';

export default ({ onCategoryClick, category }) => {
  const renderLinks = () => {
    return CATEGORIES.map(link => {
      const lowercaseLink = link.toLowerCase();
      return (
        <li key={link}>
          <a
            className={`${lowercaseLink === category ? 'is-active' : null}`}
            onClick={() => onCategoryClick(lowercaseLink)}
          >
            {link}
          </a>
        </li>
      );
    });
  };

  return (
    <div>
      <p className="menu-label">Show me:</p>

      <ul className="menu-list">
        {renderLinks()}
      </ul>
    </div>
  );
};
