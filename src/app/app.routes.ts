import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './features/elements/pages/elements-list/elements-list.component'
      ).then((m) => m.ElementsListComponent),
  },
];
