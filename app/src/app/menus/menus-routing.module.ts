import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenusPage } from './menus.page';

const routes: Routes = [
  {
    path: '',
    component: MenusPage
  },
  {
    path: 'voluntary',
    loadChildren: () => import('../voluntary/voluntary.module').then( m => m.VoluntaryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenusPageRoutingModule {}
