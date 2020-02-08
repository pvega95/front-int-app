import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { GuiaRemisionService } from '@core/services/guia-remision/guia-remision.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  guiaForm : FormGroup
  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    private _location:Location,
    private _remisionService : GuiaRemisionService,
    private router : Router
  ) { }

  ngOnInit() {
    this.guiaForm = this.formB.group({
      descProForm: new FormControl('', [
        Validators.required
      ]),
      numCartaForm: new FormControl('', [
        Validators.required
      ]),
      empConsForm: new FormControl('', [
        Validators.required
      ]),
      descDocForm: new FormControl('', [
        Validators.required
      ]),
      personaForm: new FormControl('', [
        Validators.required
      ]),
      cargoForm: new FormControl('', [
        Validators.required
      ]),
      direccionForm: new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmitGuia(miForm : NgForm){
    // console.log('miForm',miForm.value)
    let data = {
      'process' : miForm.value.descProForm,
      'numCarta':miForm.value.numCartaForm,
      'toConsult':miForm.value.empConsForm,
      'description':miForm.value.descDocForm,
      'person': miForm.value.personaForm,
      'position': miForm.value.cargoForm,
      'adress': miForm.value.direccionForm,
    }
    console.log('data a enviar',data);
    this._remisionService.setGuiaRemision(data).pipe(take(1))
      .subscribe(
        val=>{
          console.log('val',val)
          this.router.navigate(['/main/guia-remision'])
        },
        (err:HttpErrorResponse)=>{
          console.log('err',err)
        }
      )
  }

  goback(){
    this._location.back();
  }

}
