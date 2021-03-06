import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraRoutingModule } from './camera-routing.module';
import { CameraComponent } from './camera.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { InfoComponent } from './info/info.component';
import { NgFallimgModule } from 'ng-fallimg';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [CameraComponent, CreateComponent, InfoComponent],
  imports: [
    CommonModule,
    CameraRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    NgFallimgModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    ChartsModule
  ]
})
export class CameraModule { }
