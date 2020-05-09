import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private backendUrl = AppConfig.urlBackend;

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
    return this.http.get(this.backendUrl + 'events/admin/list/' + params).pipe(
      map(res => {
        return res;
      }),
      catchError(error => {
        return throwError(error.error)
      })
    );
  }

}
