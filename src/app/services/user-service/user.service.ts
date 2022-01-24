import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { UserModel } from 'src/app/components/users/user-model';
import { API_URL } from 'src/app/core/api.token';
import { User } from '../authentication/auth.service';

export interface UserData {
  data: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    hasprevious: boolean;
    hasNext: boolean;
  };
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
  ) {}

  findAll(page: number, size: number): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('PageNumber', String(page));
    params = params.append('PageSize', String(size));

    const path = `${this.apiUrl}/User`;

    return this.http
      .get<UserData>(path, { params })
      .pipe(catchError((err) => throwError(() => err)));
  }

  paginateByName(
    name: string,
    page: number,
    size: number
  ): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('PageNumber', page);
    params = params.append('PageSize', size);

    const path = `${this.apiUrl}/User`;
    return this.http
      .get<UserData>(path, { params })
      .pipe(catchError((err) => throwError(() => err)));
  }

  addUser(user: User) {
    const path = `${this.apiUrl}/User`;
    return this.http.post<User>(path, user).pipe(map((res) => res));
  }

  deleteUser(id: number) {
    const path = `${this.apiUrl}/User`;
    return this.http.delete<User>(`${path}/${id}`).pipe(tap(console.log));
  }

  editUser(id: number, user: User) {
    const path = `${this.apiUrl}/User/${id}`;
    return this.http.put<User>(path, user);
  }

  logout() {
    sessionStorage.removeItem('crud-token');
  }
}
