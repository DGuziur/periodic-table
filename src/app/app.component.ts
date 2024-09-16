import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseLayoutComponent } from './shared/layout/base-layout/base-layout.component';
import { StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Periodic Table';
}
