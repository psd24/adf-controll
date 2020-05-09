import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  users: UserModel;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser()
  }

  ionViewWillEnter() {
    this.getUser()
  }

  getUser() {
    this.usersService.getUsers().subscribe(
      (user: UserModel) => {
        this.users = user;
        console.log(this.users);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addCamera() {
    this.router.navigate(['/user/create/'])
  }

  editUser(userId) {
    this.router.navigate(['/user/create/' + userId])
    console.log(userId)
  }

  removeUser(index, userId) {
    this.usersService.delete(userId).subscribe(
      (user: UserModel) => {
        console.log(user);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(userId)
  }

}
