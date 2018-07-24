import * as types from './ActionTypes';
import * as WinesService from '../services/Wines';
import { Wine } from '../components';

export const setHttpLoading = () => ({
  type: types.HTTP_LOADING
});

export const setHttpLoaded = () => ({
  type: types.HTTP_LOADED
});

export const setHttpError = (error) => ({
  type: types.HTTP_ERROR,
  error
});

export const setRegions = (regions) => ({
  type: types.SET_REGIONS,
  regions
});
/*
 * and then, we will need another action that will be responsible
 * to fetch regions from the REST API and set the regions array
 * in the redux store. The action will use redux-thunk to dispatch
 * multiples actions like emptying the current value of regions,
 * setting that an HTTP request is currently loading some data, etc ...
 */
export const fetchRegions = () => dispatch => {
  dispatch(setRegions([]));
  dispatch(setHttpLoading());
    return WinesService.fetchRegions().then(data => {
      dispatch(setHttpLoaded())
      dispatch(setRegions(data))
    }
    , err => {
      dispatch(setHttpError(`error while fetching regions : ${err.message}`));
    });
}

export const setWines = (wines) => ({
  type: types.SET_WINES,
  wines
})

export const fetchWinesFrom = (region) => dispatch => {
  return WinesService.fetchWinesFrom(region).then(data => {
    console.log("action data", data)
    dispatch(setWines(data))
  });
}