import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, PageEvent } from '@angular/material';
import { ProcesosService } from '@core/services/procesos/procesos.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { CartaService } from '@core/services/cartas/carta.service';

@Component({
  selector: 'app-modal-hoja',
  templateUrl: './modal-hoja.component.html',
  styleUrls: ['./modal-hoja.component.scss']
})
export class ModalHojaComponent implements OnInit {
  displayedColumns: string[] = ['cod_seg', 'proceso', 'carta', 'add'];
  // displayedColumns: string[] = ['cod_seg','proceso'];
  dataSource = new MatTableDataSource([]);

  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  constructor(
    public dialogRef: MatDialogRef<any>,
    private _cartaService : CartaService
  ) { }

  ngOnInit() {
    this.initForm();
  }
  //cargar la data inicial
  initForm(){
    this.getProcess();
  }

  getProcess(){
    this._cartaService.getCart(this.postsPerPage,this.currentPage).pipe(take(1))
    .subscribe(
      val => {
        console.log(val)
        this.dataSource = new MatTableDataSource(val.carta);
        this.totalPosts = val.maxPosts;
      },
      (err:HttpErrorResponse)=>{
   
      }
    )
  }

  add(data){
   
    this.dialogRef.close(data);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getProcess();
  }

}
