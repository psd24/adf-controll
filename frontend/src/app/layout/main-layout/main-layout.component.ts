import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  user;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) { }
  

  ngOnInit(): void {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.user = users;
    });
  }

  logout() {
    this.authenticationService.logout();
  }


}
