import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  organizationId: number;  

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
    let filter = "filter: {relations: ['organization'],where:{organization: {id:1}}}";
    this.eventService.getEventsAdmin(this.organizationId).subscribe(
      (events) => {
        console.log(events);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log('event ', this.organizationId)
  }

}
