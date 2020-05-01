import { Component, OnInit } from '@angular/core';
import { CamerasService } from '../services/cameras.service';
import { RoleModel } from '../models/role.model';
import { interval, Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  public role: RoleModel;
  imageRemote = "http://185.73.168.32:5557/cgi-bin/snapshot.cgi?chn=0&u=admin&p=papatango03";
  subscriptionCamera;
  cameras : [] = [];
  timeStamp;
  refreshImage: number = 900000;

  constructor(private _cs: CamerasService, private router: Router) { }

  ngOnInit() {
    const getRole: string = localStorage.getItem('role');
    this.role = JSON.parse(getRole)
    this.getCameras();
    this.timeStamp = (new Date()).getTime();
    this.subscriptionCamera = interval(this.refreshImage).subscribe(va =>{
      this.timeStamp = (new Date()).getTime();
      this.getCameras();
    })
  }

  ngOnDestroy(){
    this.subscriptionCamera.unsubscribe();
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
}
