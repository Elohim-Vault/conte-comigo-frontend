import {Component, OnInit} from '@angular/core';

import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.getAllGains().subscribe((response) => {
      console.log(response);
    });
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
