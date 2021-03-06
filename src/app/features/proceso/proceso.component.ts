import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource, MatDialogConfig, MatDialog, PageEvent } from '@angular/material';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { Cloudinary } from '@cloudinary/angular-5.x';

import * as _moment from 'moment';
import { ProcesosService } from '@core/services/procesos/procesos.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ProcesoModalComponent } from './proceso-modal/proceso-modal.component';
import { ReporteService } from '@core/services/reportes/reporte.service';
import { ExcelService } from '@core/services/excel/excel.service';
import { DatePipe } from '@angular/common';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss']
})
export class ProcesoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','type','edit','delete','view'];
  dataSource = new MatTableDataSource([]);
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5,10,20];
  constructor(
    public _dashboardService: DashboardService,
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    private _processService : ProcesosService,
    private dialog: MatDialog,
    private _reporteService: ReporteService,
    private _excelService: ExcelService,
    private datePipe: DatePipe
  ) { 
    this._dashboardService.setDashboardStatus(true);
  }

  ngOnInit() {
    this.getProcess();
  }

  getProcess(){
    this._processService.getProcess(this.postsPerPage,this.currentPage).pipe(take(1))
    .subscribe(
      val =>{
        this.dataSource = new MatTableDataSource(val.posts);
        this.totalPosts = val.maxPosts;
      },
      (err:HttpErrorResponse)=>{
       
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id:string){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = id;
    const dialogRef = this.dialog.open(ProcesoModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: boolean) => {
        if (data) {
         
          this.deleteProcess(id);
        }
        
      }
    );
  }

  deleteProcess(id:string){
    this._processService.setDeleteById(id).pipe(take(1))
    .subscribe((res: any) => {
      if (res) {
        this.getProcess();
      }
    }, (err: HttpErrorResponse) => {
      
    });
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getProcess();
  }

  reporteProcesos(res) {
    const header = ["Nro", "Contratista", "T.Contratista", "T.Procedimiento", "N.Procedimiento", "Año", "Descripcion", "F.Recepcion", "Items"];
    const TITLE = "Reporte Procesos"
    const REPORTE = res.map(data => {
      switch (data.type_contract) {
        case '1':
          data = { ...data, type_contract: 'PERSONA' };
          break;
        case '2':
          data = { ...data, type_contract: 'EMPRESA' };
          break;
        case '3':
          data = { ...data, type_contract: 'CONSORCIO' };
          break;
        case '4':
          data = { ...data, type_contract: 'COLEGIO' };
          break;
        case '5':
          data = { ...data, type_contract: 'MINISTERIO' };
          break;
        case '6':
          data = { ...data, type_contract: 'NOTARIOS' };
          break;
        case '7':
          data = { ...data, type_contract: 'OTROS' };
          break;
        default:
          break;
      }
      return [data.cod_seg, data.contract, data.type_contract, data.name, data.number, data.year, data.description, this.datePipe.transform(data.date, 'shortDate'), data.items];
    });
    this._excelService.addWorksheet(REPORTE, header, TITLE);
  }

  getProcessReport() {
    this._reporteService.processReport().subscribe((res) => {
      if (res) {
        this.reporteProcesos(res);
      }
    })
  }

}
