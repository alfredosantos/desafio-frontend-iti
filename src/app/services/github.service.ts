import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private baseUrl: string = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${username}`);
  }

  getUserRepos(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${username}/repos`);
  }
}
