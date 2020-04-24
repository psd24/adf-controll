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
  
  profile:UserModel = new UserModel();

  constructor( 
    private auth: AuthService,
    public activeRoute: ActivatedRoute,
    private _us: UsersService
  ) { }

  ngOnInit() {
    this._us.getUser().subscribe(
      (profile) => {
        this.profile = profile;
        console.log(this.profile);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout(){
    this.auth.logout();
  }

}
