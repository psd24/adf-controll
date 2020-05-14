import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    backendUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

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
