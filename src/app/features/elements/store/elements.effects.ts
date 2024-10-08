import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadDefaultElements,
  loadElementsFailure,
  loadElementsSuccess,
} from './elements.actions';
import { inject, Injectable } from '@angular/core';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { ElementsService } from '../services/elements.service';

@Injectable()
export class ElementsEffects {
  private actions$ = inject(Actions);
  private elementsService = inject(ElementsService);

  loadElements$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadDefaultElements),
      switchMap(() =>
        from(this.elementsService.getElements()).pipe(
          map((elements) => loadElementsSuccess({ elements })),
          catchError((error) => of(loadElementsFailure({ error })))
        )
      )
    );
  });
}
