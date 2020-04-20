import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoluntaryPageRoutingModule } from './voluntary-routing.module';

import { VoluntaryPage } from './voluntary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoluntaryPageRoutingModule
  ],
  declarations: [VoluntaryPage]
})
export class VoluntaryPageModule {}
