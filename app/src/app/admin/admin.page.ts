import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  events: [] = [];

  constructor( private _es: EventService, private auth: AuthService ) { }

  ngOnInit() {

    // this.getEvents();
    
  }

  getEvents(){
    this._es.getEvents().subscribe( events => {
      console.log(events);
      
      // return events;
    }, err => {
      console.log(err);
      
    });
  }

  logout(){
    this.auth.logout();
  }

}
