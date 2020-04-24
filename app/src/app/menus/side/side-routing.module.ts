import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidePage } from './side.page';

const routes: Routes = [
  {
    path: '',
    component: SidePage
  },
  {
    path: 'voluntary',
    loadChildren: () => import('../../voluntary/voluntary.module').then( m => m.VoluntaryPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../../admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: '**', pathMatch:'full', redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidePageRoutingModule {}
