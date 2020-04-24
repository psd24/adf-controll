import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolePage } from './role.page';

const routes: Routes = [
  {
    path: '',
    component: RolePage
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolePageRoutingModule {}
