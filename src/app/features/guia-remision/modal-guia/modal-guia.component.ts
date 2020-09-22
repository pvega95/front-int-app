import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { MatSnackBar, MatDialog, MatTableDataSource, MatDialogRef, MatPaginator, PageEvent } from '@angular/material';
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
  displayedColumns: string[] = ['cod_seg', 'proceso', 'descripcion','fecha','analista','add'];

  dataSource : any;
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5,10,20];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public _dashboardService: DashboardService,
    public snackBar: MatSnackBar,
    private _cartaService : CartaService,
    public dialog: MatDialog,
    private router : Router,
    public dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit() {
    this.loadCard();
  }

  loadCard(){
    this._cartaService.getCart(this.postsPerPage,this.currentPage).pipe(take(1))  
    .subscribe(
      val=>{
        this.dataSource = new MatTableDataSource(val.carta);
        this.totalPosts = val.maxPosts;
      },
      (err:HttpErrorResponse)=>{
       
      }
    )
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.loadCard();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add(data){
    this.dialogRef.close(data);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }


}
