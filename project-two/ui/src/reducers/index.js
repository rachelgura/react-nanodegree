import { combineReducers } from 'redux';
import nav from './nav';
import posts from './posts';
import { reducer as form } from 'redux-form';

export default combineReducers({
  form,
  nav,
  posts
});
