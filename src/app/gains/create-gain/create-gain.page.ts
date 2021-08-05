import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TransactionService} from "../../services/transactions/transaction.service";

@Component({
  selector: 'app-create-gain',
  templateUrl: './create-gain.page.html',
  styleUrls: ['./create-gain.page.scss'],
})
export class CreateGainPage implements OnInit {
  value: any;
  isChecked: any;

  gain = {
    description: '',
    value: 0,
    recurrence_date: '',
  };
  constructor(private transactionService: TransactionService, private router: Router) { }

  ngOnInit() {
  }

  async create() {
    console.log(this.gain);
    this.transactionService.create(this.gain).subscribe(() =>{
      this.router.navigate(['/home']);
    });
  }

  changeRecurrence() {
    document.getElementById('recurrenceDate').setAttribute('disabled', String(this.isChecked));
    this.gain.recurrence_date = '';
    console.log(this.gain.recurrence_date);
  }
}
