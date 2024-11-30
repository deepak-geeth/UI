import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/components/user-details/user-details.page').then(m => m.UserDetailsPage),
  },
];
