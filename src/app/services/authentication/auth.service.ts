import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

const AUTH_API = 'https://localhost:5001/api/Auth/';

export interface LoginForm {
  email: string;
  password: string;
}

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
  constructor(private http: HttpClient) {}

  login(logininForm: LoginForm) {
    return this.http
      .post<any>(AUTH_API + 'login', {
        email: logininForm.email,
        password: logininForm.password,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          sessionStorage.setItem('token', res.token);
          return res;
        })
      );
  }

  register(user: User) {
    return this.http
      .post<any>(AUTH_API + 'register', user)
      .pipe(map((res) => res));
  }
}
