import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserLoginModel } from 'src/app/interfaces/userlogin.interface';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmitLoginForm() {
    const usernameControl = this.signupForm.get('username');
    const passwordControl = this.signupForm.get('password');

    if(usernameControl == null || passwordControl == null) return;

    let user: UserLoginModel = {
      userName: usernameControl.value,
      password: passwordControl.value
    };

    await this.authService.login(user);

  }
}
