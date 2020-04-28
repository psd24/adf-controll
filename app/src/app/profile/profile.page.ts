import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { OrganizationModel } from '../models/organization.model';

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
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.getUser().subscribe(
      (profile: UserModel) => {
        this.profile = profile;
        this.organization = profile['organization']; 
        console.log(this.profile);

        console.log(profile['organization']['name']);
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.auth.logout();
  }

}
