import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RoleModel } from '../models/role.model';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public role: RoleModel;
  public organizationCount: number;

  constructor( 
    private auth: AuthService,
    public activeRoute: ActivatedRoute,
    private organizationService: OrganizationService 
    ) {
    // _us.getUser().subscribe( user => {
    //   this.usuario = user as UserModel;
    //   console.log(this.usuario);
      
    // });
  }

  ngOnInit() {
    const getRole: string = localStorage.getItem('role');
    this.role = JSON.parse(getRole)

    this.organizationService.count().subscribe(
      (organizationCount) => {
        this.organizationCount = organizationCount;
        console.log(this.organizationCount)
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
