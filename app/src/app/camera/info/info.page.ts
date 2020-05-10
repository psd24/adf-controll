import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamerasService } from '../../services/cameras.service';
import { CameraModel } from '../../models/camera.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  cameraId: string;
  camera: CameraModel;
  weather;
  lat;
  lon;

  constructor(
    private route: ActivatedRoute,
    private camerasService: CamerasService,
    private router: Router,
  ) { }

  ngOnInit() {
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
        console.log(this.camera)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  backButton() {
    this.router.navigate(['/camera']);
  }

}
