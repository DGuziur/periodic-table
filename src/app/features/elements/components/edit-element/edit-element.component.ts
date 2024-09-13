import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-element',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './edit-element.component.html',
  styleUrl: './edit-element.component.scss',
})
export class EditElementComponent {
  elementForm = new FormGroup({
    name: new FormControl(''),
    weight: new FormControl(''),
    symbol: new FormControl(''),
  });
}
