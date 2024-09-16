import { createSelector } from '@ngrx/store';
import { ElementsState } from './elements.reducer';
import { AppState } from '../shared/app.state';

export const selectElements = (state: AppState) => state.elements;
export const selectAllElements = createSelector(
  selectElements,
  (state: ElementsState) => state.elements
);
