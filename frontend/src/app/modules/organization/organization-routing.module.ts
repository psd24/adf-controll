import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationComponent } from "./organization.component";
import { AuthGuard } from '../../helpers/auth.guard';
import { CreateComponent } from "./create/create.component";

const routes: Routes = [
  {
    path: '', component: OrganizationComponent, canActivate: [AuthGuard]
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
export class OrganizationRoutingModule { }
