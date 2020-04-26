import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  organizationId: number;  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.organizationId = this.router.getCurrentNavigation().extras.state.organizationId;
      }
    });
  }

  ngOnInit() {
    console.log(this.organizationId);
  }

}
