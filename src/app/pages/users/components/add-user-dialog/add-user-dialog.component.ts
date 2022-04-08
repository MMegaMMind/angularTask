import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize, take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { PasswordsMatchValidator } from 'src/app/shared/password.validator';

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
      validators: PasswordsMatchValidator.passwordMatch,
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
