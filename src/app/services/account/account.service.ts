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

  userAccount() {
    return this.http.get(`${environment.baseUrl}/accounts`, this.options);
  }

  financialData(month?: string) {
    if (month === undefined) {
      const actualMonth = new Date().getMonth();
      month = `${actualMonth + 1}`;
    }
    return this.http.get(`${environment.baseUrl}/accounts/financial?month=${month}`, this.options);
  }
}


