import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username: string | null = null;
  genres: string[] = ['action','adventure','thriller','horror','animation','fantasy','family','comedy','romance'];
  admin: boolean = false;
  

  constructor(private router: Router, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.username = this.authService.getCurrentUserName();
    this.admin = await this.authService.isAdmin();
  }

  logout(): void{
    this.authService.logout();
  }

  hasUserAndToken(): boolean{
     if (this.authService.getCurrentToken() && this.authService.getCurrentUser()) return true;
     return false;
  }

  genreSearch(menuItem: string): void{
    this.router.navigate(['movies', menuItem]);
  }

  onSubmit(form: NgForm) {
    this.router.navigate(['search', form.value.search]);
  }
}