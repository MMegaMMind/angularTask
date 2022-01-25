import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from 'src/app/services/authentication/auth.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formError!: string;
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(9),
      ]),
    });
  }

  get passwordInvalid() {
    const control = this.loginForm.get('password');
    return control?.hasError('required') && control.touched;
  }

  get emailFormat() {
    const control = this.loginForm.get('email');
    return control?.hasError('email') && control.touched;
  }
  showToasterError() {
    this.notifyService.showError('Something is wrong', this.formError);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(
      'Login successful!!',
      'You are now logged in!!!'
    );
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.loginForm.value)
      .pipe(
        map((res) => {
          this.showToasterSuccess();
          this.router.navigate(['users']);
        })
      )
      .subscribe(
        (res) => {},
        (err) => {
          this.formError = err.error;
          this.showToasterError();
        }
      );
  }
}
