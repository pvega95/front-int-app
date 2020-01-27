import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar, MatDialog, MatTableDataSource } from '@angular/material';
import { CartaService } from '@core/services/cartas/carta.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalCartaComponent } from './modal-carta/modal-carta.component';
import { DashboardService } from '@core/services/resources/dashboard.service';

@Component({
  selector: 'app-carta-fiscalizacion',
  templateUrl: './carta-fiscalizacion.component.html',
  styleUrls: ['./carta-fiscalizacion.component.scss']
})
export class CartaFiscalizacionComponent implements OnInit {
  cartaForm: FormGroup;
  displayedColumns: string[] = ['id', 'descripcion','proceso','fecha','analista','empresa','generar'];
  dataSource = new MatTableDataSource;
  
  constructor(
    public _dashboardService: DashboardService,
    public snackBar: MatSnackBar,
    private _cartaService : CartaService,
    public dialog: MatDialog
  ) {
    this._dashboardService.setDashboardStatus(true);
   }

  ngOnInit() {
    this._cartaService.getCart().pipe(take(1))  
      .subscribe(
        val=>{
          console.log('val',val);
          this.dataSource = val;
        },
        (err:HttpErrorResponse)=>{
          console.log('err',err)
        }
      )
  }

  generate(element){
    console.log('element',element)
    this._cartaService.getPDF(element._id).pipe(take(1))
      .subscribe(
        val =>{
          console.log('val',val)
          var fileURL = URL.createObjectURL(val);
          window.open(fileURL)
        },
        (err : HttpErrorResponse )=>{
          console.log('err',err)
        }
      )

  }

}
