import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{UsersComponent} from "./container/users/users.component";
import {AddUserDialogComponent} from "./components/add-user-dialog/add-user-dialog.component";
import {EditDialogComponent} from "./components/edit-dialog/edit-dialog.component";
import {DeleteDialogComponent} from "./components/delete-dialog/delete-dialog.component";

import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UsersComponent },
    ],
  },
];


@NgModule({
  declarations: [UsersComponent,AddUserDialogComponent,EditDialogComponent,DeleteDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ]
})
export class UsersModule { }
