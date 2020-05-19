import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  public organizationCount: number;
  public userCount: number;

  constructor(
    private organizationService: OrganizationService,
    private usersService: UserService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.organizationService.count().subscribe(
      (organizationCount) => {
        this.organizationCount = organizationCount;
      },
      (error) => {
        console.log(error);
      }
    );

    this.usersService.count().subscribe(
      (userCount) => {
        this.userCount = userCount;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
