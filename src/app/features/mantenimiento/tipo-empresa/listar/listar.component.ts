import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatTableDataSource, PageEvent } from '@angular/material';
import { MantenimientoService } from '@core/services/mantenimientos/matenimientos.service';
import { take } from 'rxjs/operators';
import { ProcesoModalComponent } from 'src/app/features/proceso/proceso-modal/proceso-modal.component';

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
    private _mantenimientoService: MantenimientoService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
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
        this.dataSource.paginator = this.paginator;
      },
      (err:HttpErrorResponse) =>{
        
      }
    )
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

          this.deleteTipoEmpresa(id);
        }

      }
    );
  }

  deleteTipoEmpresa(id: string) {
    this._mantenimientoService.eliminarTipoEmpresa(id).pipe(take(1))
      .subscribe((res: any) => {
        if (res) {
          this.openSnackBar('Se elimino correctamente', 'Ok');
          this.getEntidades();
        }
      }, (err: HttpErrorResponse) => {

      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
