import { Component } from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.auth.getTokenLocal().then((token)  => {
      if(!token) {
        this.router.navigate(['/login']);
      }
    });
  }
}
