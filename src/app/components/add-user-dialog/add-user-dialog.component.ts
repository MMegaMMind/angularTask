import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user-service/user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { map } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css'],
})
export class AddUserDialogComponent implements OnInit {
  formError!: string;
  addUserForm!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(9)]],
      imageUrl: [null, [Validators.required]],
    });
  }

  get nameInvalid() {
    const control = this.addUserForm.get('name');
    return control?.hasError('required') && control.touched;
  }

  get emailFormat() {
    const control = this.addUserForm.get('email');
    return control?.hasError('email') && control.touched;
  }

  get passwordInvalid() {
    const control = this.addUserForm.get('password');
    return control?.hasError('required') && control.touched;
  }

  get imageInvalid() {
    const control = this.addUserForm.get('imageUrl');
    return control?.hasError('required') && control.touched;
  }

  showToasterError() {
    this.notifyService.showError('Something is wrong', this.formError);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess('Success!', 'User is created!');
  }

  onSubmit() {
    if (this.addUserForm.invalid) {
      return;
    }
    this.userService
      .addUser(this.addUserForm.value)
      .pipe(
        map((res) => {
          this.showToasterSuccess();
          this.dialog.closeAll();
        })
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          this.formError = err.error;
          this.showToasterError();
        }
      );
  }
}
