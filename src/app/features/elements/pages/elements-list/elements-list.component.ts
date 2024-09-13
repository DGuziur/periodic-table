import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ELEMENT_DATA } from '../../config/default-elements.config';
import { FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-elements-list',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatTableModule, ReactiveFormsModule],
  templateUrl: './elements-list.component.html',
  styleUrl: './elements-list.component.scss',
})
export class ElementsListComponent implements OnInit {
  protected readonly filter = new FormControl<string>('');

  ngOnInit(): void {
    this.filter.valueChanges.pipe(debounceTime(2000)).subscribe((value) => {
      console.log(value);
    });
  }
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
