import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: `camera`, component: MainLayoutComponent, loadChildren: () =>
      import('./modules/camera/camera.module').then(m => m.CameraModule),
      
  },
  {
    path: `map`, component: MainLayoutComponent, loadChildren: () =>
      import('./modules/map/map.module').then(m => m.MapModule),
      
  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
