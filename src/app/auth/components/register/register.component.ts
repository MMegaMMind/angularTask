import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['../../styles/auth.styles.css'],
})
export class RegisterComponent {
  isSubmited: boolean = false;
  registerForm: FormGroup = this.formBuilder.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      imageUrl: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(9)]],
      passwordConfirm: ['', [Validators.required]],
    },
    {
      validators: CustomValidators.passwordMatch,
    }
  );

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService
  ) {}

  getInvalidInput(field: string, validation: string = 'required') {
    const control = this.registerForm.get(field);
    return control?.hasError(validation) && control.touched;
  }

  onSubmit() {
    this.isSubmited = true;

    if (this.registerForm.invalid) {
      this.toast.warning('Warning', 'Check the form!');
      return;
    }

    this.authService
      .register(this.registerForm.value)
      .pipe(
        take(1),
        finalize(() => (this.isSubmited = false))
      )
      .subscribe({
        next: () => {
          this.toast.success(
            'Register successful!!',
            'You are now registered!!!'
          );
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.toast.error('Something is wrong', err.error);
        },
      });
  }
}
