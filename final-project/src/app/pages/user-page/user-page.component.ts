import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie.interface';
import { MovieService } from 'src/app/services/movie-service/movie.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  searchQuery = '';
  videoUrl: string | undefined;
  watchlist: Movie[] = [];
  seenlist: Movie[] = [];
  favourites: Movie[] = [];


  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private movieService: MovieService) { }

  async ngOnInit(): Promise<void> {
    this.watchlist = await this.movieService.getWatchlistMoviesAsync();
    this.seenlist = await this.movieService.getSeenlistMoviesAsync();
    this.favourites = await this.movieService.getFavouriteMoviesAsync();
  }

  gotoMovie(id: number): void {
    this.router.navigate(['detail', id]);
  }

}
