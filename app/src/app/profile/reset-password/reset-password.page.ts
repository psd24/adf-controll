import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  formResetPassword: FormGroup;
  userId: String;
  user: UserModel;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.usersService.getUser().subscribe((user: UserModel) =>{
      this.user = user;
      console.log(this.user)
      this.formResetPassword.controls['id'].setValue(this.user.id);
    } );
    this.formResetPassword = this.formBuilder.group({
      id: [''],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
    
  }

  submitForm() {
    this.usersService.resetPassword(this.formResetPassword.value).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error)
      }
    );
  }

}
