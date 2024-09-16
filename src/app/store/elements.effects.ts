import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addElement,
  deleteElement,
  editElement,
  loadElements,
  loadElementsFailure,
  loadElementsSuccess,
} from './elements.actions';
import { inject, Injectable } from '@angular/core';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { ElementsService } from '../features/elements/services/elements.service';

@Injectable()
export class ElementsEffects {
  private actions$ = inject(Actions);
  private elementsService = inject(ElementsService);

  loadElements$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadElements),
      switchMap(() =>
        from(this.elementsService.getElements()).pipe(
          map((elements) => loadElementsSuccess({ elements })),
          catchError((error) => of(loadElementsFailure({ error })))
        )
      )
    );
  });
}
