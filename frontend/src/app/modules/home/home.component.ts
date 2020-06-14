import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { OrganizationService } from '../../services/organization.service';
import { CamerasService } from '../../services/cameras.service';
import { UserModel } from "../../models/user.model";
import { CameraModel } from 'src/app/models/camera.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  public organizationCount: number;
  public userCount: number;
  public cameraStateCount;
  public currentUser: UserModel;
  center: google.maps.LatLngLiteral;
  zoom = 8;
  markers = []
  public cameras;

  constructor(
    private organizationService: OrganizationService,
    private usersService: UserService,
    private camerasService: CamerasService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loading = true;
    this.organizationService.count().subscribe(
      (organizationCount) => {
        this.organizationCount = organizationCount;
      },
      (error) => {
        console.log(error);
      }
    );

    this.usersService.count().subscribe(
      (userCount) => {
        this.userCount = userCount;
      },
      (error) => {
        console.log(error);
      }
    );

    this.camerasService.countEstate().subscribe(
      (cameraStateCount) => {
        this.cameraStateCount = cameraStateCount;
      },
      (error) => {
        console.log(error);
      }
    );

    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    this.addMarker();
  }

  addMarker() {
    this.camerasService.index({ "relations": ["organization", "cameraType"] }).subscribe(
      (camera: CameraModel) => {
        this.cameras = camera;
        this.cameras.forEach((value) => {
          if (value.lat && value.lon) {
            this.markers.push({
              position: {
                lat: Number(value.lat),
                lng: Number(value.lon)
              },
              label: {
                color: 'white',
                text: value.name,
              },
              title: 'Marker title ' + (value.name),
              options: { animation: google.maps.Animation.BOUNCE },
            });
          }
        });
      },
      (error) => {
        console.log(error)
      }
    );
  }

}
