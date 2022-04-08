import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import {GuestGuard} from "./guards/guest.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [GuestGuard],
  },

  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.module').then(
            (m) => m.UsersModule
          ),
      },

      {
        path: '**',
        redirectTo: 'users',
        pathMatch: 'full',
      },
    ],
  },
];
