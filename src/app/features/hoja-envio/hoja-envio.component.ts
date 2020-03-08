import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { CartaService } from '@core/services/cartas/carta.service';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { HojaEnvioService } from '@core/services/hoja-envio/hoja-envio.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hoja-envio',
  templateUrl: './hoja-envio.component.html',
  styleUrls: ['./hoja-envio.component.scss']
})
export class HojaEnvioComponent implements OnInit {
  
  displayedColumns: string[] = ['id' , 'proceso','fecha','num-hoja','documento','tipo-documento','generar'];
  dataSource = new MatTableDataSource;
  constructor(
    public _dashboardService: DashboardService,
    public snackBar: MatSnackBar,
    private _hojaEnvioService : HojaEnvioService,
    public dialog: MatDialog,
    // private _cartaService : CartaService,
    private router : Router
  ) { }

  ngOnInit() {
    this._hojaEnvioService.getHojaEnvio().pipe(take(1))
      .subscribe(
        val =>{
          console.log('val',val)
          this.dataSource = val;
        },
        (err:HttpErrorResponse)=>{
          console.log('err',err)
        }
      )
  }

  generate(element){
    console.log('element',element);
    this.newMessage(element);
    this.router.navigate(['model-two']);
  }

  newMessage(e) {
    this._hojaEnvioService.changeMessage(e)
  }


}
