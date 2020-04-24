import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-side',
  templateUrl: './side.page.html',
  styleUrls: ['./side.page.scss'],
})
export class SidePage implements OnInit {

  constructor(private menu: MenuController) {
   }

  ngOnInit() {
    this.menu.close();

  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
