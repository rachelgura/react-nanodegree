import React from 'react';
import Comment from './Comment';
import Post from './Post';
import BackButton from './BackButton';
import SortList from './SortList';

export default props => {
  const renderContent = () => {
    const {
      comments,
      loading,
      onDestroyClick,
      onDestroyCommentClick,
      onSortByClick,
      onVoteCommentClick,
      onVotePostClick,
      selectedPost,
      sortBy
    } = props;

    if (loading) {
      return <div>Loading ...</div>;
    }

    if (!selectedPost) {
      return <div>We couldn't find any post!</div>;
    }

    return (
      <div className="container">
        <h1 className="title">Post</h1>

        <div className="columns">
          <aside className="menu column is-2">
            <SortList onSortByClick={onSortByClick} sortBy={sortBy} />
          </aside>

          <div className="column is-10">
            <Post
              {...selectedPost}
              link={false}
              onVoteClick={onVotePostClick}
              onDestroyClick={onDestroyClick}
            />

            {comments.map((comment, index) => {
              return (
                <Comment
                  {...comment}
                  onVoteClick={onVoteCommentClick}
                  onDestroyClick={onDestroyCommentClick}
                  key={comment.id}
                  className={index % 2 === 0 ? 'is-primary' : 'is-info'}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <BackButton />

      {renderContent()}
    </div>
  );
};
