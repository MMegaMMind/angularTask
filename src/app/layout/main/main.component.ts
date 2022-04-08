import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.userService.logout();
    this.router.navigate(['/auth/login']);
  }

  isAuth() {
    if (!this.authService.isAuthenticated()) {
      return false;
    } else {
      return true;
    }
  }

}
