import * as types from '../actions/ActionTypes';

export const wines = (state = [], action) => {
  switch(action.type) {
    case types.SET_WINES:
    console.log("winessss", action.wines)
      return [ ...action.wines ]
    default:
      return state;
  }
};