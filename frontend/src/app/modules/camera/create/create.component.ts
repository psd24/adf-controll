import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CamerasService } from '../../../services/cameras.service';
import { CameraModel } from '../../../models/camera.model';
import { OrganizationService } from '../../../services/organization.service';
import { OrganizationModel } from '../../../models/organization.model';
import { CamerasTypeService } from '../../../services/cameras-type.service';
import { CameraTypeModel } from '../../../models/camera-type.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  formCreateCamera: FormGroup;
  organizations: OrganizationModel;
  cameraTypes: CameraTypeModel;
  cameraId: string;
  camera: CameraModel;
  toastUpdate: boolean = false;
  toastCreate: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private camerasService: CamerasService,
    private organizationService: OrganizationService,
    private route: ActivatedRoute,
    private camerasTypeService: CamerasTypeService
  ) { }

  ngOnInit(): void {
    this.cameraId = this.route.snapshot.paramMap.get('id');
    this.organizationService.index().subscribe((organization: OrganizationModel) => this.organizations = organization);
    this.camerasTypeService.index().subscribe((cameraTypes: CameraTypeModel) => this.cameraTypes = cameraTypes);
    this.formCreateCamera = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      ip: ['', [Validators.required, Validators.minLength(2)]],
      port: ['', [Validators.required, Validators.minLength(2)]],
      user: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      lat: ['', [Validators.minLength(2)]],
      lon: ['', [Validators.minLength(2)]],
      state: [''],
      organizationId: ['', [Validators.required, Validators.minLength(2)]],
      cameraTypeId: ['', [Validators.required, Validators.minLength(2)]],
    })
    if (this.cameraId) {
      this.camerasService.view(this.cameraId).subscribe(
        (camera: CameraModel) => {
          this.camera = camera;
          this.formCreateCamera.controls['id'].setValue(this.camera.id);
          this.formCreateCamera.controls['name'].setValue(this.camera.name);
          this.formCreateCamera.controls['ip'].setValue(this.camera.ip);
          this.formCreateCamera.controls['port'].setValue(this.camera.port);
          this.formCreateCamera.controls['user'].setValue(this.camera.user);
          this.formCreateCamera.controls['password'].setValue(this.camera.password);
          this.formCreateCamera.controls['lat'].setValue(this.camera.lat);
          this.formCreateCamera.controls['lon'].setValue(this.camera.lon);
          this.formCreateCamera.controls['state'].setValue(this.camera.state);
          this.formCreateCamera.controls['organizationId'].setValue(this.camera.organization.id);
          this.formCreateCamera.controls['cameraTypeId'].setValue(this.camera.cameraType.id);
        }
      );
    }
  }

  submitForm() {
    if (this.cameraId) {
      this.camerasService.update(this.formCreateCamera.value).subscribe(
        (camera: CameraModel) => {
          this.toastUpdate = true;
        },
        (error) => {
          console.log(error)
        }
      );
    } else {
      console.log(this.formCreateCamera.value)
      this.formCreateCamera.controls['state'].setValue(2);
      this.camerasService.create(this.formCreateCamera.value).subscribe(
        (camera: CameraModel) => {
          this.toastCreate = true;
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }

  deleteCamera(cameraId) {
    this.camerasService.delete(cameraId).subscribe(
      res => {
        this.router.navigate(['/camera']);
      },
      error => {
        console.log(error)
      }
    );
  }

}
