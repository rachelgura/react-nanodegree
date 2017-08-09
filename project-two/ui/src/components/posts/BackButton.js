import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <Link className="button is-info" to="/posts">
        To posts!
      </Link>

      <hr />
    </div>
  );
};
