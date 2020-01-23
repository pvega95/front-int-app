import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { Cloudinary } from '@cloudinary/angular-5.x';

import * as _moment from 'moment';
import { ProcesosService } from '@core/services/procesos/procesos.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss']
})
export class ProcesoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','type'];
  dataSource = new MatTableDataSource;
  constructor(
    public _dashboardService: DashboardService,
    private router: Router,
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    private _svgRegisterService:SvgRegisterService,
    private cloudinary: Cloudinary,
    private renderer: Renderer,
    private _processService : ProcesosService
  ) { 
    this._dashboardService.setDashboardStatus(true);
  }

  ngOnInit() {
    this._processService.getProcess().pipe(take(1))
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

}
