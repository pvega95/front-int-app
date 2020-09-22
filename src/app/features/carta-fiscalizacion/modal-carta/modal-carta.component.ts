import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, PageEvent } from '@angular/material';
import { ProcesosService } from '@core/services/procesos/procesos.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-modal-carta',
  templateUrl: './modal-carta.component.html',
  styleUrls: ['./modal-carta.component.scss']
})
export class ModalCartaComponent implements OnInit {
  displayedColumns: string[] = ['cod_seg','contract', 'descripcion','add'];
  dataSource = new MatTableDataSource([]);

  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  constructor(
    public dialogRef: MatDialogRef<any>,
    private _processService : ProcesosService
  ) { }

  ngOnInit() {
    this.initForm();
  }
  //cargar la data inicial
  initForm(){
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
