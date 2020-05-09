import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private backendUrl = AppConfig.urlBackend;
  
  constructor( private http: HttpClient ) { }
   
  getUser(): Observable<any> {
    return this.http.get(this.backendUrl + 'auth/profile').pipe(
      map(res => {
        return res;
      }),
      catchError(error => {
        return throwError(error.error)
      })
    );
  }

  count(): Observable<any> {
    return this.http.get(this.backendUrl + 'auth/user/count').pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(error.error)
        })
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(this.backendUrl + 'auth/user').pipe(
      map(res => {
        return res;
      }),
      catchError(error => {
        return throwError(error.error)
      })
    );
  }

  view(userId): Observable<any> {
    return this.http.get(this.backendUrl + 'auth/user/' + userId).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(error.error)
        })
    );
  }

  create(params): Observable<any> {
    return this.http.post(this.backendUrl + 'auth/register/', params).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(error.error)
        })
    );
  }

  update(params): Observable<any> {
    return this.http.put(this.backendUrl + 'auth/register/update', params).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(error.error)
        })
    );
  }

  resetPassword(params): Observable<any> {
    return this.http.put(this.backendUrl + 'auth/register/resetpassword', params).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(error.error)
        })
    );
  }

  delete(userId): Observable<any> {
    return this.http.delete(this.backendUrl + 'auth/user/delete/' + userId).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(error.error)
        })
    );
  }
  
}
