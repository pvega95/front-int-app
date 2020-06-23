import { Component, OnInit } from '@angular/core';
import { GenerateService } from '@core/services/generate-pdf/generate.service';
import { take, catchError, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { YEARS } from '@core/constantes/year';
import { FormControl } from '@angular/forms';
import { ReporteService } from '@core/services/reportes/reporte.service';
import { Subscription, Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  years = YEARS;
  yearForm : FormControl = new FormControl('');
  reporteOne: any;
  reporteTwo:any;
  reporteThree:any;
  reporteFour: any;
  reporteFifth: any;
  reporteSix:any;

  source$: Observable<any>;
  private subsForkJoin: Subscription;
  graficos: any = {
    'grafico1': {
      'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'leyenda': 'Procesos'
    },
    'grafico2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'leyenda': 'Cartas de fiscalizacion'
    },
    'grafico3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'leyenda': 'Hoja de envio'
    },
    'grafico4': {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'leyenda': 'Guia de remision'
    },
  };

  
  constructor(
    private _reporteService : ReporteService
  ) { }

  ngOnInit() {
    // this.processPerYear();
    // this.processPorTipoProcedimiento();
    // this.processPorConclusion();
    this.reportsInit();
  }

  reportsInit() {
    let reporteUno = this._reporteService.processPerYear();
    let reporteDos = this._reporteService.processPerTypeProcedure();
    let reporteTres = this._reporteService.processPerConclusion();
    let reporteCuatro = this._reporteService.processPerContratista();
    let reporteCinco = this._reporteService.processPerAnalist();
    let reporteSeis = this._reporteService.processPerMonth();

    this.source$ = forkJoin([reporteUno, reporteDos, reporteTres, reporteCuatro, reporteCinco,reporteSeis])  
      .pipe(
        catchError(err => {
          // console.log('err -- ', err)
          throw (err)
        }),
        map(val => {
          // console.log('val -- ', val)
          return val
        })
      );

      // console.log(this.source$)
      this.source$.subscribe(
        val => {
          if (val){
            console.log(val)
            this.firstReport(val[0]);
            this.secondReport(val[1]);
            this.thirdReport(val[2]);
            this.fourthReport(val[3]);
            this.fifthReport(val[4])
            this.sixReport(val[5])
          } 
        }
      )
  }

  firstReport(data) {
    let reporte = Object.assign({});
    reporte.labels = ['2018','2019','2020'];
    reporte.data = [data.Y018.length,data.Y019.length,data.Y020.length];
    reporte.type = 'doughnut';
    reporte.leyenda = 'Procesos por año';
    this.reporteOne = reporte;
  }

  secondReport(data) {
    let reporte = Object.assign({});
    reporte.labels = ['Adj Simplificada','Adj Menor Cuantia','Concurso Meritos','Licitacion Publica','Otros'];
    reporte.data = [data.AdjSimplificada.length,data.AdjudMenorCuantia.length,data.ConcursoMeritos.length,data.ConcursoPublico.length,data.LicitacionPublica.length,data.Otros.length];
    reporte.type = 'doughnut';
    reporte.leyenda = 'Procesos por tipo procedimiento';
    this.reporteTwo = reporte;
  }

  thirdReport(data) {
    let reporte = Object.assign({});
    reporte.labels = ['Positivo','Negativo','Devuelto','Plazo Ext','Otros'];
    reporte.data = [data.positivo.length,data.negativo.length,data.devuelto.length,data.plazoExt.length,data.otros.length];
    reporte.type = 'doughnut';
    reporte.leyenda = 'Procesos por conclusion';
    this.reporteThree = reporte;
  }

  fourthReport(data) {
    let reporte = Object.assign({});
    reporte.labels = ['PERSONA','EMPRESA','CONSORCIO','COLEGIO','MINISTERIO','NOTARIOS','OTROS'];
    reporte.data = [data.persona.length, data.empresa.length, data.consorcio.length,data.colegio.length,data.ministerio.length,data.notarios.length, data.otros.length];
    reporte.type = 'doughnut';
    reporte.leyenda = 'Procesos por contratista';
    this.reporteFour = reporte;
  }

  fifthReport(data) {
    let reporte = Object.assign({});
    reporte.labels = ['ALIS LAGUNA','MARLENE YUPANQUI','CARLOS PALOMINO'];
    reporte.data = [data.analista1.length, data.analista2.length, data.analista3.length];
    reporte.type = 'doughnut';
    reporte.leyenda = 'Procesos por analista';
    this.reporteFifth = reporte;
  }

  sixReport(data){
    let reporte = Object.assign({});
    reporte.labels = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO','AGOSTO','SETIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
    reporte.data = [
      { data: [data.Enero.length, data.Febrero.length, data.Marzo.length, data.Abril.length,
               data.Mayo.length, data.Junio.length, data.Julio.length, data.Agosto.length,
               data.Setiembre.length, data.Octubre.length, data.Noviembre.length, data.Diciembre.length,
              ], label: 'Año 2020' },
      // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Año 2021' }
    ];
    this.reporteSix = reporte;
  }


}
