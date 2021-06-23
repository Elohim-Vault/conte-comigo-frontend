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
  transactions;
  showLoader: boolean;

  constructor(private auth: AuthService, private router: Router, private account: AccountService) {}

  ngOnInit() {
    this.showProgressBar();
    this.account.lastTransactions().subscribe((response) => {
      this.transactions = response;
      this.hideProgressBar();
    });
  }

  public showProgressBar() {
    this.showLoader = true;
  }

  public hideProgressBar() {
    this.showLoader = false;
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
