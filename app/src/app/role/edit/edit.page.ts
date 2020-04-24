import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RoleService } from '../../services/role.service';
import { RoleModel } from '../../models/role.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  roleId: number;
  role: RoleModel;
  formCreateRole: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    public toastController: ToastController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.roleId = this.router.getCurrentNavigation().extras.state.roleId;
      }
    });
  }

  ngOnInit() {
    this.formCreateRole = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.roleService.view(this.roleId).subscribe(
      (role: RoleModel) => {
        this.role = role;
        this.formCreateRole.controls['id'].setValue(this.role.id);
        this.formCreateRole.controls['name'].setValue(this.role.name);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitForm() {
    console.log(this.formCreateRole.value)
    this.roleService.update(this.formCreateRole.value).subscribe(
      (res) =>{
        console.log(res);
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
      message: 'El rol a sido actualizado',
      duration: 5000,
      color: "success",
    });
    toast.present();
  }

}
