import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from './services/user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-task';

  entries = [
    { name: 'Login', link: 'login' },
    { name: 'Register', link: 'register' },
  ];

  constructor(private router: Router, private userService: UserService) {}

  navigateTo(value: any) {
    this.router.navigate(['../', value]);
  }

  logOut() {
    this.userService.logout();
    this.router.navigate(['login']);
  }
}
