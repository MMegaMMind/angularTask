import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

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
  @Input() selectedUser!: UserModel;

  editUserForm: FormGroup = this.formBuilder.group({
    id: [''],
    name: [''],
    email: [''],
    imageUrl: [''],
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notifyService: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.editUserForm.patchValue({ ...this.selectedUser });
  }

  onSubmit() {
    this.userService
      .editUser(this.selectedUser.id, this.editUserForm.value)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.notifyService.success('Success!', 'User is edited!');
          this.dialog.closeAll();
        },
        error: (err) => {
          this.notifyService.error('Something is wrong', err.error);
        },
      });
  }
}
