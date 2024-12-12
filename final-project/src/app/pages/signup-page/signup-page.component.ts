import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserCreateModel } from 'src/app/interfaces/usercreate.interface';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  signupFormSubmitted = false;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      ]],
      confirmPassword: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    this.signupFormSubmitted = true;
    const usernameControl = this.signupForm.get('username');
    const emailControl = this.signupForm.get('email');
    const passwordControl = this.signupForm.get('password');
    const confirmPasswordControl = this.signupForm.get('confirmPassword');
  
    if (!this.signupForm) return;
    
    if (!passwordControl || !confirmPasswordControl || !emailControl || !usernameControl) {
      alert('please fill out all the required fields!');
      return;
    }
  
    if (passwordControl.value !== confirmPasswordControl.value) {
      alert('Passwords do not match.');
      return;
    }
    
    let user: UserCreateModel = {
      username: usernameControl.value,
      email: emailControl.value,
      password: passwordControl.value,
      confirmpassword: confirmPasswordControl.value
    };

    await this.authService.signUp(user);
  }
}




