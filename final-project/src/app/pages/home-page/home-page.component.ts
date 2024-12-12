import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { Movie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  searchQuery = '';
  videoUrl: string | undefined;
  allMovies: Movie[] = [];
  watchlist: Movie[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private movieService: MovieService) { }

  async ngOnInit(): Promise<void> {
    this.allMovies = await this.movieService.getPopularMoviesAsync();
    this.watchlist = await this.movieService.getWatchlistMoviesAsync();
  }

  gotoMovie(id: number): void {
    this.router.navigate(['detail', id]);
  }

}
