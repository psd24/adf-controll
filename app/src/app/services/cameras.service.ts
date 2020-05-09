import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class CamerasService {

  private backendUrl = AppConfig.urlBackend;

  constructor(private http: HttpClient) { }

  index(): Observable<any> {
    return this.http.get(this.backendUrl + 'camera').pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(error.error)
        })
    );
  }

  view(cameraId): Observable<any> {
    return this.http.get(this.backendUrl + 'camera/' + cameraId).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(error.error)
        })
    );
}

  create(params): Observable<any> {
    return this.http.post(this.backendUrl + 'camera', params).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(error.error)
        })
    );
  }

  update(params): Observable<any> {
    return this.http.put(this.backendUrl + 'camera/', params).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(error.error)
        })
    );
  }

  delete(cameraId): Observable<any> {
    return this.http.delete(this.backendUrl + 'camera/' + cameraId).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(error.error)
        })
    );
  }

}
