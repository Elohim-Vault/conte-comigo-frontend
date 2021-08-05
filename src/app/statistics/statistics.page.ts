import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  doughnutChart: any;
  lineChart: any;

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // this.doughnutChartMethod();
    this.lineChartMethod();
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Gastos', 'Ganhos', 'Poupado'],
        datasets: [{
          label: '# of Votes',
          data: [50, 15, 35],
          backgroundColor: [
            'rgba(245, 43, 7, 1)',
            'rgba(7, 194, 4, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }]
      }
    });
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ["Agosto", "A", "X", "K", "V"],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }
}
