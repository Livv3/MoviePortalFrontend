import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/app/interfaces/movie.interface';
import { MovieService } from 'src/app/services/movie-service/movie.service';

@Component({
  selector: 'app-movielist-page',
  templateUrl: './movielist-page.component.html',
  styleUrls: ['./movielist-page.component.scss']
})
export class MovielistPageComponent implements OnInit {

  allMovies:  Movie[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      let searchQuery = params['movie-search'];
      this. allMovies = await this.movieService.getMoviesBySearchQueryAsync(searchQuery);
    });
  }

  gotoMovie(id: number): void {
    this.router.navigate(['detail', id]);
  }
}
