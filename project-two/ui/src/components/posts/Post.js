import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import VotePanel from './VotePanel';

export default ({
  author,
  body,
  currentCategory,
  id,
  link = true, // when set to false, the Post-component will be a div.
  onDestroyClick,
  onVoteClick,
  timestamp,
  title,
  voteScore = 0
}) => {
  const formattedDate = () => {
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
  };

  const Tag = (link && Link) || 'h3';
  const category = currentCategory === 'all' ? 'posts' : currentCategory;

  return (
    <div className="box">
      <div className="media-content">
        <button
          className="delete is-pulled-right"
          onClick={() => onDestroyClick(id)}
        />
        <div className="content">
          <Tag className="title is-3" to={`/${category}/${id}`}>
            {title}
          </Tag>
          <p>
            <strong>
              {author}
            </strong>

            <small>
              {` ${formattedDate()}`}
            </small>

            <br />
            {body}
          </p>
          <p>Score: {voteScore}</p>
          <Link className="button" to={`/posts/${id}/new`}>
            Add comment
          </Link>{' '}
          <Link className="button" to={`/posts/${id}/edit`}>
            Edit post
          </Link>
          <hr />
          <VotePanel onVoteClick={onVoteClick} id={id} />
        </div>
      </div>
    </div>
  );
};
