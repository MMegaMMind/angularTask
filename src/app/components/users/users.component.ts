import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/services/authentication/auth.service';
import {
  UserData,
  UserService,
} from 'src/app/services/user-service/user.service';

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
    'edit',
    'delete',
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initDataSource();
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
