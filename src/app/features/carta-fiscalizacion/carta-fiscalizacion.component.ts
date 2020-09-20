import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar, MatDialog, MatTableDataSource, MatDialogConfig, MatPaginator, PageEvent } from '@angular/material';
import { CartaService } from '@core/services/cartas/carta.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalCartaComponent } from './modal-carta/modal-carta.component';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { Router } from '@angular/router';
import { ProcesoModalComponent } from '../proceso/proceso-modal/proceso-modal.component';
import { ReporteService } from '@core/services/reportes/reporte.service';
import { ExcelService } from '@core/services/excel/excel.service';
import { AnalistaPipe } from '@core/pipe/analista.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-carta-fiscalizacion',
  templateUrl: './carta-fiscalizacion.component.html',
  styleUrls: ['./carta-fiscalizacion.component.scss']
})
export class CartaFiscalizacionComponent implements OnInit {
  cartaForm: FormGroup;
  // displayedColumns: string[] = ['id','proceso', 'carta', 'analista', 'empresa', 'docx', 'generar', 'edit', 'delete'];
  displayedColumns: string[] = ['id','proceso', 'carta', 'analista', 'empresa', 'generar', 'edit', 'delete'];
  dataSource = new MatTableDataSource;
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5,10,20];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  message: {};

  constructor(
    public _dashboardService: DashboardService,
    public snackBar: MatSnackBar,
    private _cartaService: CartaService,
    public dialog: MatDialog,
    private router: Router,
    private _reporteService: ReporteService,
    private _excelService: ExcelService,
    private analistaPipe: AnalistaPipe,
    private datePipe: DatePipe
  ) {
    this._dashboardService.setDashboardStatus(true);
  }

  ngOnInit() {
    this._cartaService.currentMessage.subscribe(message => {
      this.message = message
    });

    this.getCarts();
  }

  getCarts() {
    this._cartaService.getCart(this.postsPerPage,this.currentPage).pipe(take(1))
      .subscribe(
        val => {
          this.dataSource = new MatTableDataSource(val.carta);
          this.totalPosts = val.maxPosts;
        },
        (err: HttpErrorResponse) => {
        }
      );
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getCarts();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  generate(element) {
    this.newMessage(element);
    this.router.navigate(['model-one']);
  }

  newMessage(e) {
    this._cartaService.changeMessage(e)
  }

  delete(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = id;
    const dialogRef = this.dialog.open(ProcesoModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: boolean) => {
        if (data) {
          this.deleteCarta(id);
        }

      }
    );
  }

  deleteCarta(id: string) {
    this._cartaService.setDeleteById(id).pipe(take(1))
      .subscribe((res: any) => {
        if (res) {
          this.getCarts();
        }
      }, (err: HttpErrorResponse) => {
      });
  }

  docx(element) {
    this._cartaService.generateDocx(element).pipe(take(1))
      .subscribe((res: any) => {
        console.log();
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(res);;
        link.click();
      }, (err: HttpErrorResponse) => {
      });
  }

  reporteCarta(res) {
    const header = ["Descripcion Proceso", "Item", "Proceso", "Fecha Fiscalizacion", "N.Analista", 
                  "N.Carta", "Empresa a consultar", "Direccion", "Persona Consultar","Cargo Persona", "Descripcion Doc Fiscalizar", 
                  "Tipo Documento", "Observaciones", "Documento Respuesta", "Fecha Respuesta", "Doc. Remision",
                  "Conclusion","Dias Pasados"];
    const TITLE = "Reporte Carta"
    const REPORTE = res.map(data => {
      return [
              data.descProcForm,data.itemForm,data.procesoForm,this.datePipe.transform(data.fechaFiscForm, 'shortDate'),data.analistaForm.name,
              data.cartaForm,data.empresaForm,data.direccionForm,data.personaConsForm,data.cargoForm,data.docForm,
              data.tipoForm,data.observacionesForm,data.docResForm,data.fechaResForm,data.docRemisionForm,
              data.conclusionForm.name,data.diasPasadosForm
            ];
    });
    // console.log(REPORTE);
    this._excelService.addWorksheet(REPORTE, header, TITLE);
  }

  getProcessReport() {
    this._reporteService.cartaReport().subscribe((res) => {
      if (res) {
        this.reporteCarta(res.result);
      }
    })
  }

}
