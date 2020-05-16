import { Component, OnInit } from '@angular/core';
import { CamerasService } from '../../services/cameras.service';
import { CameraModel } from '../../models/camera.model';
import { OrganizationModel } from '../../models/organization.model';
import { OrganizationService } from '../../services/organization.service';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  cameras: CameraModel;
  organizations: OrganizationModel;
  timeStamp;
  subscriptionCamera;
  refreshImage: number = 50 * 1000;
  formSearchCamera: FormGroup;
  query: object;

  constructor(
    private camerasService: CamerasService,
    private router: Router,
    private organizationService: OrganizationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.organizationService.index().subscribe((organization: OrganizationModel) => this.organizations = organization);
    this.formSearchCamera = this.formBuilder.group({
      state: ['3'],
    })
    this.getCameras();
    this.timeStamp = (new Date()).getTime();
    this.subscriptionCamera = interval(this.refreshImage).subscribe(va => {
      this.timeStamp = (new Date()).getTime();
      this.getCameras();
    })
  }

  getCameras() {
    if (this.formSearchCamera.controls['state'].value === "3") {
      this.query = { "relations": ["organization", "cameraType"] };
    }
    else if (this.formSearchCamera.controls['state'].value) {
      this.query = { "relations": ["organization", "cameraType"], "where": [{ "state": this.formSearchCamera.controls['state'].value }] };
    }
    else {
      this.query = { "relations": ["organization", "cameraType"] };
    }
    this.camerasService.index(this.query).subscribe(
      (cameras: CameraModel) => {
        this.cameras = cameras;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCamera(cameraId) {
    this.router.navigate(['/camera/create', cameraId]);
  }

}
