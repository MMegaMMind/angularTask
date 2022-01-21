import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'auth',

    children: [
      // { path: 'login', loadChildren: './login/login.module#LoginModule' },
      {
        path: 'login',
        loadChildren: () =>
          import('./components/login/login.module').then((m) => m.LoginModule),
      },
      // { path: 'register', loadChildren: './register/register.module#RegisterModule' },
      {
        path: 'register',
        loadChildren: () =>
          import('./components/register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
