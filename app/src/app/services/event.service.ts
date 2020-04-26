import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private backendUrl = 'http://localhost:3000/';

  constructor(private auth: AuthService, private http: HttpClient ) { }

  getEvents(): Observable<any> {
    return this.http.get(this.backendUrl + 'events/list').pipe(
      map(res => {
        return res;
      }),
      catchError(error => {
        return throwError(error.error)
      })
    );
  }

  getEventsAdmin(params): Observable<any> {
    return this.http.get(this.backendUrl + 'events/list/query/' + params).pipe(
      map(res => {
        return res;
      }),
      catchError(error => {
        return throwError(error.error)
      })
    );
  }

}
