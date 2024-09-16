import { createReducer, on } from '@ngrx/store';
import { PeriodicElement } from '../types/periodic-element.type';
import {
  addElement,
  deleteElement,
  editElement,
  loadElementsSuccess,
  loadElementsFailure,
  loadElements,
} from './elements.actions';

export interface ElementsState {
  elements: PeriodicElement[];
  error: string | null;
  status: 'pending' | 'loading' | 'success' | 'error';
}

export const initialState: ElementsState = {
  elements: [],
  error: null,
  status: 'pending',
};

export const elementsReducer = createReducer<ElementsState>(
  initialState,
  on(loadElements, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadElementsSuccess, (state, { elements }) => ({
    ...state,
    elements,
    status: 'success',
  })),
  on(loadElementsFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  })),
  on(addElement, (state, { element }) => ({
    ...state,
    elements: [...state.elements, element],
    status: 'success',
  })),
  on(deleteElement, (state, { index }) => ({
    ...state,
    elements: state.elements.filter((_, i) => i !== index),
    status: 'success',
  })),
  on(editElement, (state, { index, element }) => ({
    ...state,
    elements: state.elements.map((e, i) => (i === index ? element : e)),
    status: 'success',
  }))
);
