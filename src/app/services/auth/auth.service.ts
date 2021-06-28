import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Storage} from '@capacitor/storage';
import {BehaviorSubject} from "rxjs";

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

  getTokenLocal() {
    return Storage.get({key: 'token'});
  }


}


