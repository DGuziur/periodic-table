import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
  private readonly changeDetector = inject(ChangeDetectorRef);
  protected readonly filter = new FormControl<string>('');
  dialogService = inject(MatDialog);
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  displayedColumns = ['position', 'name', 'weight', 'symbol', 'action'];

  ngOnInit(): void {
    this.filter.valueChanges.pipe(debounceTime(2000)).subscribe((value) => {
      this.dataSource.filter = value?.trim().toLowerCase() ?? '';
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
}
