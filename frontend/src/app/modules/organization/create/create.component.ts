import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganizationModel } from "../../../models/organization.model";
import { OrganizationService } from "../../../services/organization.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  organizationId: string;
  formCreateOrganization: FormGroup;
  organization: OrganizationModel;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    console.log(this.organizationId)
    this.formCreateOrganization = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required, Validators.minLength(1)]],
    })
    if (this.organizationId) {
      this.organizationService.view(this.organizationId).subscribe(
        (organization: OrganizationModel) => {
          this.organization = organization;
          console.log(this.organization)
          this.formCreateOrganization.controls['id'].setValue(this.organization.id);
          this.formCreateOrganization.controls['name'].setValue(this.organization.name);
        }
      );
    }
  }

  submitForm() {
    if (this.organizationId) {
      this.organizationService.update(this.formCreateOrganization.value).subscribe(
        (role: OrganizationModel) => {
          this.router.navigate(['/organization']);
        },
        (error) => {
          console.log(error)
        }
      );
    } else {
      this.organizationService.create(this.formCreateOrganization.value).subscribe(
        (role: OrganizationModel) => {
          this.router.navigate(['/organization']);
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }

  deleteOrganization(organizationId) {
    this.organizationService.delete(organizationId).subscribe(
      res => {
        this.router.navigate(['/organization']);
      },
      error => {
        console.log(error)
      }
    );
  }

}
