import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.interface';
import { Genre } from 'src/app/interfaces/genre.interface';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  async getMovieByIdAsync(id: number): Promise<Movie> {
    try {
      const response = await this.http.get<Movie>(`https://localhost:7233/api/Movies/${id}`).toPromise();
      console.log('movie:', response);
      if(response) return response;
    } catch (error) {
      console.error('Error occurred while retrieving movie:', error);
    }
    let movie: Movie = {
      id: 0,
      title: '',
      description: '',
      year: 0,
      userRating: 0,
      url: '',
      trailerUrl: '',
      runtime: 0,
      tagline: ''
    };
    return movie;
  }

  async getGenresAsync(movieId: number): Promise<Genre[]> {
    const url = `https://localhost:7233/api/Movies/${movieId}/genres`;
    
    try {
      const genres = await this.http.get<Genre[]>(url).toPromise();
      if(genres != null) return genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
    return [];
  }

  async getPopularMoviesAsync(): Promise<Movie[]> {
    let movies: Movie[] = [];
    const url = 'https://localhost:7233/api/Popular';

    try {
      const response = await this.http.get<any[]>(url).toPromise();

      if (response) {
        movies = response;
        console.log(movies);
      } else {
        console.error('Response is empty or not as expected');
      }
    } catch (error) {
      console.error('Error occurred while retrieving movies:', error);
    }
    return movies;
  }

  async getMoviesBySearchQueryAsync(searchQuery: string): Promise<Movie[]> {
    let allMovies: Movie[] = [];
    const url = `https://localhost:7233/api/search?query=${searchQuery}`;

    if (searchQuery && searchQuery.trim() !== '') {
      try {
        const response = await this.http.get<any[]>(url).toPromise();
        if(response){
          allMovies = response;
          console.log(allMovies);
        }
      } catch (error) {
        console.error('Error occurred while retrieving movies:', error);
      }
    } else {
      await this.getPopularMoviesAsync();
    }
    return allMovies;
  }

  async getMoviesByGenreQueryAsync(genre: string): Promise<Movie[]> {
    let allMovies: Movie[] = [];
    const url = `https://localhost:7233/api/genre?genre=${genre}`;

    if (genre) {
      try {
        const response = await this.http.get<any[]>(url).toPromise();
        if(response){
          allMovies = response;
          console.log(allMovies);
        }
      } catch (error) {
        console.error('Error occurred while retrieving movies:', error);
      }
    } else {
      await this.getPopularMoviesAsync();
    }
    return allMovies;
  }

  async getWatchlistMoviesAsync(): Promise<Movie[]> {
    let movies: Movie[] = [];
    let username = this.authService.getCurrentUserName();
    const url = `https://localhost:7233/api/usermovies/watchlist?username=${username}`;

    try {
      const response = await this.http.get<any[]>(url).toPromise();

      if (response) {
        movies = response;
        console.log(movies);
      } else {
        console.error('Response is empty or not as expected');
      }
    } catch (error) {
      console.error('Error occurred while retrieving movies:', error);
    }
    return movies;
  }

  async getSeenlistMoviesAsync(): Promise<Movie[]> {
    let movies: Movie[] = [];
    let username = this.authService.getCurrentUserName();
    const url = `https://localhost:7233/api/usermovies/seenlist?username=${username}`;

    try {
      const response = await this.http.get<any[]>(url).toPromise();

      if (response) {
        movies = response;
        console.log(movies);
      } else {
        console.error('Response is empty or not as expected');
      }
    } catch (error) {
      console.error('Error occurred while retrieving movies:', error);
    }
    return movies;
  }

  async getFavouriteMoviesAsync(): Promise<Movie[]> {
    let movies: Movie[] = [];
    let username = this.authService.getCurrentUserName();
    const url = `https://localhost:7233/api/usermovies/favourites?username=${username}`;

    try {
      const response = await this.http.get<any[]>(url).toPromise();

      if (response) {
        movies = response;
        console.log(movies);
      } else {
        console.error('Response is empty or not as expected');
      }
    } catch (error) {
      console.error('Error occurred while retrieving movies:', error);
    }
    return movies;
  }

  async postWatchlistMovieAsync(username: any, movieId: number): Promise<void> {
    const url = `https://localhost:7233/api/usermovies/watchlist/add?username=${username}&movieId=${movieId}`;
    try {
      const response = await this.http.post<any[]>(url, {}).toPromise();

      if (response) {
        console.log(response.values);
      } else {
        console.error('Response is empty or not as expected');
      }
    } catch (error) {
      console.error('Error occurred while posting watchlist movie:', error);
    }
  }

  async postSeenMovieAsync(username: any, movieId: number): Promise<void> {
    const url = `https://localhost:7233/api/usermovies/seenlist/add?username=${username}&movieId=${movieId}`;

    try {
      const response = await this.http.post<any[]>(url, {}).toPromise();

      if (response) {
        console.log(response.values);
      } else {
        console.error('Response is empty or not as expected');
      }
    } catch (error) {
      console.error('Error occurred while posting watchlist movie:', error);
    }
  }

  async postFavMovieAsync(username: any, movieId: number): Promise<void> {
    const url = `https://localhost:7233/api/usermovies/favourites/add?username=${username}&movieId=${movieId}`;

    try {
      const response = await this.http.post<any[]>(url, {}).toPromise();

      if (response) {
        console.log(response.values);
      } else {
        console.error('Response is empty or not as expected');
      }
    } catch (error) {
      console.error('Error occurred while posting watchlist movie:', error);
    }
  }


}
