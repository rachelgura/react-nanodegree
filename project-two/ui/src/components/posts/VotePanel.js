import React from 'react';

export default ({ onVoteClick, id }) => {
  return (
    <div className="field is-grouped">
      <p className="control">
        <button
          className="button is-info"
          onClick={() => onVoteClick(id, 'upVote')}
        >
          <i className="fa fa-thumbs-o-up" aria-hidden="true" />
        </button>
      </p>
      <p className="control">
        <button
          className="button is-danger"
          onClick={() => onVoteClick(id, 'downVote')}
        >
          <i className="fa fa-thumbs-o-down" aria-hidden="true" />
        </button>
      </p>
    </div>
  );
};
