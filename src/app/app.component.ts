import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from './services/authentication/auth.service';
import { UserService } from './services/user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-task';
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.isAuth();
  }

  logOut() {
    this.userService.logout();
    this.router.navigate(['/auth/login']);
  }

  isAuth() {
    if (this.authService.isAuthenticated() === false) {
      return false;
    } else {
      return true;
    }
  }
}
