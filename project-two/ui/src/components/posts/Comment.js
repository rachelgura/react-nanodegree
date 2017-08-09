import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import VotePanel from './VotePanel';

export default ({
  author,
  body,
  className,
  id,
  onDestroyClick,
  onVoteClick,
  parentId,
  timestamp,
  voteScore = 0
}) => {
  const formattedDate = () => {
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
  };

  return (
    <div className={`notification ${className}`}>
      <div className="media-content">
        <button
          className="delete is-pulled-right"
          onClick={() => onDestroyClick(id)}
        />
        <div className="content">
          Comment by: <strong>{author}</strong>
          <small>{` ${formattedDate()}`}</small>
          <br />
          <br />
          {body}
          <p>Score: {voteScore}</p>
          <Link className="button" to={`/posts/${parentId}/comments/${id}`}>
            Edit comment
          </Link>
          <hr />
          <VotePanel onVoteClick={onVoteClick} id={id} />
        </div>
      </div>
    </div>
  );
};
