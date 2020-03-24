import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromSimpleMSD from './simplemsd.reducer';

/**
 * State and reducer
 */
export { State, reducer } from './simplemsd.reducer';

/**
 * Selector
 */
export const getFeatureState = createFeatureSelector<fromSimpleMSD.State>('SimpleMSD');
export const getLoading = createSelector(getFeatureState, fromSimpleMSD.getLoading);
export const getInput = createSelector(getFeatureState, fromSimpleMSD.getInput);
export const getDefaultParams = createSelector(getFeatureState, fromSimpleMSD.getDefaultParams);
export const getDefaultOptions = createSelector(getFeatureState, fromSimpleMSD.getDefaultOptions);
export const getSelectOptions = createSelector(getFeatureState, fromSimpleMSD.getSelectOptions);
export const getOutputHead = createSelector(getFeatureState, fromSimpleMSD.getOutputHead);
export const getOutputBodyResults = createSelector(getFeatureState, fromSimpleMSD.getOutputBodyResults);
