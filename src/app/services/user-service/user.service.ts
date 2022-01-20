import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../authentication/auth.service';

const USER_API = 'https://localhost:5001/api/User';

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

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  findAll(page: number, size: number): Observable<UserData> {
    let params = new HttpParams();

    params = params.append('PageNumber', String(page));
    params = params.append('PageSize', String(size));

    return this.http.get(USER_API, { params }).pipe(
      map((userData: UserData | any) => userData),
      catchError((err) => throwError(err))
    );
  }

  paginateByName(
    name: string,
    page: number,
    size: number
  ): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('PageNumber', String(page));
    params = params.append('PageSize', String(size));

    return this.http.get(USER_API, { params }).pipe(
      map((userData: UserData | any) => userData),
      catchError((err) => throwError(err))
    );
  }

  // deleteUser(id: number) {
  //   return this.http.delete<any>(USER_API + '/' + id).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }
}
