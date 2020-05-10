import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource, MatDialogConfig, MatDialog, PageEvent } from '@angular/material';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { Cloudinary } from '@cloudinary/angular-5.x';

import * as _moment from 'moment';
import { ProcesosService } from '@core/services/procesos/procesos.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ProcesoModalComponent } from './proceso-modal/proceso-modal.component';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss']
})
export class ProcesoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','type','edit','delete','view'];
  dataSource = new MatTableDataSource;
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  constructor(
    public _dashboardService: DashboardService,
    private router: Router,
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    private _svgRegisterService:SvgRegisterService,
    private cloudinary: Cloudinary,
    private renderer: Renderer,
    private _processService : ProcesosService,
    private dialog: MatDialog,
  ) { 
    this._dashboardService.setDashboardStatus(true);
  }

  ngOnInit() {
    this.getProcess();
  }

  getProcess(){
    this._processService.getProcess(this.postsPerPage,this.currentPage).pipe(take(1))
    .subscribe(
      val =>{
        console.log('val',val)
        this.dataSource = val.posts;
        this.totalPosts = val.maxPosts;
      },
      (err:HttpErrorResponse)=>{
        console.log('err',err)
      }
    )
  }

  generar(){
    console.log('generate pdf running')
    this._processService.getPDF().pipe(take(1))
      .subscribe(
        val =>{
          console.log('val',val)
          var fileURL = URL.createObjectURL(val);
          window.open(fileURL)
          
        },
        (err : HttpErrorResponse)=>{
          console.log('err',err)
        }
      )
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
          this.deleteProcess(id);
        }
        
      }
    );
  }

  deleteProcess(id:string){
    this._processService.setDeleteById(id).pipe(take(1))
    .subscribe((res: any) => {
      if (res) {
        this.getProcess();
      }
    }, (err: HttpErrorResponse) => {
      console.log(err)
    });
  }

  onChangedPage(pageData: PageEvent){
    // console.log(pageData)
    // this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    // this.postsService.getPosts(this.postsPerPage,this.currentPage);
    this.getProcess();
  }
}
