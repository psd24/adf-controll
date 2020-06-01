import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraRoutingModule } from './camera-routing.module';
import { CameraComponent } from './camera.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { InfoComponent } from './info/info.component';
import { NgFallimgModule } from 'ng-fallimg';


@NgModule({
  declarations: [CameraComponent, CreateComponent, InfoComponent],
  imports: [
    CommonModule,
    CameraRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    NgFallimgModule

  ]
})
export class CameraModule { }
