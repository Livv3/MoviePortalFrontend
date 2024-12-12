import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie.interface';
import { Genre } from 'src/app/interfaces/genre.interface';
import { Comment } from 'src/app/interfaces/comment.interface';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { NgForm } from '@angular/forms';
import { Streamsite } from 'src/app/interfaces/streamsite.interface';
import { StreamingsiteService } from 'src/app/services/streamingsite-service/streamingsite.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  movieId: number = 0;
  movie: Movie = { id: 0, title: '', description: '', year: 0, userRating: 0, url: '', trailerUrl: '', runtime: 0, tagline: ''};
  genres: Genre[] = [];
  streamsites: Streamsite[] = [];
  comments: Comment[] = [];
  admin: boolean = false;
  user: boolean = false;
  favourited: boolean = false;
  watchlisted: boolean = false;
  seen: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private movieService: MovieService, private commentService: CommentService, private authService: AuthService, private streamingsiteService: StreamingsiteService) { }

  async ngOnInit(): Promise<void> {
    this.movieId = <number>this.route.snapshot.params['id'];
    this.movie = await this.movieService.getMovieByIdAsync(this.movieId)
    this.genres = await this.movieService.getGenresAsync(this.movieId);
    this.streamsites = await this.streamingsiteService.getStreamsitesAsync(this.movieId);
    this.comments = await this.commentService.getCommentsAsync(this.movieId);
    this.admin = await this.authService.isAdmin();
    this.hasUserAndToken();
  }

  hasUserAndToken(): boolean {
    if (this.authService.getCurrentToken() && this.authService.getCurrentUser()){
      if(!this.admin) this.user = true;
      return true;
    } 
    return false;
 }

 streamsitesExist(): boolean {
    if(this.streamsites.length > 0) return true;
    return false;
 }

 async onSubmitComment(form: NgForm): Promise<void> {
  let comment: Comment = {
    username: '',
    text: ''
  }
  let name = this.authService.getCurrentUserName();
    comment.username = "GregDoesNotExistInDataBase";
    comment.text = form.value.text
    await this.commentService.postCommentsAsync(this.movieId, comment);
 }

 async onSubmitStreamsite(form: NgForm): Promise<void> {
  let streamsites: Streamsite[] = [];
  let name = form.value.name;
  if (name !== null) {
    const newSite: Streamsite = {
      id: 0,
      name: name
    };
    streamsites.push(newSite);
  }
    await this.streamingsiteService.postStreamsiteAsync(this.movieId, streamsites);
 }

 async addToSeen(): Promise<void> {
    await this.movieService.postSeenMovieAsync(this.authService.getCurrentUserName(), this.movieId);
    this.seen = true;
 }

 async addToFav(): Promise<void> {
  await this.movieService.postFavMovieAsync(this.authService.getCurrentUserName(), this.movieId);
  this.favourited = true;
 }

 async addToWatchlist(): Promise<void> {
  await this.movieService.postWatchlistMovieAsync(this.authService.getCurrentUserName(), this.movieId);
  this.watchlisted = true;
 }

}
