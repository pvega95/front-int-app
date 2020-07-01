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
  // interfaz
  activeloadingfull = false;
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
      // descProcForm : new FormControl('', [
      //   Validators.required
      // ])
    });

    this.messageService = this._cartaService.currentMessage.subscribe(message => 
      {
        this.message = message;
        this.setForm(this.message);
        
      })
  }
  
  setForm(data){
   
    this.modelOneForm.controls['personaConsForm'].setValue(data.personaConsForm);
    this.modelOneForm.controls['cargoForm'].setValue(data.cargoForm);
    this.modelOneForm.controls['empresaForm'].setValue(data.empresaForm);
    this.modelOneForm.controls['direccionForm'].setValue(data.direccionForm);
    this.modelOneForm.controls['tipoForm'].setValue(data.tipoForm);
    this.modelOneForm.controls['docForm'].setValue(data.docForm);
    // this.modelOneForm.controls['descProcForm'].setValue(data.procesoDepend.description);  
    this.modelOneForm.controls['descProcForm'].setValue('N°' +data.procesoDepend.number + '-' + data.procesoDepend.year + ' ' + data.procesoDepend.description); 
  }

  goback(){
    this._location.back();
  }

  generate(){
   
    let data = this.modelOneForm.value

    this._cartaService.setCartTwo(data).pipe(take(1))
      .subscribe(
        val=>{
       
          this.generatePDF(val.postId)
        },
        (err : HttpErrorResponse)=>{
         
        }
      )
  }

  generatePDF(id){
    
    this.activeloadingfull = true;
   
    this._cartaService.getPDFTwo(id).pipe(take(1))
      .subscribe(
        val=>{
          this.activeloadingfull = false;
          
          var fileURL = URL.createObjectURL(val);
          window.open(fileURL)
        },
        (err : HttpErrorResponse)=>{
    
        }
      )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.messageService.unsubscribe();
  }

}
