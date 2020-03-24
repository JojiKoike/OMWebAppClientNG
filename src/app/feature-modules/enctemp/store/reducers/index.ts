import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';


import * as fromNTTEncTemp from './ntt_enctemp.reducer';

/**
 * State and reducer
 */
export { State, reducer } from './ntt_enctemp.reducer';

/**
 * Selector
 */
export const getFeatureState = createFeatureSelector<fromNTTEncTemp.State>('NTTEncTemp');
export const getLoading = createSelector(getFeatureState, fromNTTEncTemp.getLoading);
export const getInput = createSelector(getFeatureState, fromNTTEncTemp.getInput);
export const getDefaultParams = createSelector(getFeatureState, fromNTTEncTemp.getDefaultParams);
export const getDefaultOptions = createSelector(getFeatureState, fromNTTEncTemp.getDefaultOptions);
export const getSelectOptions = createSelector(getFeatureState, fromNTTEncTemp.getSelectOptions);
export const getOutputHead = createSelector(getFeatureState, fromNTTEncTemp.getOutputHead);
export const getOutputBodyResults = createSelector(getFeatureState, fromNTTEncTemp.getOutputBodyResults);
export const getChartOptions = createSelector(getFeatureState, fromNTTEncTemp.getChartOptions);
