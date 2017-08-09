import asyncAction from './asyncAction';

export const FETCH_POSTS = asyncAction('FETCH_POSTS');
export const CREATE_POST = asyncAction('CREATE_POST');
export const FETCH_COMMENTS = asyncAction('FETCH_COMMENTS');
export const VOTE_POST = asyncAction('VOTE_POST');
export const VOTE_COMMENT = asyncAction('VOTE_COMMENT');
export const CREATE_COMMENT = asyncAction('CREATE_COMMENT');
export const DESTROY_POST = asyncAction('DESTROY_POST');
export const DESTROY_COMMENT = asyncAction('DESTROY_COMMENT');
export const EDIT_POST = asyncAction('EDIT_POST');
export const EDIT_COMMENT = asyncAction('EDIT_COMMENT');

export const TOGGLE_HAMBURGER = 'TOGGLE_HAMBURGER';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const SELECT_POST = 'SELECT_POST';
export const EMPTY_COMMENTS = 'EMPTY_COMMENTS';
export const CHANGE_SORT_BY = 'CHANGE_SORT_BY';
export const SELECT_COMMENT = 'SELECT_COMMENT';
