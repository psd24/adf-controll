import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  userToken: string;

  constructor(private auth: AuthService, private http: HttpClient ) { }

  getEvents(){
    this.leerToken();
    return this.http.get('http://localhost:3000/events');
  }

  private leerToken() {

    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

  }

}
