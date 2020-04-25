import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { OrganizationService } from '../../services/organization.service';
import { OrganizationModel } from '../../models/organization.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  organizationId: number;
  organization: OrganizationModel;
  formCreateOrganization: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private organizationService: OrganizationService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.organizationId = this.router.getCurrentNavigation().extras.state.roleId;
      }
    });
  }

  ngOnInit() {
    this.formCreateOrganization = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.organizationService.view(this.organizationId).subscribe(
      (role: OrganizationModel) => {
        this.organization = role;
        console.log(this.organization);
        this.formCreateOrganization.controls['id'].setValue(this.organization.id);
        this.formCreateOrganization.controls['name'].setValue(this.organization.name);
        this.formCreateOrganization.controls['code'].setValue(this.organization.code);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitForm() {
    console.log(this.formCreateOrganization.value)
    this.organizationService.update(this.formCreateOrganization.value).subscribe(
      (res) =>{
        this.presentToast();
      },
      (error) => {
        console.log(error);
      }
    );
    console.log('edit')
  }

  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'La organizacion a sido actualizado',
      duration: 5000,
      color: "success",
    });
    toast.present();
  }

}
