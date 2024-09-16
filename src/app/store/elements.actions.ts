import { createAction, props } from '@ngrx/store';
import { PeriodicElement } from '../features/elements/types/periodic-element.type';

export const loadElements = createAction('[Elements] Load elements');

export const loadElementsSuccess = createAction(
  '[Elements] Load elements success',
  props<{ elements: PeriodicElement[] }>()
);

export const loadElementsFailure = createAction(
  '[Elements] Load elements failure',
  props<{ error: string }>()
);

export const addElement = createAction(
  '[Elements] Add element',
  props<{ element: PeriodicElement }>()
);

export const deleteElement = createAction(
  '[Elements] Delete element',
  props<{ index: number }>()
);

export const editElement = createAction(
  '[Elements] Edit element',
  props<{ index: number; element: PeriodicElement }>()
);
