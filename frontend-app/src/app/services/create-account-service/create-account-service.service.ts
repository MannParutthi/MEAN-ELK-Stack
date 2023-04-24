import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateAccountModel } from './create-account-service.model';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {
  private baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  createAccount(userDetails: CreateAccountModel): Observable<any> {
    let uri = "createAccount";
    return this.http.post(`${this.baseUrl}/${uri}`, {userDetails}) as Observable<any>;
  }
}
