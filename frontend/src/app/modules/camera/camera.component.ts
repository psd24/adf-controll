import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CamerasService } from '../../services/cameras.service';
import { CameraModel } from '../../models/camera.model';
import { OrganizationModel } from '../../models/organization.model';
import { OrganizationService } from '../../services/organization.service';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxGalleryComponent, NgxGalleryImage, INgxGalleryOptions } from '@kolkov/ngx-gallery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  @ViewChild('gallery', { static: true }) gallery: NgxGalleryComponent;
  modalRef: BsModalRef;

  cameras: CameraModel[];
  organizations: OrganizationModel;
  timeStamp;
  subscriptionCamera;
  refreshImage: number = 50 * 1000;
  formSearchCamera: FormGroup;
  query: object;
  imageModel;
  nameImageModal: string;
  user = JSON.parse(localStorage.getItem('currentUser'));;

  public galleryOptions: INgxGalleryOptions[] = [
    {
      image: false,
      thumbnails: false,
      previewCloseOnClick: true,
      previewCloseOnEsc: true,
      previewZoom: true,
      previewArrows: false
    }
  ];
  public galleryImages: NgxGalleryImage[];

  constructor(
    private camerasService: CamerasService,
    private router: Router,
    private organizationService: OrganizationService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.organizationService.index().subscribe((organization: OrganizationModel) => this.organizations = organization);
    this.formSearchCamera = this.formBuilder.group({
      state: ['3'],
    })
    this.getCameras();
    this.timeStamp = (new Date()).getTime();
    this.subscriptionCamera = interval(this.refreshImage).subscribe(va => {
      this.timeStamp = (new Date()).getTime();
      this.getCameras();
    });
  }

  ngOnDestroy() {
    this.subscriptionCamera.unsubscribe();
  }

  getCameras() {
    console.log(this.user.role.name)
    if(this.user.role.name != 'superadmin' && this.user.role.name != 'admin') {
      this.query = { "relations": ["organization", "cameraType"], "where": [{ "state": 1 }] };
    }
    else {
      if (this.formSearchCamera.controls['state'].value === "3") {
        this.query = { "relations": ["organization", "cameraType"] };
      }
      else if (this.formSearchCamera.controls['state'].value) {
        this.query = { "relations": ["organization", "cameraType"], "where": [{ "state": this.formSearchCamera.controls['state'].value }] };
      }
      else {
        this.query = { "relations": ["organization", "cameraType"] };
      }
    }
    this.camerasService.index(this.query).subscribe(
      (cameras: CameraModel[]) => {
        this.cameras = cameras;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCamera(cameraId) {
    this.router.navigate(['/camera/create', cameraId]);
  }

  /*openGallery(template: TemplateRef<any>, image, name) {
    this.modalRef = this.modalService.show(template, {class: 'modal-xl modal-dialog-centered'});
    this.imageModel = image;
    this.nameImageModal = name;
  }*/

  // Create a gallery images when click in cv button
  openGallery(image: string) {
    console.log(image)
    this.galleryImages = [
      {
        small: image,
        medium: image,
        big: image
      }
    ]
  }

  openPreview() {
    setTimeout(() => {
      console.log(this.gallery)
      this.gallery.openPreview(0)
    }, 0);
  }
}
