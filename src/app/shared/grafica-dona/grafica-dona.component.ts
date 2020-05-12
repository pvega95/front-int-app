import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styleUrls: ['./grafica-dona.component.scss']
})
export class GraficaDonaComponent implements OnInit {

// Doughnut
@Input('chartLabels') public doughnutChartLabels: Label[] = [];
@Input('chartData') public doughnutChartData: MultiDataSet = [];
@Input('chartType') public doughnutChartType: ChartType = 'doughnut';
  constructor() { }

  ngOnInit() {
  }

}
