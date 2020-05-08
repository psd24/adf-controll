import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CamerasTypeService } from '../../services/cameras-type.service';
import { CameraTypeModel } from '../../models/camera-type.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  formCreateCameraType: FormGroup;
  cameraTypeId: string;
  cameraType: CameraTypeModel;

  constructor(
    private formBuilder: FormBuilder,
    private camerasTypeService: CamerasTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cameraTypeId = this.route.snapshot.paramMap.get('id');
    this.formCreateCameraType = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', [Validators.required, Validators.minLength(2)]],
    });
    if(this.cameraTypeId) {
      this.camerasTypeService.view(this.cameraTypeId).subscribe(
        (cameraType: CameraTypeModel) => {
          this.cameraType = cameraType;
          this.formCreateCameraType.controls['id'].setValue(this.cameraType.id);
          this.formCreateCameraType.controls['name'].setValue(this.cameraType.name);
          this.formCreateCameraType.controls['type'].setValue(this.cameraType.type);
        }
      );
    }
  }

  submitForm() {
    if(this.cameraTypeId) {
      this.camerasTypeService.update(this.formCreateCameraType.value).subscribe(
        (cameraType: CameraTypeModel) => {
          this.router.navigate(['/camera-type'])
        },
        (error) => {
          console.log(error)
        }
      );
    }
    this.camerasTypeService.create(this.formCreateCameraType.value).subscribe(
      (camera: CameraTypeModel) => {
        this.router.navigate(['/camera-type'])
      },
      (error) => {
        console.log(error)
      }
    );
  }

  backButton() {
    this.router.navigate(['/camera']);
  }

}
