import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RoleModel } from './models/role.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public selectedIndex = 0;
  role: RoleModel;
  /*public appPages = [
    {
      title: 'Inicio',
      url: '/home',
    },
    {
      title: 'Role',
      url: '/role',
    },
    {
      title: 'Organización',
      url: '/organization',
    },
    {
      title: 'Camera',
      url: '/camera',
    },
    {
      title: 'Administrar',
      url: '/admin',
    }
  ];*/

  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
    },
    {
      title: 'Role',
      url: '/role',
    },
    {
      title: 'Organización',
      url: '/organization',
    },
    {
      title: 'Camera',
      url: '/camera',
    },
    {
      title: 'Tipo de camara',
      url: '/camera-type',
    },
    {
      title: 'Usuaris',
      url: '/user',
    }
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.role = JSON.parse(localStorage.getItem('role'));
    console.log(this.role)
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
