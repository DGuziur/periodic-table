import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseLayoutComponent } from './shared/layout/base-layout/base-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseLayoutComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Periodic Table';
}
