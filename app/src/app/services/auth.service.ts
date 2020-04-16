import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: UserModel = new UserModel();
  private url = 'http://localhost:3000/doc/';

  userToken: string;


  constructor( private http: HttpClient, private router: Router ) {
    console.log('Servicio agregado');
    this.leerToken();
   }
   
   logout(){
     localStorage.removeItem('token');
     this.router.navigateByUrl('/login');
   }

   login( user:UserModel ){
     
    Swal.fire({
      title: 'Loading',
      text: 'wait please',
      confirmButtonText: 'Cool',
      allowOutsideClick: false
    });
    Swal.showLoading();
    // Swal.fire({
    //   position: 'center',
    //   icon: 'success',
    //   title: 'Has iniciado sesion',
    //   showConfirmButton: false
    // });

    console.log(user);
    return this.http.post('http://localhost:3000/auth/login', user).subscribe( resp => {
      
      // if (resp === null) {
      //   return "OK";
      // }
      this.guardarToken( resp['accessToken'])
      console.log(resp);
      Swal.stopTimer();
      setTimeout(() => {
      Swal.close();
      
      this.router.navigateByUrl(`/home/${resp['role']['name']}`);
      }, 200);

    }, (err)=>{
      console.log(err.error.message);
      // Swal.close();

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Email or Password Incorrect',
        showCloseButton: true
      });
      return err;
    });
    // if( forma.invalid ){ return; }
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
