import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { OrganizationModel } from '../models/organization.model';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage implements OnInit {

  public organizations: OrganizationModel

  constructor(
    private organizationrvice: OrganizationService,
    public toastController: ToastController,
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

  editOrganization(organizationId) {
    console.log('edit');
    let navigationExtras: NavigationExtras = {
      state: {
        roleId: organizationId
      }
    };
    this.router.navigate(['organization/edit'], navigationExtras);
  }

  async removeOrganization(index, organizationId) {
    console.log('remove');
    const toast = await this.toastController.create({
      message: 'Seguro que quieres borra el rol ' + this.organizations[index].name + '?',
      position: 'bottom',
      color: "danger",
      duration: 10000,
      buttons: [
        {
          side: 'end',
          icon: 'trash-outline',
          role: 'cancel',
          handler: () => {
            console.log('Delete clicked');
            this.organizationrvice.delete(organizationId).subscribe(
              (role:OrganizationModel) => {
                toast.dismiss()
                this.getOrganization()
              },
              (error) => {
                console.log(error);
              }
            );
          }
        }
      ]
    });
    toast.present();
  }

}
