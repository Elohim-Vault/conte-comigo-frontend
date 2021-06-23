import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ExpenseService} from "../../services/expense/expense.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.page.html',
  styleUrls: ['./create-expense.page.scss'],
})
export class CreateExpensePage implements OnInit {
  isChecked: boolean;

  expense = {
    description: '',
    recurrence_date: '',
    value: 0,
    deadline: Date,
    account: 'Sua conta',

    status: false
  };

  constructor(private expenseService: ExpenseService, private router: Router) {
    this.isChecked = true;
  }

  ngOnInit() {

  }

  public changeRecurrence() {
    console.log(this.isChecked);
    document.getElementById('recurrenceDate').setAttribute('disabled', String(this.isChecked));
    this.expense.recurrence_date = '';
  }

  async create() {
    console.log(this.expense);
    this.expenseService.create(this.expense).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
