import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { OrganizationModel } from '../models/organization.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public profile: UserModel = new UserModel();
  public organization: OrganizationModel = new OrganizationModel();

  constructor(
    private auth: AuthService,
    private usersService: UsersService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.usersService.getUser().subscribe(
      (profile: UserModel) => {
        this.profile = profile;
        console.log(this.profile)
        this.organization = profile['organization'];        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  resetPassword(userId) {
    console.log(userId)
    this.router.navigate(['profile/reset-password/', userId]);
  }

  logout() {
    this.auth.logout();
  }

}
