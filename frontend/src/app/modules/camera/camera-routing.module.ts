import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameraComponent } from './camera.component';
import { AuthGuard } from '../../helpers/auth.guard';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';


const routes: Routes = [
  {
    path: '', component: CameraComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CameraRoutingModule { }
