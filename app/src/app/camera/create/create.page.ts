import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CamerasService } from '../../services/cameras.service';
import { CameraModel } from '../../models/camera.model';
import { OrganizationService } from '../../services/organization.service';
import { OrganizationModel } from '../../models/organization.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  formCreateCamera: FormGroup;
  organizations: OrganizationModel;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private camerasService: CamerasService,
    private organizationService: OrganizationService
  ) { }

  ngOnInit() {
    this.organizationService.index().subscribe((organization: OrganizationModel) => this.organizations = organization);
    this.formCreateCamera = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      ip: ['', [Validators.required, Validators.minLength(2)]],
      port: ['', [Validators.required, Validators.minLength(2)]],
      user: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      organizationId: [''],
      cameraTypeId: [1],
    })
  }

  submitForm() {
    console.log(this.formCreateCamera.value)
    this.camerasService.create(this.formCreateCamera.value).subscribe(
      (camera: CameraModel) => {
        console.log(camera)
        this.router.navigate(['/camera'])
      },
      (error) => {
        console.log(error)
      }
    );
  }

}
