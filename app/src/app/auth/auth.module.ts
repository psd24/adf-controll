import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';
import { HomePageModule } from "../pages/home/home.module";
import { HomePage } from "../pages/home/home.page";
import { LoginPageModule } from "./login/login.module";
import { RegisterPageModule } from "./register/register.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    LoginPageModule,
    RegisterPageModule,
    HomePageModule
  ],
  declarations: []
})
export class AuthPageModule {}
