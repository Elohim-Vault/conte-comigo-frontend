import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private options;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.options = { headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.token}`
    })};
  }

  public get(quantity: number, page: number, month?: string) {
    if (month === undefined) {
      const actualMonth = new Date().getMonth();
      month = `${actualMonth + 1}`;
    }
    return this.http.get(`${environment.baseUrl}/transactions?quantity=${quantity}&page=${page}&month=${month}`, this.options);
  }

  public create(transaction) {
    return this.http.post(`${environment.baseUrl}/transactions`, transaction, this.options);
  }
}
