import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Streamsite } from 'src/app/interfaces/streamsite.interface';

@Injectable({
  providedIn: 'root'
})
export class StreamingsiteService {

  constructor(private http: HttpClient) { }

  async getStreamsitesAsync(movieId: number): Promise<Streamsite[]> {
    const url = `https://localhost:7233/api/Movies/${movieId}/streamingsites`;

    try {
      const streamsites = await this.http.get<Streamsite[]>(url).toPromise();
      if(streamsites != null) return streamsites;
    } catch (error) {
      console.error('Error fetching streamingsites:', error);
    }
    return [];
  }

  async postStreamsiteAsync(movieId: number, streamsites: Streamsite[]): Promise<void> {
    const url = `https://localhost:7233/api/Movies/${movieId}/streamingsites`;

    try {
      await this.http.post(url, streamsites).toPromise();
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error posting streamingsites:', error);
    }
  }

}
