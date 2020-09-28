import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { MantenimientoService } from '@core/services/mantenimientos/matenimientos.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  displayedColumns: string[] = ['name','edit','delete'];
  dataSource = new MatTableDataSource;
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5,10,20];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private _mantenimientoService: MantenimientoService
  ) { }

  ngOnInit() {
    this.getEntidades();
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getEntidades();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEntidades(){
    this._mantenimientoService.getTipoEmpresa().pipe(take(1))
    .subscribe(
      val =>{
        this.dataSource = new MatTableDataSource(val.tipoEmpresa);
        this.totalPosts = val.tipoEmpresa.length;
      },
      (err:HttpErrorResponse) =>{
        
      }
    )
  }

  delete(){
    return
  }

}
