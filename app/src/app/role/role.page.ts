import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { RoleModel } from '../models/role.model';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-role',
  templateUrl: './role.page.html',
  styleUrls: ['./role.page.scss'],
})
export class RolePage {

  public roles:RoleModel;

  constructor(
    private roleService: RoleService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ionViewWillEnter() {
    this.getRoles();
  }

  getRoles() {
    this.roleService.index().subscribe(
      (role:RoleModel) => {
        this.roles = role;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editRole(roleId) {
    let navigationExtras: NavigationExtras = {
      state: {
        roleId: roleId
      }
    };
    this.router.navigate(['role/edit'], navigationExtras);
  }

  async removeRole(index, roleId) {
    console.log(index)
    const toast = await this.toastController.create({
      message: 'Seguro que quieres borra el rol ' + this.roles[index].name + '?',
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
            this.roleService.delete(roleId).subscribe(
              (role:RoleModel) => {
                toast.dismiss()
                this.getRoles()
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
