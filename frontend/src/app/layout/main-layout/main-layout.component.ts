import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  user;
  toggled = false;

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

  onToggle() {
    this.toggled = !this.toggled;
  }

}
