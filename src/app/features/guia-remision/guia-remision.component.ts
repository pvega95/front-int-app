import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatTableDataSource, MatDialogConfig, MatDialog, MatPaginator } from '@angular/material';
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
  displayedColumns: string[] = ['proceso','num-carta','empresa','documento','persona','cargo','direccion','generar','edit','delete'];
  dataSource = new MatTableDataSource;
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private _remisionService : GuiaRemisionService,
    private router : Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
   this.getGuia();
  }

  getGuia(){
    this._remisionService.getGuiaRemision().pipe(take(1))
    .subscribe(
      val =>{
        // this.dataSource = res;
        this.dataSource = new MatTableDataSource<Element>(val);
        this.dataSource.paginator = this.paginator;
      },
      (err:HttpErrorResponse) =>{
        
      }
    )
  }

  generate(element){

    this.newMessage(element);
    this.router.navigate(['model-three']);
  }

  newMessage(e) {
    this._remisionService.changeMessage(e)
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
       
          this.deleteGuiaRemision(id);
        }
        
      }
    );
  }

  deleteGuiaRemision(id:string){
    this._remisionService.setDeleteById(id).pipe(take(1))
      .subscribe(
        res => {
          if (res) {
          
            this.getGuia();
          }
          
        },(err:HttpErrorResponse) =>{
        
        }
      )
  }

}
