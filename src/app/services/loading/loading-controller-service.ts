import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingControllerService {
  public pending = new BehaviorSubject<boolean>(true);
  constructor() { }

  get isPending() {
    return this.pending.asObservable();
  }
}
