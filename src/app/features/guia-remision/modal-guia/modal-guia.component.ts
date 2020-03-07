import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { MatSnackBar, MatDialog, MatTableDataSource, MatDialogRef } from '@angular/material';
import { CartaService } from '@core/services/cartas/carta.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-guia',
  templateUrl: './modal-guia.component.html',
  styleUrls: ['./modal-guia.component.scss']
})
export class ModalGuiaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'descripcion','proceso','fecha','analista','empresa','add'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource : any;
  constructor(
    public _dashboardService: DashboardService,
    public snackBar: MatSnackBar,
    private _cartaService : CartaService,
    public dialog: MatDialog,
    private router : Router,
    public dialogRef: MatDialogRef<any>,
  ) { }

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

  add(data){
    // console.log(data)
    this.dialogRef.close(data);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
