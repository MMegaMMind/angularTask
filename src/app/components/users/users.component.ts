import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, take } from 'rxjs/operators';
import {
  UserData,
  UserService,
} from 'src/app/services/user-service/user.service';

import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

interface Payload {
  page: number;
  limit: number;
}

const initState: Payload = { page: 1, limit: 10 };

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  filterValue: string = '';
  dataSource!: UserData;
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
    this.fetchData();
  }

  openDialog(data: any) {
    // this.initDataSource();
    const ref = this.dialog.open(EditDialogComponent);
    ref.componentInstance.selectedUser = data;

    ref.afterClosed().subscribe((result) => {
      this.fetchData();
    });
  }

  openDialog2(data: any) {
    const ref = this.dialog.open(DeleteDialogComponent);
    ref.componentInstance.selectedUser = data;

    ref.afterClosed().subscribe((result) => {
      this.fetchData();
    });
  }

  openDialog3() {
    const diaRef = this.dialog.open(AddUserDialogComponent);
    diaRef.afterClosed().subscribe((res) => {
      this.fetchData();
    });
  }

  fetchData(payload: Payload = initState) {
    const { page, limit } = payload;
    this.userService
      .findAll(page, limit)
      .pipe(take(1))
      .subscribe((res) => (this.dataSource = res));
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex + 1;
    let limit = event.pageSize;
    this.fetchData({ page, limit });
  }

  findByName(name: string) {
    this.userService
      .paginateByName(name, 0, 10)
      .pipe(map((userData: UserData) => (this.dataSource = userData)))
      .subscribe();
  }
}
