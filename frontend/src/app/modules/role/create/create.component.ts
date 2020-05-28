import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RoleService } from "../../../services/role.service";
import { RoleModel } from "../../../models/role.model";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  roleId: string;
  formCreateRole: FormGroup;
  role: RoleModel;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.roleId = this.route.snapshot.paramMap.get('id');
    this.formCreateRole = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
    })
    if (this.roleId) {
      this.roleService.view(this.roleId).subscribe(
        (role: RoleModel) => {
          this.role = role;
          this.formCreateRole.controls['id'].setValue(this.role.id);
          this.formCreateRole.controls['name'].setValue(this.role.name);
        }
      );
    }
  }

  submitForm() {
    if (this.roleId) {
      this.roleService.update(this.formCreateRole.value).subscribe(
        (role: RoleModel) => {
          this.router.navigate(['/role']);
        },
        (error) => {
          console.log(error)
        }
      );
    } else {
      console.log(this.formCreateRole.value)
      this.roleService.create(this.formCreateRole.value).subscribe(
        (role: RoleModel) => {
          this.router.navigate(['/role']);
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }

  deleteRole(roleId) {
    this.roleService.delete(roleId).subscribe(
      res => {
        this.router.navigate(['/role']);
      },
      error => {
        console.log(error)
      }
    );
  }

}
