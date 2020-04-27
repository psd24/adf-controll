import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventnModel } from '../../models/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  organizationId: number;
  events;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.organizationId = this.router.getCurrentNavigation().extras.state.organizationId;
      }
    });
  }

  ngOnInit() {
    this.eventService.getEventsAdmin(this.organizationId).subscribe(
      (events: EventnModel) => {
        this.events = events;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
