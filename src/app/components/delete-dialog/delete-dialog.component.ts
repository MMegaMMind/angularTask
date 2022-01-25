import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { UserModel } from '../users/user-model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  selectedUser!: UserModel;
  formError!: string;
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {}

  showToasterError() {
    this.notifyService.showError('Something is wrong', this.formError);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess('Success!', 'User is deleted!');
  }

  removeUser() {
    this.userService.deleteUser(this.selectedUser.id).subscribe(
      (res) => {
        this.showToasterSuccess();
        this.dialog.closeAll();
      },
      (err) => {
        this.formError = err.error;
        this.showToasterError();
      }
    );
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
