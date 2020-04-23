import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  userToken: string;
  httpClient: any;

  constructor(private auth: AuthService, private http: HttpClient ) { }

  getEvents(){
    this.leerToken();
    return this.http.get('http://localhost:3000/events');
  }

  readFrame(): Observable<any> {
    return this.http.get('http://localhost:3000/roles').pipe(
      map(res => {
        return res;
      }),
      catchError(error => {
        return throwError(error.error)
      })
    );
  }

  private leerToken() {

    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

  }

}
