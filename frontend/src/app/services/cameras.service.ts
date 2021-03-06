import { Injectable, Query } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CamerasService {

    backendUrl = environment.apiUrl;
    private params: HttpParams;

    constructor(private http: HttpClient) { }

    index(filter): Observable<any> {
        this.params = new HttpParams().set('query', filter);
        return this.http.post(this.backendUrl + '/camera/web', { 'query': filter }).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    view(cameraId): Observable<any> {
        return this.http.get(this.backendUrl + '/camera/' + cameraId).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    countEstate(): Observable<any> {
        return this.http.get(this.backendUrl + '/camera/state/counts').pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    create(params): Observable<any> {
        return this.http.post(this.backendUrl + '/camera', params).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    update(params): Observable<any> {
        return this.http.put(this.backendUrl + '/camera/', params).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    delete(cameraId): Observable<any> {
        return this.http.delete(this.backendUrl + '/camera/' + cameraId).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    weather(lat, lon) {
        return this.http.get('https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=metric&appid=1e21fb83e9ed74c9331768638405d612').pipe(
            //&exclude=hourly,daily
            //https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/' + 'weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=1e21fb83e9ed74c9331768638405d612'
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    assignUserCamera(params): Observable<any> {
        return this.http.post(this.backendUrl + '/camera/assignCamera', params).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

    cameraUser(params): Observable<any> {
        return this.http.post(this.backendUrl + '/camera/user/web', params).pipe(
            map(res => {
                return res;
            }),
            catchError(error => {
                return throwError(error.error)
            })
        );
    }

}