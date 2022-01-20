import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { UserModel } from './addUser.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;

  userModelObj: UserModel = new UserModel();

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(9)]],
      imageUrl: [null, [Validators.required]],
      role: [null],
    });
  }

  // onSubmit() {
  //   if (this.addUserForm.invalid) {
  //     return;
  //   }
  //   console.log('ADD USER FORM', this.addUserForm.value);
  //   this.userService
  //     .addUser(this.addUserForm.value)
  //     .pipe(
  //       map((res) => {
  //         alert('User Added Sucsessfully!!');
  //         this.router.navigate(['users']);
  //       })
  //     )
  //     .subscribe();
  // }

  postUser() {
    this.userModelObj.name = this.addUserForm.value.name;
    this.userModelObj.email = this.addUserForm.value.email;
    this.userModelObj.password = this.addUserForm.value.password;
    this.userModelObj.imageUrl = this.addUserForm.value.imageUrl;
    // this.userModelObj.role = this.addUserForm.value.role;

    if (this.addUserForm.invalid) {
      return;
    }

    this.userService.addUser(this.userModelObj).subscribe(
      (res) => {
        console.log('ADD USER RES', res);
        alert('User Added Successfully');
        this.router.navigate(['users']);
      },
      (err) => {
        console.log('POST USER ERROR', err);
        alert('Something went wrong');
      }
    );
  }
}
