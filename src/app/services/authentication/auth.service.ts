import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ThisReceiver } from '@angular/compiler';

const AUTH_API = 'https://localhost:5001/api/Auth/';

export interface LoginForm {
  email: string;
  password: string;
}

export const JWT_TOKEN = 'crud-token';

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  imageUrl?: string;
  role?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHeleper: JwtHelperService) {}

  login(logininForm: LoginForm) {
    return this.http
      .post<any>(AUTH_API + 'login', {
        email: logininForm.email,
        password: logininForm.password,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          sessionStorage.setItem(JWT_TOKEN, res.token);
          return res;
        })
      );
  }

  register(user: User) {
    return this.http
      .post<any>(AUTH_API + 'register', user)
      .pipe(map((res) => res));
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem(JWT_TOKEN)!;
    return !this.jwtHeleper.isTokenExpired(token);
  }
}
