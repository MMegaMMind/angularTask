import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user-service/user.service';
import { UserModel } from '../users/user-model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  @Input() selectedUser!: UserModel;
  formError!: string;
  constructor(
    private userService: UserService,
    public dialog: MatDialog,

    private toast: ToastrService
  ) {}

  removeUser() {
    this.userService.deleteUser(this.selectedUser.id).subscribe({
      next: () => {
        this.toast.success('Success!', 'User is deleted!');
        this.dialog.closeAll();
      },
      error: (err) => {
        this.toast.error('Something is wrong', err.error);
      },
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
