import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { map } from 'rxjs';
import {
  UserData,
  UserService,
} from 'src/app/services/user-service/user.service';
import { UserModel } from '../users/user-model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
  selectedUser!: UserModel;
  editUserForm!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      imageUrl: [''],
    });

    this.setForm();
  }

  private setForm() {
    this.editUserForm.patchValue({ ...this.selectedUser });
    console.log('User That is selected', this.selectedUser);
  }

  onSubmit() {
    console.log('this.editUserForm', this.editUserForm);

    this.userService
      .editUser(this.selectedUser.id, this.selectedUser)
      .subscribe(
        (res) => {
          alert('User Updated Successfully');
          this.dialog.closeAll();
        },
        (error) => {
          console.log('An error has happened: ', error.message);
          console.log('Error accured', error);
        }
      );
  }
}
