import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import {
  UserData,
  UserService,
} from 'src/app/services/user-service/user.service';

import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  filterValue!: string;
  dataSource!: UserData;
  pageEvent!: PageEvent;

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'imageUrl',
    'role',
    'action',
  ];

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initDataSource();
  }

  openDialog(data: any) {
    this.initDataSource();
    const ref = this.dialog.open(EditDialogComponent);
    ref.componentInstance.selectedUser = data;
  }

  initDataSource() {
    this.userService
      .findAll(1, 10)
      .pipe(map((userData: UserData) => (this.dataSource = userData)))
      .subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;
    this.userService
      .findAll(page, size)
      .pipe(map((userData: UserData) => (this.dataSource = userData)))
      .subscribe();
  }

  findByName(name: string) {
    this.userService
      .paginateByName(name, 0, 10)
      .pipe(map((userData: UserData) => (this.dataSource = userData)))
      .subscribe();
  }

  removeUser(data: any) {
    console.log(data);
    this.userService.deleteUser(data.id).subscribe((res) => {
      alert('User Deleted');
      this.initDataSource();
    });
  }
}
