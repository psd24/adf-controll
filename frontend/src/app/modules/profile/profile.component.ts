import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { RoleModel } from '../../models/role.model';
import { OrganizationService } from '../../services/organization.service';
import { OrganizationModel } from '../../models/organization.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserModel;
  userId: number;
  formCreateUser: FormGroup;
  roles: RoleModel;
  organizations: OrganizationModel;
  disabledInput: boolean = true;
  clicked = false;
  clickSave = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private roleService: RoleService,
    private organizationService: OrganizationService,
  ) { }

  ngOnInit(): void {
    this.roleService.index().subscribe((role:RoleModel) => this.roles = role);
    this.organizationService.index().subscribe((organization:OrganizationModel) => this.organizations = organization);
    this.formCreateUser = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      organization: ['', [Validators.required, Validators.minLength(2)]],
      role: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.userService.getUser().subscribe(
      (user: UserModel) => {
        this.user = user;
        console.log(this.user.email)
        this.formCreateUser.controls['id'].setValue(this.user.id);
        this.formCreateUser.controls['name'].setValue(this.user.name);
        this.formCreateUser.controls['code'].setValue(this.user.code);
        this.formCreateUser.controls['password'].setValue('');
        this.formCreateUser.controls['email'].setValue(this.user.email);
        this.formCreateUser.controls['organization'].setValue(this.user.organization.id);
        this.formCreateUser.controls['role'].setValue(this.user.role.id);
      },
      (error) => {
        console.log(error);
      }
    );
    this.formCreateUser.controls['name'].disable();
    this.formCreateUser.controls['code'].disable()
    this.formCreateUser.controls['password'].disable();
    this.formCreateUser.controls['email'].disable()
    this.formCreateUser.controls['organization'].disable()
    this.formCreateUser.controls['role'].disable()
  }

  submitForm() {
    console.log(this.formCreateUser.value)
    this.userService.update(this.formCreateUser.value).subscribe(
      (user: UserModel) => {
        this.router.navigate(['/home'])
      },
      (error) => {
        console.log(error)
      }
    );
  }

  disabled() {
    this.clicked = false;
    this.disabledInput = true;
    this.clickSave = true;
    this.formCreateUser.controls['name'].enable();
    this.formCreateUser.controls['code'].enable()
    this.formCreateUser.controls['password'].enable();
    this.formCreateUser.controls['email'].enable()
    this.formCreateUser.controls['organization'].enable()
    this.formCreateUser.controls['role'].enable()
  }
}
