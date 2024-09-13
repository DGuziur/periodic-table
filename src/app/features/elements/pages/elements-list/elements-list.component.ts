import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ELEMENT_DATA } from '../../config/default-elements.config';

@Component({
  selector: 'app-elements-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './elements-list.component.html',
  styleUrl: './elements-list.component.scss',
})
export class ElementsListComponent {
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
