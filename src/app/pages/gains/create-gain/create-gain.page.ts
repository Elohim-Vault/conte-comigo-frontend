import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TransactionService} from '../../../services/transactions/transaction.service';
import {Location} from '@angular/common';
import {LoadingControllerService} from '../../../services/loading/loading-controller-service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-gain',
  templateUrl: './create-gain.page.html',
  styleUrls: ['./create-gain.page.scss'],
})
export class CreateGainPage implements OnInit {
  value: any;
  isChecked: boolean;

  public gain;
  public isPending: Observable<boolean>;
  constructor(private transactionService: TransactionService,
              private router: Router,
              private location: Location,
              private loadingController: LoadingControllerService) {
    this.isChecked = true;
  }

  ngOnInit() {
    this.gain = {
      description: '',
      value: 0,
      recurrence_date: '',
    };
  }

  create() {
    this.isPending = this.loadingController.isPending;
    this.transactionService.create(this.gain).subscribe(
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

  changeRecurrence() {
    document.getElementById('recurrenceDate').setAttribute('disabled', String(this.isChecked));
    this.gain.recurrence_date = '';
  }

  back() {
    this.location.back();
  }
}
