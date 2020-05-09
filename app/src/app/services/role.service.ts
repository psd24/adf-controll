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
export class RoleService {

  private backendUrl = AppConfig.urlBackend;
  
  constructor( private http: HttpClient ) { }
   
    index(): Observable<any> {
        return this.http.get(this.backendUrl + 'roles').pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    view(roleId): Observable<any> {
        return this.http.get(this.backendUrl + 'roles/' + roleId).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    delete(roleId): Observable<any> {
        return this.http.delete(this.backendUrl + 'roles/' + roleId).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    create(params): Observable<any> {
        return this.http.post(this.backendUrl + 'roles/', params).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    update(params): Observable<any> {
        return this.http.put(this.backendUrl + 'roles/', params).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }
  
}
