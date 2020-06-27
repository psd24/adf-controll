import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { OrganizationService } from '../../services/organization.service';
import { CamerasService } from '../../services/cameras.service';
import { UserModel } from "../../models/user.model";
import { CameraModel } from 'src/app/models/camera.model';
import { latLng, tileLayer, marker, icon, Marker } from 'leaflet';
import * as L from 'leaflet';

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
  public cameras;
  public currentUser: UserModel;
  mapLeaflet: L.Map;
  query: any;
  markers = []
  optionsLeaflet = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors GuaitaCat'
      })
    ],
    zoom: 4,
    center: latLng([41.837841, 1.540083])
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    }
  }

  constructor(
    private organizationService: OrganizationService,
    private usersService: UserService,
    private camerasService: CamerasService
  ) { }

  onMapReady(map: L.Map) {
    this.mapLeaflet = map;
    const self = this;

    if (this.currentUser.role.name === 'superadmin' || (this.currentUser.role.name === 'admin')) {
      this.query = { "relations": ["organization", "cameraType"] };
    } else {
      this.query = { "relations": ["organization", "cameraType"], "where": [{ "state": 1 }] }
    }
    this.camerasService.index(this.query).subscribe(
      (camera: CameraModel) => {
        const markers: Marker[] = [];
        this.cameras = camera;
        console.log(this.cameras)
        this.cameras.forEach((camera) => {
          if (camera.lat && camera.lon) {
            const popup = L.popup({ maxWidth: 300 }).setLatLng([camera.lat, camera.lon]).setContent("<img style='width:300px' src='" + camera.url + "'>")
            const m = marker([camera.lat, camera.lon], {
              icon: icon({
                iconSize: [35, 51],
                iconAnchor: [13, 41],
                iconUrl: '/assets/img/icon-maker.png',
                iconRetinaUrl: '/assets/img/icon-maker.png',
              })
            }).bindPopup(popup).openPopup();
            m.addTo(map)
            markers.push(m)
            this.mapLeaflet.fitBounds(markers.map(i => [i.getLatLng().lat, i.getLatLng().lng]))
          }
        });
      },
      (error) => {
        console.log(error)
      }
    );
  }

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
  }
}
