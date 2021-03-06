import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CameraTypePage } from './camera-type.page';

const routes: Routes = [
  {
    path: '',
    component: CameraTypePage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'create/:id',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraTypePageRoutingModule {}
