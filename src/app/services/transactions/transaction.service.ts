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

  public get(quantity: number) {
    return this.http.get(`${environment.baseUrl}/transactions?quantity=${quantity}`, this.options);
  }

  public create(transaction) {
    return this.http.post(`${environment.baseUrl}/transactions`, transaction, this.options);
  }
}
