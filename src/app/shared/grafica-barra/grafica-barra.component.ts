import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-grafica-barra',
  templateUrl: './grafica-barra.component.html',
  styleUrls: ['./grafica-barra.component.scss']
})
export class GraficaBarraComponent implements OnInit {

  @Input('chartLabels') public barChartLabels: Label[];
  @Input('chartData') public barChartData: ChartDataSets;
  @Input('chartType') public barChartType: ChartType = 'bar';
  @Input() public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  @Input() public barChartPlugins = [];
  @Input() public barChartLegend = true;

  constructor() { }

  ngOnInit() {
  }

}
