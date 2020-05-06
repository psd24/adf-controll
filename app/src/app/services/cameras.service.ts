import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CamerasService {

  private backendUrl = 'http://localhost:3000/';

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
