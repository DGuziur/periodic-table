import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-element-form-dialog',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './element-form-dialog.component.html',
  styleUrl: './element-form-dialog.component.scss',
})
export class ElementFormDialog implements OnInit {
  private readonly dialogRef = inject(MatDialogRef);
  private readonly elementData = inject(MAT_DIALOG_DATA);
  protected elementForm = new FormGroup({
    position: new FormControl<number>(0, Validators.required),
    name: new FormControl<string>('', Validators.required),
    weight: new FormControl<number>(0, Validators.required),
    symbol: new FormControl<string>('', Validators.required),
  });

  ngOnInit(): void {
    this.elementForm.patchValue(this.elementData.element);
  }

  save(): void {
    this.dialogRef.close(this.elementForm.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
