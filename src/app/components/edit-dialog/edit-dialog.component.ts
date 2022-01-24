import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

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
    this.userService
      .editUser(this.selectedUser.id, this.editUserForm.value)
      .subscribe(
        (res) => {
          alert('User Updated Successfully');
          console.log('Edited User', res);
          this.dialog.closeAll();
        },
        (error) => {
          console.log('An error has happened: ', error.message);
          console.log('Error accured', error);
        }
      );
  }
}
