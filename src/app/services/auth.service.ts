import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import { environment } from '../../environments/environment';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private options;

  constructor(private http: HttpClient) {

    this.getTokenLocal().then((token) => {
      this.options = { headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
      })};
    });

  }

  signUp(user) {
    return this.http.post(`${environment.baseUrl}/auth/register`, user);
  }

  signIn(user) {
    return this.http.post(`${environment.baseUrl}/auth/login`, user);
  }

  async signOut() {
    await Storage.remove({key: 'token'});
  }

  async setNameLocal(name) {
   await Storage.set({
     key: 'name',
     value: name
   });
  }

  async getNameLocal() {
    const {value} = await Storage.get({key: 'name'});
    return value;
  }

  async setTokenLocal(token) {
    await Storage.set({
      key: 'token',
      value: token
    });
  }

  async getTokenLocal() {
    const {value} = await Storage.get({key: 'token'});
    return value;
  }

  getAllGains(){
    return this.http.get(`${environment.baseUrl}/gains`, this.options);
  }
}


