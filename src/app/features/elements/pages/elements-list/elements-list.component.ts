import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { PeriodicElement } from '../../types/periodic-element.type';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ElementFormDialog } from '../../components/element-form-dialog/element-form-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  addElement,
  deleteElement,
  editElement,
  loadDefaultElements,
} from '../../store/elements.actions';
import { selectAllElements } from '../../store/elements.selector';
import { DISPLAYED_COLUMNS } from '../../config/displayed-columns.config';
@Component({
  selector: 'app-elements-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  templateUrl: './elements-list.component.html',
  styleUrl: './elements-list.component.scss',
})
export class ElementsListComponent {
  private readonly store = inject(Store);
  private readonly dialogService = inject(MatDialog);

  protected readonly displayedColumns: string[] = DISPLAYED_COLUMNS;
  protected readonly filter = new FormControl<string>('');
  protected dataSource = new MatTableDataSource<PeriodicElement>([]);

  private readonly elements$: Observable<PeriodicElement[]> = this.store
    .select(selectAllElements)
    .pipe(
      distinctUntilChanged(),
      tap((elementsData) => {
        this.dataSource.data = elementsData;
      })
    );

  private readonly filterChanges$ = this.filter.valueChanges.pipe(
    debounceTime(2000),
    distinctUntilChanged(),
    tap((value) => {
      this.dataSource.filter = value?.trim().toLowerCase() ?? '';
    })
  );

  protected filteredDataSource$ = combineLatest([
    this.elements$,
    this.filterChanges$,
  ]).pipe(startWith([this.elements$, '']));

  protected loadData = this.store.dispatch(loadDefaultElements());

  private handleModal(
    element: PeriodicElement | null
  ): Observable<PeriodicElement | null> {
    const dialogRef = this.dialogService.open(ElementFormDialog, {
      data: { element: element },
    });
    return dialogRef.afterClosed();
  }

  addElement(): void {
    this.handleModal(null).subscribe((result) => {
      if (result) {
        this.store.dispatch(addElement({ element: result }));
      }
    });
  }

  editElement(index: number): void {
    this.handleModal(this.dataSource.data[index]).subscribe((result) => {
      if (result) {
        this.store.dispatch(editElement({ index, element: result }));
      }
    });
  }

  deleteElement(index: number): void {
    this.store.dispatch(deleteElement({ index }));
  }

  restartListToDefault(): void {
    this.store.dispatch(loadDefaultElements());
  }

  trackByIndex(index: number, element: PeriodicElement): number {
    return index;
  }
}
