import * as types from '../actions/ActionTypes';

export const regions = (state = [], action) => {
  switch(action.type) {
    case types.SET_REGIONS:
      return [ ...action.regions ];
    default:
      return state;
  }
};