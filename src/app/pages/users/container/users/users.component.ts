import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, take } from 'rxjs/operators';
import { UserData, UserService } from 'src/app/services/user.service';

import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  formDialog(action: string, data?: any) {
    if (action === 'edit') {
      const ref = this.dialog.open(EditDialogComponent);
      ref.componentInstance.selectedUser = data;
      ref.afterClosed().subscribe((res) => {
        this.fetchData();
      });
    } else if (action === 'delete') {
      const ref = this.dialog.open(DeleteDialogComponent);
      ref.componentInstance.selectedUser = data;
      ref.afterClosed().subscribe((res) => {
        this.fetchData();
      });
    } else if (action === 'create') {
      const ref = this.dialog.open(AddUserDialogComponent);
      ref.afterClosed().subscribe((res) => {
        this.fetchData();
      });
    }
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
      .pipe(take(1))
      .subscribe({
        next: (userData: UserData) => (this.dataSource = userData),
        error: (err) => {
          this.toast.error('Something is wrong', err.error);
        },
      });
  }
}
