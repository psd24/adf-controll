import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { ok } from 'assert';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: UserModel = new UserModel();
  private url = AppConfig.urlBackend;

  userToken: string;


  constructor( private http: HttpClient, private router: Router, public toastController: ToastController ) {
    console.log('Servicio agregado');
    this.leerToken();
   }

   async presentToast( mensaje : string ) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }

   logout(){
     localStorage.clear();
     this.router.navigateByUrl('/login');
   }

   login( user:UserModel ){

    this.http.post('http://localhost:3000/auth/login', user).subscribe( resp => {
      if (resp['accessToken'] === null) {
        return;
      }
      
      if (resp['role']['name']  === null) {
        this.presentToast('Este usuario no tiene rol asignado ');
        return;
      } 
      this.guardarToken( resp['accessToken'], JSON.stringify(resp['role']))
      
      // this.router.navigateByUrl(`/${resp['role']['name']}`);
      this.router.navigateByUrl('home');
      console.log(resp['role']);

    }, err => {

      this.presentToast(err.error.message);

    });
   }

   private guardarToken( idToken: string, role: any ){
    this.userToken = idToken;
    localStorage.setItem( 'token', idToken );
    localStorage.setItem( 'role', role );

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
