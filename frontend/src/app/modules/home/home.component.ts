import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { OrganizationService } from '../../services/organization.service';
import { CamerasService } from '../../services/cameras.service';
import { UserModel } from "../../models/user.model";
import { CameraModel } from 'src/app/models/camera.model';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  loading = false;
  public organizationCount: number;
  public userCount: number;
  public cameraStateCount;
  public currentUser: UserModel;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
  }
  zoom = 8;
  markers = []
  public cameras;
  infoContent = '';

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

    this.center = {
      lat: 41.837841,
      lng: 1.540083,
    }

    this.addMarker();
  }

  addMarker() {
    this.camerasService.index({ "relations": ["organization", "cameraType"] }).subscribe(
      (camera: CameraModel) => {
        this.cameras = camera;
        this.cameras.forEach((camera) => {
          if (camera.lat && camera.lon) {
            this.markers.push({
              position: {
                lat: Number(camera.lat),
                lng: Number(camera.lon)
              },
              label: {
                color: 'white',
                text: camera.name,
              },
              title: 'Marker title ' + (camera.name),
              info: camera.url,
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

  openInfo(marker: MapMarker, content) {
    console.log(content)
    this.infoContent = content
    this.info.open(marker)
  }

}
