import { Injectable } from '@angular/core';
import { PeriodicElement } from '../types/periodic-element.type';
import { ELEMENT_DATA } from '../config/default-elements.config';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElementsService {
  getElements(): Observable<PeriodicElement[]> {
    return of<PeriodicElement[]>([...ELEMENT_DATA]);
  }
}
