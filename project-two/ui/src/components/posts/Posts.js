import React from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import SideBar from './SideBar';

export default ({
  posts,
  onCategoryClick = () => {},
  category,
  sortBy,
  onSortByClick,
  onVoteClick,
  onDestroyClick
}) => {
  return (
    <div className="container">
      <Link to="/new" className="button is-info">
        Write a post
      </Link>

      <hr />

      <h1 className="title">Posts</h1>

      <div className="columns">
        <SideBar
          onCategoryClick={onCategoryClick}
          category={category}
          sortBy={sortBy}
          onSortByClick={onSortByClick}
        />

        <div className="column is-10">
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                {...post}
                currentCategory={category}
                onVoteClick={onVoteClick}
                onDestroyClick={onDestroyClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
