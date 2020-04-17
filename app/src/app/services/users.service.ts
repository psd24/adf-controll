import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userToken:string;
  usuario: UserModel = new UserModel();
  private url = 'http://localhost:3000/doc/';
  
  constructor( private http: HttpClient) {
    
   }

  getUser(){
    this.leerToken();
    var tokenHeader = `Bearer ${this.userToken}`
    
    const headers = new HttpHeaders({
      'Authorization': tokenHeader
    });

    return this.http.get('http://localhost:3000/auth/profile', { headers });

  }

  private leerToken() {

    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }   

  }
  
}
