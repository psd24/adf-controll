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
  currentPage = 0;
  page: number;
  totalItems: number;
  itemsPerPage: number = 3;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let params = {page: 1, itemsPerPage: this.itemsPerPage}
    this.userService.getUsers(params).subscribe(
      (user: UserModel) => {
        console.log(user);
        this.users = user['results'];
        this.totalItems = user.total;
        this.itemsPerPage = user.page_total;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  pageChanged(event: any): void {
    this.page = event;
    console.log(this.page)
    this.userService.getUsers(this.page).subscribe(
      (user: UserModel) => {
        this.users = user['results'];
        this.totalItems = user.total;
        this.itemsPerPage = this.itemsPerPage;
      }
    );
  }

  updateUser(userId) {
    this.router.navigate(['/user/create', userId]);
  }

}
