import React from 'react';
import { Link } from 'react-router-dom';
import { LINKS } from '../../options';
import Hamburger from './Hamburger';

export default ({ onToggleHamburger, active }) => {
  const renderLinks = () => {
    return LINKS.map(link => {
      const lowercaseLink = link.toLowerCase();
      return (
        <Link
          className="navbar-item"
          to={`/${lowercaseLink}`}
          key={link}
          onClick={onToggleHamburger}
        >
          {link}
        </Link>
      );
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/posts">
          <span className="icon">
            <i className="fa fa-book" aria-hidden="true" />
          </span>
          Readable
        </Link>

        <Hamburger onToggleHamburger={onToggleHamburger} />
      </div>

      <div
        className={`navbar-menu ${active ? 'is-active' : null}`}
        id="readable-nav"
      >
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <Link to="/posts" className="navbar-link is-active">
              Posts
            </Link>
            <div className="navbar-dropdown">
              {renderLinks()}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
