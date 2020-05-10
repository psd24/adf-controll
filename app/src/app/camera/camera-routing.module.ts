import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CameraPage } from './camera.page';

const routes: Routes = [
  {
    path: '',
    component: CameraPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'create/:id',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'info/:id',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraPageRoutingModule {}
