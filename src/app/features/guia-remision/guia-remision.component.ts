import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { GuiaRemisionService } from '@core/services/guia-remision/guia-remision.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guia-remision',
  templateUrl: './guia-remision.component.html',
  styleUrls: ['./guia-remision.component.scss']
})

export class GuiaRemisionComponent implements OnInit {
  displayedColumns: string[] = ['id' , 'proceso','num-carta','empresa','documento','persona','cargo','direccion','generar'];
  dataSource = new MatTableDataSource;
  constructor(
    private _remisionService : GuiaRemisionService,
    private router : Router
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
    this.router.navigate(['model-three']);
  }

}
