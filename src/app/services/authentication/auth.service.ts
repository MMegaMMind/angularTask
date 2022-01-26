import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { API_URL } from 'src/app/core/api.token';

export interface LoginForm {
  email: string;
  password: string;
}

export const JWT_TOKEN = 'crud-token';

export interface User {
  email: string;
  name: string;
  imageUrl: string;
  role: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth!: boolean;
  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient,
    private jwtHeleper: JwtHelperService
  ) {}

  login(logininForm: LoginForm) {
    const path = `${this.apiUrl}/Auth/login`;
    return this.http
      .post<User>(path, {
        email: logininForm.email,
        password: logininForm.password,
      })
      .pipe(
        map((res: any) => {
          sessionStorage.setItem(JWT_TOKEN, res.token);
          return res;
        })
      );
  }

  register(user: User) {
    const path = `${this.apiUrl}/Auth/register`;
    return this.http.post<User>(path, user);
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem(JWT_TOKEN)!;
    return !this.jwtHeleper.isTokenExpired(token);
  }
}
