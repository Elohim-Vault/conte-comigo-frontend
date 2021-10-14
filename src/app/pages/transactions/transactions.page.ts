import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Chart from 'chart.js/auto';
import {TransactionService} from '../../services/transactions/transaction.service';
import {AccountService} from '../../services/account/account.service';
import {IonInfiniteScroll} from '@ionic/angular';
import {Observable} from "rxjs";
import {LoadingControllerService} from "../../services/loading/loading-controller-service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) public infinite: IonInfiniteScroll;
  @ViewChild('transactionsChartCanvas') private transactionCanvas: ElementRef;
  transactionsData: Array<any> = [];
  public isPending: Observable<boolean>;
  public monthName = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
    'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  public month: string;
  public transactionChart;
  private pageNumber = 1;

  constructor(private transactionService: TransactionService,
              private accountService: AccountService,
              private loadingController: LoadingControllerService
  ) {}

  ngOnInit() {
    this.infiniteTransaction();
    this.isPending = this.loadingController.isPending;
    const monthNumber = new Date().getMonth() + 1;
    this.month = `${monthNumber}`;
  }

  ionViewDidEnter() {
    this.showTransactionChart(this.month);
  }

  ionViewDidLeave() {
    this.transactionChart.destroy();
  }

  alterMonth(month) {
    this.transactionsData = [];
    this.pageNumber = 1;
    this.infinite.disabled = false;
    this.transactionChart.destroy();
    this.infiniteTransaction();
    this.showTransactionChart(this.month);
  }

  infiniteTransaction(isFirstLoad = false, event?) {
    this.transactionService.get(7, this.pageNumber, this.month)
      .subscribe((response: any) => {
        this.loadingController.pending.next(false);
        response.data.forEach((item) => {
          this.transactionsData.push(item);
        });
        if (response.next_page_url == null) {
          this.infinite.disabled = true;
        }
        if (isFirstLoad) {
          this.infinite.complete();
        }
        this.pageNumber++;
      }, error => {
        console.log(error);
      });
  }

  doInfinite(event) {
    this.infiniteTransaction(true, event);
  }

  showTransactionChart(month) {
    this.accountService.financialData(month).subscribe((response) => {
      this.transactionChart = new Chart(this.transactionCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: ['ganhos', 'despesas', 'poupado'],
          datasets: [{
            label: `Valores do mês de ${this.monthName[Number(this.month) - 1]}`,
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
