import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private backendUrl = 'http://localhost:3000/';
  
  constructor( private http: HttpClient ) { }
   
    index(): Observable<any> {
        return this.http.get(this.backendUrl + 'organizations').pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    create(params): Observable<any> {
        return this.http.post(this.backendUrl + 'organizations/', params).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    delete(organizationId): Observable<any> {
        return this.http.delete(this.backendUrl + 'organizations/' + organizationId).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

  view(organizationId): Observable<any> {
        return this.http.get(this.backendUrl + 'organizations/' + organizationId).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    update(params): Observable<any> {
        return this.http.put(this.backendUrl + 'organizations/', params).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    count(): Observable<any> {
        return this.http.get(this.backendUrl + 'organizations/count').pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

}
