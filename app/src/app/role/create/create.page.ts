import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RoleService } from "../../services/role.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  formCreateRole: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService
    ) { }

  ngOnInit() {
    this.formCreateRole = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
   })
  }

  submitForm() {
    this.roleService.create(this.formCreateRole.value).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
