import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize, take } from 'rxjs';

import { UserService } from 'src/app/services/user-service/user.service';

import { UserModel } from '../users/user-model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
  isSubmited: boolean = false;
  @Input() selectedUser!: UserModel;

  editUserForm: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    imageUrl: ['', [Validators.required]],
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

  getInvalidInput(field: string, validation: string = 'required') {
    const control = this.editUserForm.get(field);
    return control?.hasError(validation) && control.touched;
  }

  onSubmit() {
    this.isSubmited = true;
    this.userService
      .editUser(this.selectedUser.id, this.editUserForm.value)
      .pipe(
        take(1),
        finalize(() => (this.isSubmited = false))
      )
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
