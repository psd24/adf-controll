import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserModel } from '../../../models/user.model';
import { RoleService } from '../../../services/role.service';
import { RoleModel } from '../../../models/role.model';
import { OrganizationService } from '../../../services/organization.service';
import { OrganizationModel } from '../../../models/organization.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CamerasService } from '../../../services/cameras.service';
import { CameraModel } from '../../../models/camera.model';
import { CameraListModel } from '../../../models/camera-list.model';
import { element } from 'protractor';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  roles: RoleModel;
  organizations: OrganizationModel;
  formCreateUser: FormGroup;
  formUserCamera: FormGroup;
  userId: String;
  user: UserModel;
  cameras: CameraModel[];
  cameraList: any[] = [];
  unAssignList: any[] = [];
  cameraUser: any;
  toastCreate: boolean = false;
  // cameraCheckList: FormControl = new FormControl();
  cameraCheckList: any[] = [];

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

    this.roleService.index().subscribe((role: RoleModel) => this.roles = role);
    this.organizationService.index().subscribe((organization: OrganizationModel) => this.organizations = organization);

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
    if (this.userId) {
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
    if (this.userId) {
      this.usersService.userCamera(this.userId).subscribe(
        res => {
          this.cameraCheckList = (res?.length && res[0]) || [];
          const ids = [];
          if (res[0]?.length) {
            res[0].map(data => {
              ids.push(data?.camera.id);
            });
            this.cameraList = [...ids];
          }
        },
        error => {
          console.log(error)
        }
      );
    }
    this.camerasService.index({ "relations": ["organization", "cameraType"], "where": [{ "state": 1 }] }).subscribe(
      (cameras: CameraModel[]) => {
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
    if (this.userId) {
      if (!this.formCreateUser.controls['password'].value) this.formCreateUser.controls['password'].setValue('');
      this.usersService.update(this.formCreateUser.value).subscribe(
        (user: UserModel) => {
          this.router.navigate(['/user'])
        },
        (error) => {
          console.log(error)
        }
      );
    } else {
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

  checkAllCamera(ev) {
    /*if(this.cameraList.length === 0) {
      this.cameraList = this.cameras;
      console.log(ev)
    } else {
      this.cameraList =  [];
    }*/
  }

  checkedDevice(camera, event) {
    let obj = {
      assignCameraIdList: [],
      unAssignCameraIdList: [],
      userId: Number(this.userId)
    }
    if (event.target.checked) {
      this.unAssignList = [];
      this.cameraList.push(camera.id);
      this.cameras.map(x => {
        const index1 = this.cameraList.findIndex(cmId => x.id === cmId);
        if (x.id != camera.id && this.cameraList.length !== this.cameras.length) {
          if (index1 === -1)
            this.unAssignList.push(x.id);
        } else if (x.id != camera.id && this.unAssignList.length) {

          const index = this.unAssignList.findIndex(camera.id);
          if (index > -1) {
            this.unAssignList = this.unAssignList.splice(index, 1);
          }
        }
      });
    } else if (!event.target.checked) {
      const index = this.cameraList.findIndex(x => x == camera.id);
      if (index > -1) {
        this.cameraList = this.cameraList.filter(x => x != camera.id);
        this.unAssignList.push(camera.id);
      }
    }
    obj.assignCameraIdList = this.cameraList;
    obj.unAssignCameraIdList = [...this.unAssignList];
    this.cameraUser = obj;
  }

  sendUserCamera() {
    console.log(this.cameraUser)
    this.camerasService.assignUserCamera(this.cameraUser).subscribe(
      res => {
        this.toastCreate = true;
      },
      error => {
        console.log(error)
      }
    );
  }
  isCheck(id) {
    if (this.cameraCheckList.length) {
      return this.cameraCheckList.findIndex(x => x?.camera?.id == id) > -1;
    }
    return false;
  }
}
