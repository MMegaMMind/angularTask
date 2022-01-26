import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Components imports
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

//Module imports
import { AuthRoutingModule } from './auth-routing.module';

//Angular Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,

    ReactiveFormsModule,
    FormsModule,
    //Angular Material Imports
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  declarations: [RegisterComponent, LoginComponent],
})
export class AuthModule {}
