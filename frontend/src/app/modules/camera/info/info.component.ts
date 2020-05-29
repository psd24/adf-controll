import { Component, OnInit } from '@angular/core';
import { CamerasService } from '../../../services/cameras.service';
import { ActivatedRoute } from '@angular/router';
import { CameraModel } from '../../../models/camera.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  cameraId: string;
  camera: CameraModel;
  weather;
  lat;
  lon;

  constructor(
    private camerasService: CamerasService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.updateWeather();
  }

  updateWeather() {
    this.cameraId = this.route.snapshot.paramMap.get('id');
    this.camerasService.view(this.cameraId).subscribe(
      (camera:CameraModel) => {
        this.camera = camera;
        this.lat = this.camera.lat;
        this.lon = this.camera.lon;
        this.camerasService.weather(this.lat, this.lon).subscribe(
          weather =>{
            this.weather = weather;
            console.log(weather)
          },
          error => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
