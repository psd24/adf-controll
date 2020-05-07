import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraTypePageRoutingModule } from './camera-type-routing.module';

import { CameraTypePage } from './camera-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraTypePageRoutingModule
  ],
  declarations: [CameraTypePage]
})
export class CameraTypePageModule {}
