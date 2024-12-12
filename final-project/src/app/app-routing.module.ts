import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { MovielistPageComponent } from './pages/movielist-page/movielist-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { MovielistbygenrePageComponent } from './pages/movielistbygenre-page/movielistbygenre-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'search/:movie-search', component: MovielistPageComponent },
  { path: 'movies/:genre', component: MovielistbygenrePageComponent },
  { path: 'detail/:id', component: DetailPageComponent },
  { path: 'user', component: UserPageComponent },
  { path: '**', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
