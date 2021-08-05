import {Component, OnInit} from '@angular/core';

import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {AccountService} from '../services/account/account.service';
import {TransactionService} from "../services/transactions/transaction.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  showLoader: boolean;
  public transactions: Array<any> = [];
  constructor(private auth: AuthService, private router: Router, private transactionService: TransactionService) {}

  ngOnInit() {
    this.showProgressBar();
    this.transactionService.get(5).subscribe((response) => {
      this.transactions = response['data'];
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

    });
  }
}
