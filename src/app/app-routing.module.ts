import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UsersComponent } from './components/users/users.component';

import { AuthGuard } from './guards/auth.guard';
import { AddUserComponent } from './components/add-user/add-user.component';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'edit-user',
  //   component: EditUserComponent,
  //   canActivate: [AuthGuard],
  // },

  {
    path: 'users',

    children: [
      {
        path: 'edit-user',
        component: EditUserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-user',
        component: AddUserComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'users-dashboard', loadChildren: () => import('./users-dashboard/users-dashboard.module').then(m => m.UsersDashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
