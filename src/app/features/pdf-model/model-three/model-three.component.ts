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
        // console.log('this.message',this.message)
      });

  }

  
  setForm(data){
    console.log('data',data)
    this.modelOneForm.controls['cartaForm'].setValue('CARTA N° ' +  data.numCarta +'-2019-BN/2604' );
    this.modelOneForm.controls['contratoForm'].setValue(data.description);
    this.modelOneForm.controls['empleadoForm'].setValue(data.person);
    this.modelOneForm.controls['cargoForm2'].setValue(data.position + '-' + data.toConsult);
    this.modelOneForm.controls['direccionForm'].setValue(data.adress);
  }

  generate(){
    // console.log('modelOneForm',this.modelOneForm.value)
    let data = this.modelOneForm.value
    console.log('data a enviar',data);
    this._remisionService.setGuiaRemisionTwo(data).pipe(take(1))
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
    this._remisionService.getPDF(id).pipe(take(1))
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

  goback(){
    this._location.back();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.messageService.unsubscribe();
  }

}
