import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginFailed: boolean = false;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

constructor(private router: Router,private fb: FormBuilder,public authService: AuthService) { }

login() {
  console.log("login values",this.loginForm.value);
  this.authService.getToken(this.loginForm.value).subscribe((data) => {
    if(this.authService.isLoggedin)
    {
       console.log("login success");
    }
    else
    {
      this.isLoginFailed = true;
      window.alert("Login failed, please check your username and password");
    }

  });
}
}
