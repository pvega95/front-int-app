import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatDialogConfig, PageEvent } from '@angular/material';
import { CartaService } from '@core/services/cartas/carta.service';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { HojaEnvioService } from '@core/services/hoja-envio/hoja-envio.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProcesoModalComponent } from '../proceso/proceso-modal/proceso-modal.component';
import { ReporteService } from '@core/services/reportes/reporte.service';
import { ExcelService } from '@core/services/excel/excel.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-hoja-envio',
  templateUrl: './hoja-envio.component.html',
  styleUrls: ['./hoja-envio.component.scss']
})
export class HojaEnvioComponent implements OnInit {
  
  displayedColumns: string[] = ['id','proceso','fecha','num-hoja','documento','tipo-documento','generar','edit','delete'];
  dataSource = new MatTableDataSource([]);
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5,10,20];
  constructor(
    public _dashboardService: DashboardService,
    public snackBar: MatSnackBar,
    private _hojaEnvioService : HojaEnvioService,
    public dialog: MatDialog,
    private router : Router,
    private _reporteService: ReporteService,
    private _excelService: ExcelService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
   this.getHojasEnvio();
  }

  getHojasEnvio(){
    this._hojaEnvioService.getHojaEnvio(this.postsPerPage,this.currentPage).pipe(take(1))
    .subscribe(
      val =>{
        this.dataSource = new MatTableDataSource(val.hoja);
        this.totalPosts = val.maxPosts;
      },
      (err:HttpErrorResponse)=>{
       
      }
    )
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getHojasEnvio();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  generate(element){
    this.router.navigate(['model-two'], { queryParams: { id: element._id } });
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
        
          this.deleteHojaEnvio(id);
        }
        
      }
    );
  }

  deleteHojaEnvio(id:string){
    this._hojaEnvioService.setDeleteById(id).pipe(take(1))
    .subscribe((res: any) => {
      if (res) {
        this.getHojasEnvio();
      }
    }, (err: HttpErrorResponse) => {
   
    });
  }

  reporteHoja(res) {
    const header = ["Proceso", "F.Remision","Num H.Envio","Doc a Remitir","T.Documento"];
    const TITLE = "Reporte Hoja"
    const REPORTE = res.map(data => {
      return [
              data.process,this.datePipe.transform( data.dateRemision, 'shortDate') ,data.shipNumber,data.docToRemit,data.typeDocument.name
            ];
    });
    this._excelService.addWorksheet(REPORTE, header, TITLE);
  }

  getHojaReport() {
    this._reporteService.hojaReport().subscribe((res) => {
      if (res) {
        this.reporteHoja(res.result);
      }
    })
  }

}
