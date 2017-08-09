import {
  CREATE_COMMENT,
  DESTROY_COMMENT,
  EDIT_COMMENT,
  EMPTY_COMMENTS,
  FETCH_COMMENTS,
  SELECT_COMMENT,
  VOTE_COMMENT
} from './types';

export function selectComment(commentId) {
  return {
    type: SELECT_COMMENT,
    commentId
  };
}

export function fetchComments(postId) {
  return {
    type: FETCH_COMMENTS.REQUEST,
    postId
  };
}

export function emptyComments() {
  return {
    type: EMPTY_COMMENTS
  };
}

export function voteCommentClick(commentId, voteType) {
  return {
    type: VOTE_COMMENT.REQUEST,
    commentId,
    voteType
  };
}

export function destroyCommentClick(commentId) {
  return {
    type: DESTROY_COMMENT.REQUEST,
    commentId
  };
}

export function createComment(values) {
  return {
    type: CREATE_COMMENT.REQUEST,
    values
  };
}

export function editComment(commentId, values) {
  return {
    type: EDIT_COMMENT.REQUEST,
    commentId,
    values
  };
}
