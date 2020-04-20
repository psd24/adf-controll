import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoluntaryPage } from './voluntary.page';

const routes: Routes = [
  {
    path: '',
    component: VoluntaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoluntaryPageRoutingModule {}
