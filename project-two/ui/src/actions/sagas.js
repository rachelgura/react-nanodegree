import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  CREATE_COMMENT,
  CREATE_POST,
  DESTROY_COMMENT,
  DESTROY_POST,
  EDIT_COMMENT,
  EDIT_POST,
  FETCH_COMMENTS,
  FETCH_POSTS,
  VOTE_COMMENT,
  VOTE_POST
} from './types';

axios.defaults.baseURL = 'http://localhost:5001';
axios.defaults.headers.common.Authorization = 'not-so-secret';

export function* editComment({ commentId, values }) {
  try {
    const response = yield call(() =>
      axios.put(`/comments/${commentId}`, values)
    );
    yield put({ type: EDIT_COMMENT.SUCCESS, comment: response.data });
  } catch (error) {
    yield put({ type: EDIT_COMMENT.FAILURE, error: error.message });
  }
}

export function* editPost({ postId, values }) {
  try {
    yield call(() => axios.put(`/posts/${postId}`, values));
    yield put({ type: EDIT_POST.SUCCESS });
  } catch (error) {
    yield put({ type: EDIT_POST.FAILURE, error: error.message });
  }
}

export function* destroyPost({ postId }) {
  try {
    yield call(() => axios.delete(`/posts/${postId}`));
    yield put({ type: DESTROY_POST.SUCCESS, postId });
  } catch (error) {
    yield put({ type: DESTROY_POST.FAILURE, error: error.message });
  }
}

export function* destroyComment({ commentId }) {
  try {
    yield call(() => axios.delete(`/comments/${commentId}`));
    yield put({ type: DESTROY_COMMENT.SUCCESS, commentId });
  } catch (error) {
    yield put({ type: DESTROY_COMMENT.FAILURE, error: error.message });
  }
}

export function* createComment({ values }) {
  try {
    const response = yield call(() => axios.post('/comments', values));
    yield put({ type: CREATE_COMMENT.SUCCESS, comment: response.data });
  } catch (error) {
    yield put({ type: CREATE_COMMENT.FAILURE, error: error.message });
  }
}

export function* votePost({ voteType, postId }) {
  try {
    const response = yield call(() =>
      axios.post(`/posts/${postId}`, { option: voteType })
    );
    yield put({ type: VOTE_POST.SUCCESS, post: response.data });
  } catch (error) {
    yield put({ type: VOTE_POST.FAILURE, error: error.message });
  }
}

export function* voteComment({ commentId, voteType }) {
  try {
    const response = yield call(() =>
      axios.post(`/comments/${commentId}`, {
        option: voteType
      })
    );

    yield put({ type: VOTE_COMMENT.SUCCESS, comment: response.data });
  } catch (error) {
    yield put({ type: VOTE_COMMENT.FAILURE, error: error.message });
  }
}

export function* fetchPosts() {
  try {
    const response = yield call(() => axios.get('/posts'));
    yield put({ type: FETCH_POSTS.SUCCESS, posts: response.data });
  } catch (error) {
    yield put({ type: FETCH_POSTS.FAILURE, error: error.message });
  }
}

export function* createPost({ values }) {
  try {
    const response = yield call(() => axios.post('/posts', values));
    yield put({ type: CREATE_POST.SUCCESS, post: response.data });
  } catch (error) {
    yield put({ type: CREATE_POST.FAILURE, error: error.message });
  }
}

export function* fetchComments({ postId }) {
  try {
    const response = yield call(() => axios.get(`/posts/${postId}/comments`));
    yield put({ type: FETCH_COMMENTS.SUCCESS, comments: response.data });
  } catch (error) {
    yield put({ type: FETCH_COMMENTS.FAILURE, error: error.message });
  }
}

export function* sagas() {
  yield takeEvery(CREATE_COMMENT.REQUEST, createComment);
  yield takeEvery(CREATE_POST.REQUEST, createPost);
  yield takeEvery(DESTROY_COMMENT.REQUEST, destroyComment);
  yield takeEvery(DESTROY_POST.REQUEST, destroyPost);
  yield takeEvery(EDIT_COMMENT.REQUEST, editComment);
  yield takeEvery(EDIT_POST.REQUEST, editPost);
  yield takeEvery(FETCH_COMMENTS.REQUEST, fetchComments);
  yield takeEvery(FETCH_POSTS.REQUEST, fetchPosts);
  yield takeEvery(VOTE_COMMENT.REQUEST, voteComment);
  yield takeEvery(VOTE_POST.REQUEST, votePost);
}
