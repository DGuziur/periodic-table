import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { PeriodicElement } from '../../types/periodic-element.type';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ElementFormDialog } from '../../components/element-form-dialog/element-form-dialog.component';
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
    MatTableModule,
    ReactiveFormsModule,
  ],
  templateUrl: './elements-list.component.html',
  styleUrl: './elements-list.component.scss',
})
export class ElementsListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogService = inject(MatDialog);
  protected displayedColumns: string[] = DISPLAYED_COLUMNS;
  protected readonly filter = new FormControl<string>('');
  protected dataSource = new MatTableDataSource<PeriodicElement>([]);
  protected elements$: Observable<PeriodicElement[]> = this.store
    .select(selectAllElements)
    .pipe(
      tap((elementsData: PeriodicElement[]) => {
        this.dataSource.data = elementsData;
      })
    );
  protected loadData = this.store.dispatch(loadDefaultElements());

  ngOnInit(): void {
    this.filter.valueChanges
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        this.dataSource.filter = value?.trim().toLowerCase() ?? '';
      });
  }

  addElement(): void {
    const dialogRef = this.dialogService.open(ElementFormDialog, {
      data: {
        element: null,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(addElement({ element: result }));
      }
    });
  }

  deleteElement(index: number): void {
    this.store.dispatch(deleteElement({ index }));
  }

  editElement(index: number): void {
    const dialogRef = this.dialogService.open(ElementFormDialog, {
      data: {
        element: this.dataSource.data[index],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(editElement({ index, element: result }));
      }
    });
  }

  resetData(): void {
    this.store.dispatch(loadDefaultElements());
  }
}
