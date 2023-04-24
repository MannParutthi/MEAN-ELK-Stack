import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  login(username: String, password: String): Observable<any> {
    let uri = "login";
    return this.http.post(`${this.baseUrl}/${uri}`, {username, password}) as Observable<any>;
  }
}
