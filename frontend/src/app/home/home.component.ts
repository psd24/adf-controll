import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { OrganizationService } from '../services/organization.service';
import { CamerasService } from '../services/cameras.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  public organizationCount: number;
  public userCount: number;
  public cameraStateCount;

  constructor(
    private organizationService: OrganizationService,
    private usersService: UserService,
    private camerasService: CamerasService
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

    this.camerasService.countEstate().subscribe(
      (cameraStateCount) => {
        this.cameraStateCount = cameraStateCount;
        console.log(this.cameraStateCount)
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
