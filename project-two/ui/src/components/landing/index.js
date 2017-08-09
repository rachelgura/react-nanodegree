import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="container">
      <div className="hero">
        <Link to="/posts" className="button is-primary is-large">
          To the posts!
        </Link>
      </div>
    </div>
  );
};
