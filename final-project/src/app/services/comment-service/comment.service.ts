import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment.interface';
import { AuthService } from '../auth-service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  
  async getCommentsAsync(movieId: number): Promise<Comment[]> {
    const url = `https://localhost:7233/api/Movies/${movieId}/comments`;

    try {
      const comments = await this.http.get<Comment[]>(url).toPromise();
      if(comments != null) return comments;
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    return [];
  }

  async postCommentsAsync(movieId: number, comment: Comment): Promise<void> {
    const url = `https://localhost:7233/api/Movies/${movieId}/comments`;
    
    try {
      const response = await this.http.post(url, comment).toPromise();
      console.log('POST Request Response:', response);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error posting comments:', error);
    }
  }
}
