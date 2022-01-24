import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user-service/user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css'],
})
export class AddUserDialogComponent implements OnInit {
  addUserForm!: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(9)]],
      imageUrl: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.addUserForm.invalid) {
      return;
    }
    this.userService
      .addUser(this.addUserForm.value)
      .pipe(
        map((res) => {
          alert('User Added Successfully!!');
          this.dialog.closeAll();
          window.location.reload();
        })
      )
      .subscribe();
  }
}
