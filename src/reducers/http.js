import * as types from '../actions/ActionTypes';

const initialState = {
  state: 'LOADED',
  error: undefined
};

export const loading = (state = initialState, action) => {
  switch(action.type) {
    case types.HTTP_LOADING:
      return Object.assign({}, state, { state: 'HTTP_LOADING', error: undefined });
    case types.HTTP_LOADED:
      return Object.assign({}, state, { state: 'HTTP_LOADED', error: undefined });
    case types.HTTP_ERROR:
      return Object.assign({}, state, { state: 'HTTP_ERROR', error: undefined });
    default:
      return state;
    }
};