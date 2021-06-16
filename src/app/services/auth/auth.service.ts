import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import { environment } from '../../../environments/environment';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public name;
  public token;
  private options;

  constructor(private http: HttpClient) {
    this.getTokenLocal().then((token) => {
      console.log(token);
      this.token = token;
    });

    this.getNameLocal().then((name) => {
      this.name = name;
    });
  }

  async signUp(user) {
    this.http.post(`${environment.baseUrl}/auth/register`, user).subscribe((response) => {
      this.setNameLocal(response['user'].name);
      this.setTokenLocal(response['token']);
    });
  }

  async signIn(user) {
    this.http.post(`${environment.baseUrl}/auth/login`, user).subscribe((response) => {
      this.setTokenLocal(response['token']);
      this.setNameLocal(response['user'].name);
    });
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


}


