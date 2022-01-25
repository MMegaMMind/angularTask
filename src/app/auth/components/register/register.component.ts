import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent implements OnInit {
  formError!: string;
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(9)]],
      imageUrl: ['', [Validators.required]],
    });
  }
  get nameInvalid() {
    const control = this.registerForm.get('name');
    return control?.hasError('required') && control.touched;
  }

  get emailFormat() {
    const control = this.registerForm.get('email');
    return control?.hasError('email') && control.touched;
  }

  get passwordInvalid() {
    const control = this.registerForm.get('password');
    return control?.hasError('required') && control.touched;
  }

  get imageInvalid() {
    const control = this.registerForm.get('imageUrl');
    return control?.hasError('required') && control.touched;
  }

  showToasterError() {
    this.notifyService.showError('Something is wrong', this.formError);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(
      'Register successful!!',
      'You are now registered!!!'
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log('Register Form', this.registerForm.value);
    this.authService
      .register(this.registerForm.value)
      .pipe(
        map((res) => {
          this.showToasterSuccess();
          this.router.navigate(['login']);
        })
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          this.formError = err.error;
          this.showToasterError();
          console.log('Error', err.error);
        }
      );
  }
}
