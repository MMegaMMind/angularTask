import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user-service/user.service';
import { UserModel } from '../users/user-model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  selectedUser!: UserModel;
  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  removeUser() {
    console.log(this.selectedUser);
    this.userService.deleteUser(this.selectedUser.id).subscribe((res) => {
      alert('User Deleted');
      this.dialog.closeAll();
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
