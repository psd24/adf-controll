import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private backendUrl = 'http://localhost:3000/';
  
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
  
}
