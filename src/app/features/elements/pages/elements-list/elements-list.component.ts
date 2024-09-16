import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ELEMENT_DATA } from '../../config/default-elements.config';
import { FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { PeriodicElement } from '../../types/periodic-element.type';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditElementComponent } from '../../components/edit-element/edit-element.component';

@Component({
  selector: 'app-elements-list',
  standalone: true,
  imports: [
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
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogService = inject(MatDialog);
  protected readonly filter = new FormControl<string>('');
  protected dataSource = new MatTableDataSource<PeriodicElement>([
    ...ELEMENT_DATA,
  ]);
  protected displayedColumns = [
    'position',
    'name',
    'weight',
    'symbol',
    'action',
  ];

  ngOnInit(): void {
    this.filter.valueChanges
      .pipe(debounceTime(2000), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.dataSource.filter = value?.trim().toLowerCase() ?? '';
      });
  }

  addElement(): void {
    const dialogRef = this.dialogService.open(EditElementComponent, {
      data: {
        element: null,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource.connect().next(this.dataSource.data);
      }
    });
  }

  deleteElement(index: number): void {
    this.dataSource.data.splice(index, 1);
    this.dataSource.connect().next(this.dataSource.data);
  }

  openDialog(index: number): void {
    const dialogRef = this.dialogService.open(EditElementComponent, {
      data: {
        element: this.dataSource.data[index],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data[index] = result;
        this.dataSource.connect().next(this.dataSource.data);
      }
    });
  }

  resetData(): void {
    this.dataSource.data = [...ELEMENT_DATA];
    this.dataSource.connect().next(this.dataSource.data);
  }
}
