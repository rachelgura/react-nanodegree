import {
  CHANGE_CATEGORY,
  CHANGE_SORT_BY,
  CREATE_POST,
  DESTROY_POST,
  EDIT_POST,
  FETCH_POSTS,
  SELECT_POST,
  VOTE_POST
} from './types';

export function changeCategory(category) {
  return {
    type: CHANGE_CATEGORY,
    category
  };
}

export function selectPost(postId) {
  return {
    type: SELECT_POST,
    postId
  };
}

export function changeSortBy(category) {
  return {
    type: CHANGE_SORT_BY,
    category
  };
}

export function fetchPosts() {
  return {
    type: FETCH_POSTS.REQUEST
  };
}

export function votePostClick(postId, voteType) {
  return {
    type: VOTE_POST.REQUEST,
    postId,
    voteType
  };
}

export function destroyPostClick(postId) {
  return {
    type: DESTROY_POST.REQUEST,
    postId
  };
}

export function editPost(postId, values) {
  return {
    type: EDIT_POST.REQUEST,
    postId,
    values
  };
}

export function createPost(values) {
  return {
    type: CREATE_POST.REQUEST,
    values
  };
}
