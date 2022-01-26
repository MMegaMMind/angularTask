import { Component } from '@angular/core';

import { UserService } from 'src/app/services/user-service/user.service';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { finalize, take } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

class CustomValidators {
  static passwordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if (
      password === passwordConfirm &&
      password !== null &&
      passwordConfirm !== null
    ) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }
}

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css'],
})
export class AddUserDialogComponent {
  isSubmited: boolean = false;
  addUserForm: FormGroup = this.formBuilder.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]],
      passwordConfirm: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
    },
    {
      validators: CustomValidators.passwordMatch,
    }
  );

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toast: ToastrService
  ) {}

  getInvalidInput(field: string, validation: string = 'required') {
    const control = this.addUserForm.get(field);
    return control?.hasError(validation) && control.touched;
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.addUserForm.invalid) {
      return;
    }
    this.userService
      .addUser(this.addUserForm.value)
      .pipe(
        take(1),
        finalize(() => (this.isSubmited = false))
      )
      .subscribe({
        next: () => {
          this.toast.success('Success!', 'User is created!');
          this.dialog.closeAll();
        },
        error: (err) => {
          this.toast.error('Something is wrong', err.error);
        },
      });
  }
}
