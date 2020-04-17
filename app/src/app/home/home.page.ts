import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario:UserModel = new UserModel();

  role:string;

  constructor( private auth: AuthService, public activeRoute: ActivatedRoute, private _us: UsersService ) {
    _us.getUser().subscribe( user => {
      this.usuario = user as UserModel;
      console.log(this.usuario);
      
    });
  }

  logout(){
    this.auth.logout();
  }
}
