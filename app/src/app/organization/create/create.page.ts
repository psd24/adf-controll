import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OrganizationService } from "../../services/organization.service";
import { OrganizationModel } from '../../models/organization.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  formCreateOrganization: FormGroup;

  constructor(
    private organizationrvice: OrganizationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formCreateOrganization = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required, Validators.minLength(2)]]
   })
  }

  submitForm() {
    this.organizationrvice.create(this.formCreateOrganization.value).subscribe(
      (organization: OrganizationModel) => {
        console.log(organization)
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.formCreateOrganization.value);
  }

}
