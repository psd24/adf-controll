import { Component, OnInit } from '@angular/core';
import { CamerasService } from '../services/cameras.service';
import { RoleModel } from '../models/role.model';
import { interval, Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  role: RoleModel;
  subscriptionCamera;
  cameras : [] = [];
  timeStamp;
  refreshImage: number = 50*1000;
  menuFilterState: boolean = false;
  formSearchCamera: FormGroup;
  query:object

  constructor(private _cs: CamerasService, private router: Router, public modalController: ModalController, private formBuilder: FormBuilder,) { }

  ngOnInit() {
    const getRole: string = localStorage.getItem('role');
    this.role = JSON.parse(getRole)
    this.formSearchCamera = this.formBuilder.group({
      state: [''],
    })
    this.getCameras();
    this.timeStamp = (new Date()).getTime();
    this.subscriptionCamera = interval(this.refreshImage).subscribe(va =>{
      this.timeStamp = (new Date()).getTime();
      this.getCameras();
    })
  }

  ionViewWillEnter() {
    this.getCameras();
  }

  ngOnDestroy(){
    this.subscriptionCamera.unsubscribe();
  }

  getCameras(){
    this.menuFilterState = false
    if(this.formSearchCamera.controls['state'].value){
      this.query  = {"relations": ["organization", "cameraType"], "where": [{ "state": this.formSearchCamera.controls['state'].value }]};
    } 
    else{
      this.query  = {"relations": ["organization", "cameraType"]};
    }

    this._cs.index(this.query).subscribe(
      (cameras) => {
        this.cameras = cameras;
        console.log(this.cameras)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editCamera(cameraId) {
    this.router.navigate(['/camera/create/' + cameraId])
  }

  infoCamera(cameraId) {
    this.router.navigate(['/camera/info/' + cameraId])
  }

  removeCamera(cameraId) {
    this._cs.delete(cameraId).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  menuFilter() {
    if(this.menuFilterState == false) this.menuFilterState = true
    else this.menuFilterState = false;
  }

  addCamera() {
    this.router.navigate(['/camera/create']);
  }
}
