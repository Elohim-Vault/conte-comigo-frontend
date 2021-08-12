import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Chart from "chart.js/auto";
import {TransactionService} from "../services/transactions/transaction.service";
import {AccountService} from "../services/account/account.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  @ViewChild('transactionsChartCanvas') private transactionCanvas: ElementRef;
  transactionsData: Array<any> = [];
  pageNumber = 1;

  transactionChart;
  month;
  constructor(private transactionService: TransactionService, private accountService: AccountService) {}

  ngOnInit() {
    this.getTransactions(false, '');
    const monthNumber = new Date().getMonth() + 1;
    this.month = `${monthNumber}`;
  }

  ionViewDidEnter() {
    this.showTransactionChart();
  }

  getMonth(month) {

  }

  getTransactions(isFirstLoad, event) {
    this.transactionService.get(7, this.pageNumber, this.month)
      .subscribe((response: any) => {
        console.log(response);
        response['data'].forEach((item) => {
          this.transactionsData.push(item);
        });

        if (response.next_page_url == null) {
          event.target.disabled = true;
        }
        if (isFirstLoad) {
          event.target.complete();
        }

        this.pageNumber++;
      }, error => {
        console.log(error);
      });
  }

  doInfinite(event) {
    this.getTransactions(true, event);
  }

  showTransactionChart() {
    this.accountService.financialData().subscribe((response) => {
      this.transactionChart = new Chart(this.transactionCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: ['ganhos', 'despesas', 'poupado'],
          datasets: [{
            label: `Valores do mês de agosto`,
            data: [response['gains'], response['expenses'] * - 1, response['savings']],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
            ],
            borderWidth: 1
          }]
        }
      });
    });
  }


}
