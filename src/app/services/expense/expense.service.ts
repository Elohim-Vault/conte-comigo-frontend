import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private options: { headers: HttpHeaders };

  constructor(private http: HttpClient, private auth: AuthService) {
    this.options = { headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.token}`
      })};
  }

  public getAll() {
    return this.http.get(`${environment.baseUrl}/expenses`, this.options);
  }
  public create(expense) {
    return this.http.post(`${environment.baseUrl}/expenses`, expense, this.options);
  }
}
