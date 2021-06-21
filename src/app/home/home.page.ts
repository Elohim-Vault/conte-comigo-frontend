import {Component, OnInit} from '@angular/core';

import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {AccountService} from '../services/account/account.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  private transactions;

  constructor(private auth: AuthService, private router: Router, private account: AccountService) {}

  ngOnInit() {
    this.account.lastTransactions().subscribe((response) => {
      this.transactions = response;
      console.log(response);
    });
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
