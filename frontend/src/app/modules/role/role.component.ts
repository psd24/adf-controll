import { Component, OnInit } from '@angular/core';
import { RoleService } from "../../services/role.service";
import { RoleModel } from "../../models/role.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public roles: RoleModel;

  constructor(
    private roleService: RoleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.roleService.index().subscribe(
      (roles: RoleModel) => {
        this.roles = roles
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateRole(roleId) {
    this.router.navigate(['/role/create', roleId]);
    console.log(roleId);
  }

}
