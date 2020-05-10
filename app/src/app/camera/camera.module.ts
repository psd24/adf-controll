import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

import { IonicModule } from '@ionic/angular';

import { CameraPageRoutingModule } from './camera-routing.module';

import { CameraPage } from './camera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CameraPageRoutingModule,
    NgxIonicImageViewerModule
  ],
  declarations: [CameraPage]
})
export class CameraPageModule {}
