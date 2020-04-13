import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Login } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000/doc/';

  userToken : string = '';


  constructor( private http: HttpClient ) {
    console.log('Servicio agregado');
    
   }

   login( user:Login ){

    console.log(user);
    return this.http.post('http://localhost:3000/auth/login', user);
    

   }

   private guardarToken( idToken: string ){
    this.userToken = idToken;
    localStorage.setItem( 'token', idToken );

    let hoy = new Date;
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString());


  }

  private leerToken() {

    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

  }

  estaAutenticado(): boolean{

    if ( this.userToken.length < 2){
      return false;
    }

    return this.userToken.length > 2;

    

    const expira = Number(localStorage.getItem('expira'));

    const expiraDate = new Date;

    expiraDate.setTime(expira);

    if( expiraDate > new Date ){

      return true;
    }
    else{
      return false;
    }

  }


  
}
