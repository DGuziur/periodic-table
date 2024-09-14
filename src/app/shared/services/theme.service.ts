import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  toggleTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
}
