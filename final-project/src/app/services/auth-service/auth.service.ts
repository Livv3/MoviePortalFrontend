import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLoginModel } from 'src/app/interfaces/userlogin.interface';
import { UserCreateModel } from 'src/app/interfaces/usercreate.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  getCurrentUser(): string | null {
    return localStorage.getItem('user');
  }

  getCurrentToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUserName(): string | null {
    let userData = this.getCurrentUser();
    let username;

    if (userData) {
      try {
        const userObject = JSON.parse(userData);
        username = userObject.userName;
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
    return username;
  }

  async getCurrentUserRoles(): Promise<any[] | undefined> {
    let token = this.getCurrentToken();
    const response = await this.http.get<any[]>(`https://localhost:7233/api/login/roles?token=${token}`).toPromise();
    console.log("token: " + token);
    console.log("user role:" + response);
    return response;
  }

  async login(user: UserLoginModel): Promise<void>{
    await this.http.post('https://localhost:7233/api/Login', user)
    .subscribe(
      (response) => {
        const responseObject = JSON.parse(JSON.stringify(response));

        const token = responseObject.token;
        const user = responseObject.user;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setTimeout(() => {
          window.location.reload();
        }, 1000);
        alert('Logged in succesfully:)');
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.error('Error logging in user:', error);
        alert('Wrong password or username!');
      }
    );
  }

  logout(): void{
    localStorage.clear();
    alert('Logged out succesfully!');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  async signUp(user: UserCreateModel): Promise<void>{

    this.http.post('https://localhost:7233/api/User', user)
    .subscribe(
      (response) => {
        alert('User Created succesfully, you can login now');
        this.router.navigateByUrl('login');
      },
      (error) => {
        console.error('Error creating user:', error);
        alert('Username or e-mail is already being used!');
      }
    );
  }
  
  async isAdmin(): Promise<boolean> {
    let roles = await this.getCurrentUserRoles();
    if(roles && roles.includes("Admin")) return true;
    return false;
  }

}
