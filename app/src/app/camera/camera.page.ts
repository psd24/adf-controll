import { Component, OnInit } from '@angular/core';
import { CamerasService } from '../services/cameras.service';
import { RoleModel } from '../models/role.model';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  public role: RoleModel;
  imageRemote = "http://185.73.168.32:1220/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=pvidiba&pwd=incendis19";

  cameras : [] = [];

  constructor(private _cs: CamerasService) { }

  ngOnInit() {
    const getRole: string = localStorage.getItem('role');
    this.role = JSON.parse(getRole)

    this.getCameras();
  } 

  getCameras(){
    this._cs.index().subscribe(
      (cameras) => {
        this.cameras = cameras;
        console.log(this.cameras)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async imgReload(imageRemote){
    while (true) {
      setTimeout(() => {
        imageRemote = imageRemote;
      }, 5000);
    }
  }

}
