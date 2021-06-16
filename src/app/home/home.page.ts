import {Component, OnInit} from '@angular/core';

import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {GainService} from "../services/gain/gain.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  private transactions;

  constructor(private auth: AuthService, private router: Router, private gain: GainService) {}

  ngOnInit() {
    this.gain.getAll().subscribe((response) => {
      this.transactions = response['data'].slice(0, 4);
    });
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
