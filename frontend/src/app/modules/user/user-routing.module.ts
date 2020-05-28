import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { CreateComponent } from "./create/create.component";

import { AuthGuard } from '../../helpers/auth.guard';

const routes: Routes = [
  {
    path: '', component: UserComponent, canActivate: [AuthGuard]
  },
  {
    path: 'create', component: CreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'create/:id', component: CreateComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
