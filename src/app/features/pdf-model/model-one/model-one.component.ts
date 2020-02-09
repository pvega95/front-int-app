import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartaService } from '@core/services/cartas/carta.service';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-model-one',
  templateUrl: './model-one.component.html',
  styleUrls: ['./model-one.component.scss']
})
export class ModelOneComponent implements OnInit {
  message: {};
  messageService : Subscription;
  modelOneForm : FormGroup;
  constructor(
    private route: ActivatedRoute,
    private _cartaService : CartaService,
    public formB: FormBuilder,
    private _location:Location,
  ) { }

  ngOnInit() {
    this.modelOneForm = this.formB.group({
      descProcForm: new FormControl('', [
        Validators.required
      ]),
      itemForm: new FormControl('', [
        Validators.required
      ]),
      procesoForm: new FormControl('', [
        Validators.required
      ]),
      fechaFiscForm: new FormControl(new Date(), [
        Validators.required
      ]),
      analistaForm: new FormControl('', [
        Validators.required
      ]),
      cartaForm: new FormControl('', [
        Validators.required
      ]),
      empresaForm: new FormControl('', [
        Validators.required
      ]),
      direccionForm: new FormControl('', [
        Validators.required
      ]),
      personaConsForm: new FormControl('', [
        Validators.required
      ]),
      cargoForm: new FormControl('', [
        Validators.required
      ]),
      docForm: new FormControl('', [
        Validators.required
      ]),
      tipoForm: new FormControl('', [
        Validators.required
      ]),
      observacionesForm: new FormControl('', [
        Validators.required
      ]),
      docResForm: new FormControl('', [
        Validators.required
      ]),
      fechaResForm: new FormControl('', [
        Validators.required
      ]),
      docRemisionForm: new FormControl('', [
        Validators.required
      ]),
      conclusionForm: new FormControl('', [
        Validators.required
      ]),
      diasPasadosForm: new FormControl('', [
        Validators.required
      ]),
      procesoDepend: new FormControl('', [
        Validators.required
      ]),
      descriptionForm : new FormControl('', [
        Validators.required
      ])
    });

    this.messageService = this._cartaService.currentMessage.subscribe(message => 
      {
        this.message = message;
        this.setForm(this.message);
        // console.log('this.message',this.message)
      })
  }
  setForm(data){
    console.log('data',data)
    this.modelOneForm.controls['personaConsForm'].setValue(data.personaConsForm);
    this.modelOneForm.controls['cargoForm'].setValue(data.cargoForm);
    this.modelOneForm.controls['empresaForm'].setValue(data.empresaForm);
    this.modelOneForm.controls['direccionForm'].setValue(data.direccionForm);
    this.modelOneForm.controls['tipoForm'].setValue(data.tipoForm);
    this.modelOneForm.controls['docForm'].setValue(data.docForm);
    this.modelOneForm.controls['descriptionForm'].setValue(data.procesoDepend.description);  
  }

  goback(){
    this._location.back();
  }

  generate(){
    // console.log('modelOneForm',this.modelOneForm.value)
    let data = this.modelOneForm.value
    console.log('data a enviar',data);
    this._cartaService.setCartTwo(data).pipe(take(1))
      .subscribe(
        val=>{
          console.log('val',val)
          this.generatePDF(val.postId)
        },
        (err : HttpErrorResponse)=>{
          console.log('err',err)
        }
      )
  }

  generatePDF(id){
    console.log('generando pdf con ID',id)
    this._cartaService.getPDFTwo(id).pipe(take(1))
      .subscribe(
        val=>{
          console.log('val',val)
          var fileURL = URL.createObjectURL(val);
          window.open(fileURL)
        },
        (err : HttpErrorResponse)=>{
          console.log('err',err)
        }
      )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.messageService.unsubscribe();
  }
  

}
