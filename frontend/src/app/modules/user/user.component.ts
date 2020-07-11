import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from "../../models/user.model";
import { TelegramGroupModel } from "../../models/group-telegram.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: UserModel;
  public currentUser: UserModel;
  public telegramGroups: TelegramGroupModel;
  currentPage = 0;
  page: number;
  totalItems: number;
  itemsPerPage: number = 5;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let params = {page: 1, itemsPerPage: this.itemsPerPage}
    this.userService.getUsers(params).subscribe(
      (user: UserModel) => {
        this.users = user['results'];
        this.totalItems = user.total;
        this.itemsPerPage = user.page_total;
      },
      (error) => {
        console.log(error);
      }
    );

    this.getBotGroup();
  }

  getBotGroup() {
    this.userService.getBotGroup().subscribe(
      (telegramGroup: TelegramGroupModel) => {
        this.telegramGroups = telegramGroup;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  pageChanged(event: any): void {
    this.page = event;
    this.userService.getUsers(this.page).subscribe(
      (user: UserModel) => {
        this.users = user['results'];
        this.totalItems = user.total;
        this.itemsPerPage = this.itemsPerPage;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateUser(userId) {
    this.router.navigate(['/user/create', userId]);
  }

  botSatus(id, authorizeConnection) {
    let params = {id: id, authorizeConnection: authorizeConnection}
    this.userService.updateBotGroup(params).subscribe(
      (telegramGroup: TelegramGroupModel) => {
        this.getBotGroup();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sendEmail(id) {
  this.userService.sendEmail(id).subscribe(
    res => {
      console.log('send email');
    },
    error => {
      console.log(error)
    }
  );
  }

}
