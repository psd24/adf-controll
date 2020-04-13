import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Login } from '../../interfaces/user.interface';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  forma: FormGroup;

  constructor( private  authService:  AuthService, private  router:  Router ) { }

  ngOnInit() {
  }

  login(forma: NgForm){

    console.log(forma);

    this.authService.login(forma.value).subscribe((res)=>{
      console.log(res);
    });
  }



}
