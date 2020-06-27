import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

import { GoogleMapsModule } from '@angular/google-maps';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    GoogleMapsModule,
    LeafletModule
  ]
})
export class HomeModule { }
