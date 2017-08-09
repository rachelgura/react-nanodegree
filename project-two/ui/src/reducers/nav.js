import { TOGGLE_HAMBURGER } from '../actions/types';

export default function(state = false, action) {
  if (action.type === TOGGLE_HAMBURGER) {
    return !state;
  }

  return state;
}
