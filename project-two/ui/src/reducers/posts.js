import {
  CHANGE_CATEGORY,
  CHANGE_SORT_BY,
  CREATE_COMMENT,
  CREATE_POST,
  DESTROY_COMMENT,
  DESTROY_POST,
  EDIT_COMMENT,
  EDIT_POST,
  EMPTY_COMMENTS,
  FETCH_COMMENTS,
  FETCH_POSTS,
  SELECT_COMMENT,
  SELECT_POST,
  VOTE_COMMENT,
  VOTE_POST
} from '../actions/types';

const INITIAL_STATE = {
  category: 'all',
  comments: [],
  creatingOrUpdating: false,
  destroying: false,
  loading: false,
  posts: [],
  selectedCommentId: null,
  selectedPostId: null,
  sortBy: 'voteScore'
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EDIT_COMMENT.REQUEST:
      return {
        ...state,
        creatingOrUpdating: true
      };

    case EDIT_COMMENT.SUCCESS:
      return {
        ...state,
        comments: [
          ...state.comments.filter(c => c.id !== action.comment.id),
          action.comment
        ],
        creatingOrUpdating: false
      };

    case SELECT_COMMENT:
      return {
        ...state,
        selectedCommentId: action.commentId
      };

    case DESTROY_COMMENT.REQUEST:
    case DESTROY_POST.REQUEST:
      return {
        ...state,
        destroying: true
      };

    case DESTROY_COMMENT.SUCCESS:
      return {
        ...state,
        destroying: false,
        comments: [
          ...state.comments.filter(comment => comment.id !== action.commentId)
        ]
      };

    case DESTROY_POST.SUCCESS:
      return {
        ...state,
        posts: [...state.posts.filter(post => post.id !== action.postId)],
        destroying: false
      };

    case DESTROY_POST.FAILURE:
      return {
        ...state,
        destroying: false
      };

    case VOTE_COMMENT.SUCCESS:
      return {
        ...state,
        comments: [
          ...state.comments.filter(comment => comment.id !== action.comment.id),
          action.comment
        ]
      };

    case VOTE_POST.SUCCESS:
      return {
        ...state,
        posts: [
          ...state.posts.filter(post => post.id !== action.post.id),
          action.post
        ]
      };
    case CHANGE_SORT_BY:
      return {
        ...state,
        sortBy: action.category
      };

    case FETCH_COMMENTS.REQUEST:
    case FETCH_POSTS.REQUEST:
      return {
        ...state,
        loading: true
      };

    case FETCH_POSTS.SUCCESS:
      return {
        ...state,
        posts: action.posts,
        loading: false
      };

    case FETCH_COMMENTS.SUCCESS:
      return {
        ...state,
        comments: action.comments,
        loading: false
      };

    case CREATE_COMMENT.REQUEST:
    case CREATE_POST.REQUEST:
    case EDIT_POST.REQUEST:
      return {
        ...state,
        creatingOrUpdating: true
      };

    case CREATE_COMMENT.SUCCESS:
      return {
        ...state,
        creatingOrUpdating: false,
        comments: [
          ...state.comments.filter(comment => comment.id !== action.comment.id),
          action.comment
        ]
      };

    case CREATE_POST.SUCCESS:
      return {
        ...state,
        creatingOrUpdating: false,
        posts: [
          ...state.posts.filter(post => post.id !== action.post.id),
          action.post
        ]
      };

    case CREATE_POST.FAILURE:
    case EDIT_POST.FAILURE:
    case EDIT_POST.SUCCESS:
      return {
        ...state,
        creatingOrUpdating: false
      };

    case CHANGE_CATEGORY:
      return {
        ...state,
        category: action.category
      };

    case SELECT_POST:
      return {
        ...state,
        selectedPostId: action.postId
      };

    case EMPTY_COMMENTS:
      return {
        ...state,
        comments: []
      };

    default:
      return state;
  }
}
