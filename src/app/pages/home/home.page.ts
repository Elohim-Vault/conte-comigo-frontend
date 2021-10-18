import {Component, OnInit} from '@angular/core';

import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {AccountService} from '../../services/account/account.service';
import {TransactionService} from "../../services/transactions/transaction.service";
import {LoadingControllerService} from "../../services/loading/loading-controller-service";
import {Observable} from "rxjs";
import {GoalService} from "../../services/goals/goal.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public isPending: Observable<boolean>;
  public transactions: Array<any> = [];
  public account;
  public goal;
  constructor(private auth: AuthService,
              private router: Router,
              private transactionService: TransactionService,
              private loadingController: LoadingControllerService,
              private goalService: GoalService,
              private accountService: AccountService
  ) {}

  ngOnInit() {
    this.isPending = this.loadingController.isPending;
  }

  ionViewDidEnter() {
    this.transactionService.get(3, 1).subscribe((response) => {
      this.transactions = response['data'];
      this.loadingController.pending.next(false);
    });
    this.accountService.userAccount().subscribe((response) => this.account = response);
    this.goalService.get(1).subscribe((response) => {
      response = response['data'];
      this.goal = response[Object.keys(response).length - 1];
    });
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
