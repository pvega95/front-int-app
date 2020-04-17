import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { GuiaRemisionService } from '@core/services/guia-remision/guia-remision.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProcesoModalComponent } from '../proceso/proceso-modal/proceso-modal.component';

@Component({
  selector: 'app-guia-remision',
  templateUrl: './guia-remision.component.html',
  styleUrls: ['./guia-remision.component.scss']
})

export class GuiaRemisionComponent implements OnInit {
  displayedColumns: string[] = ['id' , 'proceso','num-carta','empresa','documento','persona','cargo','direccion','generar','edit','delete'];
  dataSource = new MatTableDataSource;
  constructor(
    private _remisionService : GuiaRemisionService,
    private router : Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
   this._remisionService.getGuiaRemision().pipe(take(1))
    .subscribe(
      res =>{
        console.log('res',res)
        this.dataSource = res;
      },
      (err:HttpErrorResponse) =>{
        console.log('err',err)
      }
    )
  }

  generate(element){
    console.log('element',element);
    this.newMessage(element);
    this.router.navigate(['model-three']);
  }

  newMessage(e) {
    this._remisionService.changeMessage(e)
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
          // this.deleteProcess(id);
        }
        
      }
    );
  }

}
