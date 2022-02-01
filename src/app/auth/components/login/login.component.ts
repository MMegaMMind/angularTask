import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, take } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles/auth.styles.css'],
})
export class LoginComponent {
  isSubmited: boolean = false;
  formError!: string;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(9),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  getInvalidInput(field: string, validation: string = 'required') {
    const control = this.loginForm.get(field);
    return control?.hasError(validation) && control.touched;
  }

  onSubmit() {
    this.isSubmited = true;

    if (this.loginForm.invalid) {
      this.toast.warning('Warning', 'Check the form!');
      return;
    }

    this.authService
      .login(this.loginForm.value)
      .pipe(
        take(1),
        finalize(() => (this.isSubmited = false))
      )
      .subscribe({
        next: (res) => {
          this.toast.success('You are now logged in!!!', 'Login successful!!');
          this.router.navigate(['users']);
        },
        error: (err) => {
          this.toast.error(err.error, 'Something is wrong');
        },
      });
  }
}
