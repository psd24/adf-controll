import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( private  authService:  AuthService, private  router:  Router ) { }

  ngOnInit() {
  }

  login(form){
    // this.authService.login(form.value).subscribe((res)=>{
    //   this.router.navigateByUrl('home');
    // });
  }

}
