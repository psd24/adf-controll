import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'voluntary',
    loadChildren: () => import('./voluntary/voluntary.module').then( m => m.VoluntaryPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'role',
    loadChildren: () => import('./role/role.module').then( m => m.RolePageModule)
  },
  {
    path: 'organization',
    loadChildren: () => import('./organization/organization.module').then( m => m.OrganizationPageModule)
  },
  {
    path: 'camera-type',
    loadChildren: () => import('./camera-type/camera-type.module').then( m => m.CameraTypePageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path:'**',pathMatch:'full', redirectTo:'home'
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
