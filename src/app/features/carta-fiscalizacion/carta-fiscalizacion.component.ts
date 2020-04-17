import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { CartaService } from '@core/services/cartas/carta.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalCartaComponent } from './modal-carta/modal-carta.component';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { Router } from '@angular/router';
import { ProcesoModalComponent } from '../proceso/proceso-modal/proceso-modal.component';

@Component({
  selector: 'app-carta-fiscalizacion',
  templateUrl: './carta-fiscalizacion.component.html',
  styleUrls: ['./carta-fiscalizacion.component.scss']
})
export class CartaFiscalizacionComponent implements OnInit {
  cartaForm: FormGroup;
  displayedColumns: string[] = ['id', 'descripcion','proceso','fecha','analista','empresa','generar','edit','delete'];
  dataSource = new MatTableDataSource;
  message:{};

  constructor(
    public _dashboardService: DashboardService,
    public snackBar: MatSnackBar,
    private _cartaService : CartaService,
    public dialog: MatDialog,
    private router : Router
  ) {
    this._dashboardService.setDashboardStatus(true);
   }

  ngOnInit() {
    this._cartaService.currentMessage.subscribe(message => 
      {
        this.message = message
        // console.log('this.message',this.message)
      });

    this.getCarts();
  }

  getCarts(){
    this._cartaService.getCart().pipe(take(1))  
    .subscribe(
      val=>{
        console.log('val',val);
        this.dataSource = val;
      },
      (err:HttpErrorResponse)=>{
        console.log('err',err)
      }
    );
  }

  generate(element){
    console.log('element',element)
    this.newMessage(element);
    this.router.navigate(['model-one']);
  }

  newMessage(e) {
    this._cartaService.changeMessage(e)
  }

  delete(id:string){
    // console.log('id',id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = id;
    const dialogRef = this.dialog.open(ProcesoModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: boolean) => {
        if (data) {
          console.log("Dialog output:", data)
          this.deleteCarta(id);
        }
        
      }
    );
  }

  deleteCarta(id:string){
    this._cartaService.setDeleteById(id).pipe(take(1))
    .subscribe((res: any) => {
      if (res) {
        this.getCarts();
      }
    }, (err: HttpErrorResponse) => {
      console.log(err)
    });
  }

}
