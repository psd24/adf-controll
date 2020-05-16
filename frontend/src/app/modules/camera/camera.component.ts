import { Component, OnInit } from '@angular/core';
import { CamerasService } from '../../services/cameras.service';
import { CameraModel } from '../../models/camera.model';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  cameras: CameraModel;
  timeStamp;
  subscriptionCamera;
  refreshImage: number = 50 * 1000;

  constructor(
    private camerasService: CamerasService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCameras();
    this.timeStamp = (new Date()).getTime();
    this.subscriptionCamera = interval(this.refreshImage).subscribe(va => {
      this.timeStamp = (new Date()).getTime();
      this.getCameras();
    })
  }

  getCameras() {
    this.camerasService.index({ "relations": ["organization", "cameraType"] }).subscribe(
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
    console.log(cameraId)
  }

}
