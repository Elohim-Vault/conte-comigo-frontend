import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private options: { headers: HttpHeaders };

  constructor(private http: HttpClient, private auth: AuthService) {
    this.options = { headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.token}`
      })};
  }

  public create(goal) {
    return this.http.post(`${environment.baseUrl}/goals`, goal, this.options);
  }
}
