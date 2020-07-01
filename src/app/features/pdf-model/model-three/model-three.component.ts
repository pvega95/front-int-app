import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { GuiaRemisionService } from '@core/services/guia-remision/guia-remision.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-model-three',
  templateUrl: './model-three.component.html',
  styleUrls: ['./model-three.component.scss']
})
export class ModelThreeComponent implements OnInit {

  message: {};
  messageService : Subscription;
  modelOneForm : FormGroup;
  // interfaz
  activeloadingfull = false;
  constructor(
    public formB: FormBuilder,
    private _location:Location,
    private _remisionService : GuiaRemisionService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.modelOneForm = this.formB.group({
      // descProcForm: new FormControl('', [
      //   Validators.required
      // ]),
      // itemForm: new FormControl('', [
      //   Validators.required
      // ]),


      cartaForm: new FormControl('', [
        Validators.required
      ]),
      contratoForm: new FormControl('', [
        Validators.required
      ]),
      empleadoForm: new FormControl('', [
        Validators.required
      ]),
      cargoForm2: new FormControl('', [
        Validators.required
      ]),
      direccionForm: new FormControl('', [
        Validators.required
      ]),
      fechaForm: new FormControl(this.datePipe.transform(new Date(),'fullDate'),[
        Validators.required
      ]),


      // procesoForm: new FormControl('', [
      //   Validators.required
      // ]),
      // fechaFiscForm: new FormControl(new Date(), [
      //   Validators.required
      // ]),
    });

    this.messageService = this._remisionService.currentMessage.subscribe(message => 
      {
        this.message = message;
        this.setForm(this.message);
        
      });

  }

  
  setForm(data){
   
    this.modelOneForm.controls['cartaForm'].setValue('CARTA N° ' +  data.numCarta +'-2019-BN/2604' );
    this.modelOneForm.controls['contratoForm'].setValue(data.description);
    this.modelOneForm.controls['empleadoForm'].setValue(data.person);
    this.modelOneForm.controls['cargoForm2'].setValue(data.position + '-' + data.toConsult);
    this.modelOneForm.controls['direccionForm'].setValue(data.adress);
  }

  generate(){
    
    let data = this.modelOneForm.value
  
    this._remisionService.setGuiaRemisionTwo(data).pipe(take(1))
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

    this._remisionService.getPDF(id).pipe(take(1))
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

  goback(){
    this._location.back();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.messageService.unsubscribe();
  }

}
