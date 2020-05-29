import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from "../../models/user.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: UserModel;
  public currentUser: UserModel;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUsers().subscribe(
      (user: UserModel) => {
        this.users = user;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateUser(userId) {
    this.router.navigate(['/user/create', userId]);
  }

}
