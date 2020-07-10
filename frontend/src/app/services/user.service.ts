import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {

    backendUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/auth/profile`);
    }

    getUser(): Observable<any> {
        return this.http.get(this.backendUrl + '/auth/profile').pipe(
          map(res => {
            return res;
          }),
          catchError(error => {
            return throwError(error.error)
          })
        );
      }
    
      count(): Observable<any> {
        return this.http.get(this.backendUrl + '/auth/user/count').pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
      }
    
      getUsers(params): Observable<any> {
        return this.http.get(this.backendUrl + '/auth/user', {params: params}).pipe(
          map(res => {
            return res;
          }),
          catchError(error => {
            return throwError(error.error)
          })
        );
      }

      getBotGroup(): Observable<any> {
        return this.http.get(this.backendUrl + '/auth/botGroup').pipe(
          map(res => {
            return res;
          }),
          catchError(error => {
            return throwError(error.error)
          })
        );
      }

      updateBotGroup(params): Observable<any> {
        return this.http.put(this.backendUrl + '/auth/botGroup/update', params).pipe(
          map(res => {
            return res;
          }),
          catchError(error => {
            return throwError(error.error)
          })
        );
      }
    
      view(userId): Observable<any> {
        return this.http.get(this.backendUrl + '/auth/user/' + userId).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
      }
    
      create(params): Observable<any> {
        return this.http.post(this.backendUrl + '/auth/register/', params).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
      }
    
      update(params): Observable<any> {
        return this.http.put(this.backendUrl + '/auth/register/update', params).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
      }
    
      resetPassword(params): Observable<any> {
        return this.http.put(this.backendUrl + '/auth/register/resetpassword', params).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
      }
    
      delete(userId): Observable<any> {
        return this.http.delete(this.backendUrl + '/auth/user/delete/' + userId).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
      }
}