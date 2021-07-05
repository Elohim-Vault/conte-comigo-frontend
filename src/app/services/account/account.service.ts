import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private options;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.token}`
      })
    };
  }

  lastTransactions() {
    return this.http.get(`${environment.baseUrl}/transactions`, this.options);
  }

  userAccount() {
    return this.http.get(`${environment.baseUrl}/accounts`, this.options);
  }
}


