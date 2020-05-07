import { Component, OnInit } from '@angular/core';
import { CamerasTypeService } from '../services/cameras-type.service';
import { CameraTypeModel } from '../models/camera-type.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera-type',
  templateUrl: './camera-type.page.html',
  styleUrls: ['./camera-type.page.scss'],
})
export class CameraTypePage implements OnInit {

  cameraTypes: CameraTypeModel;

  constructor(
    private camerasTypeService: CamerasTypeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.camerasTypeService.index().subscribe(
      (cameraType: CameraTypeModel) => {
        this.cameraTypes = cameraType;
        console.log(this.cameraTypes);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editCameraType(cameraTypeId) {
    this.router.navigate(['/camera-type/create/' + cameraTypeId])
    console.log(cameraTypeId)
  }

  removeCameraType(index, cameraTypeId) {
    this.camerasTypeService.delete(cameraTypeId).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

}
