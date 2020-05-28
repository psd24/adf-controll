import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from "../../models/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: UserModel;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
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
    console.log(userId)
  }

}
