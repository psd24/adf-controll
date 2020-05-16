import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraRoutingModule } from './camera-routing.module';
import { CameraComponent } from './camera.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CameraComponent, CreateComponent],
  imports: [
    CommonModule,
    CameraRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CameraModule { }
