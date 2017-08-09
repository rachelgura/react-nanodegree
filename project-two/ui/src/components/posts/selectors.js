import { createSelector } from 'reselect';

// Sorting helpers

function sortByDateDesc(a, b) {
  return b.timestamp - a.timestamp;
}

function sortByScoreDesc(a, b) {
  return b.voteScore - a.voteScore;
}

function pureSort(array, sortBy = sortByScoreDesc) {
  return array.map(p => p).sort(sortBy);
}

// Selectors

function postsSelector({ posts }) {
  return posts;
}

function categorySelector({ category }) {
  return category;
}

function sortBySelector({ sortBy }) {
  return sortBy;
}

function selectedPostSelector({ selectedPostId }) {
  return selectedPostId;
}

function selectedCommentSelector({ selectedCommentId }) {
  return selectedCommentId;
}

function commentsSelector({ comments }) {
  return comments;
}

// Selectors with computed properties

export const filteredPostsSelector = createSelector(
  postsSelector,
  categorySelector,
  sortBySelector,
  (posts = [], category, sortBy) => {
    let sortedPosts = posts.filter(post => !post.deleted);

    if (category !== 'all') {
      sortedPosts = sortedPosts.filter(post => post.category === category);
    }

    let sortByMethod =
      sortBy === 'voteScore' ? sortByScoreDesc : sortByDateDesc;
    sortedPosts = sortedPosts.sort(sortByMethod);

    return sortedPosts;
  }
);

export const singlePostSelector = createSelector(
  postsSelector,
  selectedPostSelector,
  (posts, id) => {
    return posts.find(post => post.id === id) || null;
  }
);

export const singleCommentSelector = createSelector(
  commentsSelector,
  selectedCommentSelector,
  (comments, id) => {
    return comments.find(comment => comment.id === id) || null;
  }
);

export const filteredSinglePostSelector = createSelector(
  filteredPostsSelector,
  selectedPostSelector,
  (posts, id) => {
    return posts.find(post => post.id === id) || null;
  }
);

export const detailViewCommentsSelector = createSelector(
  commentsSelector,
  sortBySelector,
  (comments, sortBy) => {
    const sortByMethod =
      (sortBy === 'timestamp' && sortByDateDesc) || sortByScoreDesc;
    return pureSort(comments, sortByMethod);
  }
);
