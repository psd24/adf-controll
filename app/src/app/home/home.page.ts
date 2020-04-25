import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { UserModel } from '../models/user.model';
import { RoleModel } from '../models/role.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  usuario:UserModel = new UserModel();
  public role: RoleModel;

  constructor( private auth: AuthService, public activeRoute: ActivatedRoute, private _us: UsersService ) {
    // _us.getUser().subscribe( user => {
    //   this.usuario = user as UserModel;
    //   console.log(this.usuario);
      
    // });
  }

  ngOnInit() {
    const getRole: string = localStorage.getItem('role');
    this.role = JSON.parse(getRole)
  }

  logout(){
    this.auth.logout();
  }
}
