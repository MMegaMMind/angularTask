import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notifications/notification.service';

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
  formError!: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notifyService: NotificationService,
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

  showToasterError() {
    this.notifyService.showError('Something is wrong', this.formError);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess('Success!', 'User is edited!');
  }

  private setForm() {
    this.editUserForm.patchValue({ ...this.selectedUser });
  }

  onSubmit() {
    this.userService
      .editUser(this.selectedUser.id, this.editUserForm.value)
      .subscribe(
        (res) => {
          this.showToasterSuccess();
          this.dialog.closeAll();
        },
        (err) => {
          this.formError = err.error;
          this.showToasterError();
        }
      );
  }
}
