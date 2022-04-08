import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize, take } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { UserModel } from '../users/user-model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  isSubmited: boolean = false;
  @Input() selectedUser!: UserModel;
  formError!: string;
  constructor(
    private userService: UserService,
    public dialog: MatDialog,

    private toast: ToastrService
  ) {}

  removeUser() {
    this.isSubmited = true;
    this.userService
      .deleteUser(this.selectedUser.id)
      .pipe(
        take(1),
        finalize(() => (this.isSubmited = false))
      )
      .subscribe({
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
