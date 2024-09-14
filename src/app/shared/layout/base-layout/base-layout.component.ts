import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSlideToggleModule,
  ],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent {
  protected readonly themeService = inject(ThemeService);

  toggleTheme(event: MouseEvent): void {
    event.stopPropagation();
    this.themeService.toggleTheme();
  }
}
