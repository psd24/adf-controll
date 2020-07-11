import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserModel } from '../../../models/user.model';
import { RoleService } from '../../../services/role.service';
import { RoleModel } from '../../../models/role.model';
import { OrganizationService } from '../../../services/organization.service';
import { OrganizationModel } from '../../../models/organization.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CamerasService } from '../../../services/cameras.service';
import { CameraModel } from '../../../models/camera.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  roles: RoleModel;
  organizations: OrganizationModel;
  formCreateUser: FormGroup;
  userId: String;
  user: UserModel;
  cameras: CameraModel;

  constructor(
    private router: Router,
    private roleService: RoleService,
    private organizationService: OrganizationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UserService,
    private camerasService: CamerasService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.roleService.index().subscribe((role:RoleModel) => this.roles = role);
    this.organizationService.index().subscribe((organization:OrganizationModel) => this.organizations = organization);

    this.formCreateUser = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      refresh_camera: [''],
      organization: ['', [Validators.required, Validators.minLength(2)]],
      role: ['', [Validators.required, Validators.minLength(2)]],
      authorizeConnection: ['']
    });
    if(this.userId) {
      this.usersService.view(this.userId).subscribe(
        (user: UserModel) => {
          this.user = user;
          this.formCreateUser.controls['id'].setValue(this.user.id);
          this.formCreateUser.controls['name'].setValue(this.user.name);
          this.formCreateUser.controls['code'].setValue(this.user.code);
          this.formCreateUser.controls['password'].setValue('');
          this.formCreateUser.controls['email'].setValue(this.user.email);
          this.formCreateUser.controls['organization'].setValue(this.user.organization.id);
          this.formCreateUser.controls['role'].setValue(this.user.role.id);
          this.formCreateUser.controls['refresh_camera'].setValue(this.user.refresh_camera);
          this.formCreateUser.controls['authorizeConnection'].setValue(this.user.authorizeConnection);
        }
      );
    }
    this.camerasService.index({ "relations": ["organization", "cameraType"], "where": [{ "state": 1 }] }).subscribe(
      (cameras:CameraModel) => {
        this.cameras = cameras
      },
      (error) => {
        console.log(error);
      }
    );
  }

  generatePassword() {
    const pass = Math.random().toString(36).slice(3); 
    this.formCreateUser.controls['password'].setValue(pass);
  }

  submitForm() {
    if(this.userId) {
      if(!this.formCreateUser.controls['password'].value) this.formCreateUser.controls['password'].setValue('');
      this.usersService.update(this.formCreateUser.value).subscribe(
        (user: UserModel) => {
          this.router.navigate(['/user'])
        },
        (error) => {
          console.log(error)
        }
      );
    }else{
      this.usersService.create(this.formCreateUser.value).subscribe(
        (user: UserModel) => {
          this.router.navigate(['/user'])
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }

  deleteUser(userId) {
    this.usersService.delete(userId).subscribe(
      (res) => {
        this.router.navigate(['/user']);
      },
      (error) => {
        console.log(error)
      }
    );
  }

}
