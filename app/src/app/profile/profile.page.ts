import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  usuario:UserModel = new UserModel();

  role:string;

  constructor( private auth: AuthService, public activeRoute: ActivatedRoute, private _us: UsersService ) {
    _us.getUser().subscribe( user => {
      this.usuario = user as UserModel;
      console.log(this.usuario);
      
    });
  }
  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }

}
