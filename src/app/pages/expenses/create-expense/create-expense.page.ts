import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TransactionService} from '../../../services/transactions/transaction.service';
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {LoadingControllerService} from "../../../services/loading/loading-controller-service";

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.page.html',
  styleUrls: ['./create-expense.page.scss'],
})
export class CreateExpensePage implements OnInit {
  public isChecked: boolean;
  public isPending: Observable<boolean>;
  public expense = {
    description: '',
    recurrence_date: '',
    value: 0,
    account: 'Sua conta',
    status: false
  };

  constructor(private transactionService: TransactionService,
              private router: Router,
              private location: Location,
              private loadingController: LoadingControllerService) {
    this.isChecked = true;
  }

  ngOnInit() {

  }

  public changeRecurrence() {
    document.getElementById('recurrenceDate').setAttribute('disabled', String(this.isChecked));
    this.expense.recurrence_date = '';
  }

  create() {
    this.expense.value *= -1;
    this.isPending = this.loadingController.isPending;
    this.transactionService.create(this.expense).subscribe(
      () =>{
        this.loadingController.pending.next(false);
        this.router.navigate(['/transactions']);
      },
      err => {
        this.loadingController.pending.next(false);
        console.error(err.message);
      }
    );
    this.loadingController.pending.next(true);
  }

  back() {
    this.location.back();
  }
}
