import { Component, OnInit } from '@angular/core';
import { CamerasService } from '../../services/cameras.service';
import { CameraModel } from '../../models/camera.model';
import { interval } from 'rxjs';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  cameras: CameraModel;
  timeStamp;
  subscriptionCamera;
  refreshImage: number = 50*1000;

  constructor(
    private camerasService: CamerasService
  ) { }

  ngOnInit(): void {
    this.getCameras();
    this.timeStamp = (new Date()).getTime();
    this.subscriptionCamera = interval(this.refreshImage).subscribe(va =>{
      this.timeStamp = (new Date()).getTime();
      this.getCameras();
    })
  }

  getCameras() {
    this.camerasService.index({"relations": ["organization", "cameraType"]}).subscribe(
      (cameras: CameraModel) => {
        this.cameras = cameras;
        console.log(this.cameras)
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
