import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { OrganizationModel } from '../models/organization.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  public organizations: OrganizationModel

  constructor( 
    private organizationrvice: OrganizationService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getOrganization();
  }

  ionViewWillEnter() {
    this.getOrganization();
  }

  getOrganization() {
    this.organizationrvice.index().subscribe(
      (organization: OrganizationModel) => {
        this.organizations = organization;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  organizationId(organizationId) {
    let navigationExtras: NavigationExtras = {
      state: {
        organizationId: organizationId
      }
    };
    this.router.navigate(['admin/menu'], navigationExtras);
  }

}
