import React from 'react';

export default ({ onToggleHamburger }) => {
  return (
    <div
      className="navbar-burger burger"
      data-target="readable-nav"
      onClick={onToggleHamburger}
    >
      <span />
      <span />
      <span />
    </div>
  );
};
