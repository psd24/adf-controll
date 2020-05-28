import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from "../../services/organization.service";
import { OrganizationModel } from "../../models/organization.model";

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  public organizations: OrganizationModel;

  constructor(
    private router: Router,
    private organizationService: OrganizationService
  ) { }

  ngOnInit(): void {
    this.organizationService.index().subscribe(
      (organizations: OrganizationModel) => {
        this.organizations = organizations;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateOrganization(organizationId) {
    this.router.navigate(['/organization/create', organizationId]);
  }

}
