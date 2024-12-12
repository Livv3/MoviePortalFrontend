import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { Movie } from 'src/app/interfaces/movie.interface';


@Component({
  selector: 'app-movielistbygenre-page',
  templateUrl: './movielistbygenre-page.component.html',
  styleUrls: ['./movielistbygenre-page.component.scss']
})
export class MovielistbygenrePageComponent implements OnInit { 
  allMovies:  Movie[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      let genre = params['genre'];
      this.allMovies = await this.movieService.getMoviesByGenreQueryAsync(genre);
    });
  }

  gotoMovie(id: number): void {
    this.router.navigate(['detail', id]);
  }
}
