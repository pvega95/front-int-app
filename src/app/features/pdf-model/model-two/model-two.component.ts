import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartaService } from '@core/services/cartas/carta.service';
import { HojaEnvioService } from '@core/services/hoja-envio/hoja-envio.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-model-two',
  templateUrl: './model-two.component.html',
  styleUrls: ['./model-two.component.scss']
})
export class ModelTwoComponent implements OnInit {
  message: {};
  messageService: Subscription;
  modelOneForm: FormGroup;

  // interfaz
  activeloadingfull = false;

  constructor(
    public formB: FormBuilder,
    private _location: Location,
    // private _cartaService : CartaService,
    private _hojaEnvioService: HojaEnvioService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.modelOneForm = this.formB.group({
      personaConsForm: new FormControl('', [
        Validators.required
      ]),
      personaConsForm2: new FormControl('', [
        Validators.required
      ]),
      cargoForm: new FormControl('', [
        Validators.required
      ]),
      cargoForm2: new FormControl('', [
        Validators.required
      ]),
      referenciaForm: new FormControl('', [
        Validators.required
      ]),
      check1: new FormControl(false, [
        Validators.required
      ]),
      check2: new FormControl(false, [
        Validators.required
      ]),
      check3: new FormControl(false, [
        Validators.required
      ]),
      check4: new FormControl(false, [
        Validators.required
      ]),
      check5: new FormControl(false, [
        Validators.required
      ]),
      check6: new FormControl(false, [
        Validators.required
      ]),
      check7: new FormControl(false, [
        Validators.required
      ]),
      check8: new FormControl(false, [
        Validators.required
      ]),
      observacionForm: new FormControl('', [
        Validators.required
      ]),
      fechaForm: new FormControl(this.datePipe.transform(new Date(), 'fullDate'), [
        Validators.required
      ]),
    });

    this.messageService = this._hojaEnvioService.currentMessage.subscribe(message => {
      this.message = message;
      this.setForm(this.message);
      // console.log('this.message',this.message)
    });
  }

  setForm(data) {
    console.log('data', data)
    this.modelOneForm.controls['personaConsForm'].setValue('ALCIDES MALDONADO CORTEZ');
    this.modelOneForm.controls['cargoForm'].setValue('JEFE DE SEC.  EJECUCIÓN Y SEGUIMIENTO DE CONTRATOS ');
    this.modelOneForm.controls['personaConsForm2'].setValue('MARCO ANTONIO LEÓN ARANGUREN');
    this.modelOneForm.controls['cargoForm2'].setValue('JEFE DE SEC. PROGRAMACIÓN Y EVALUACIÓN');
    this.modelOneForm.controls['referenciaForm'].setValue(data.DocToRemit);
    this.modelOneForm.controls['observacionForm'].setValue('Remito a su despacho original de la referencia, en respuesta de la carta N° , para su archivo en el expediente y seguimiento de  fiscalización posterior realizada al proceso ' + data.Process);
  }

  goback() {
    this._location.back();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.messageService.unsubscribe();
  }

  generate() {
    // console.log('modelOneForm',this.modelOneForm.value)
    let data = this.modelOneForm.value
    console.log('data a enviar', data);
    this._hojaEnvioService.setHojaEnvioTwo(data).pipe(take(1))
      .subscribe(
        val => {
          console.log('val', val)
          this.generatePDF(val.postId)
        },
        (err: HttpErrorResponse) => {
          console.log('err', err)
        }
      )
  }

  generatePDF(id) {
    console.log('generando pdf con ID', id);
    this.activeloadingfull = true;

    this._hojaEnvioService.getPDF(id).pipe(take(1))
      .subscribe(
        val => {
          this.activeloadingfull = false;
          console.log('val', val)
          var fileURL = URL.createObjectURL(val);
          window.open(fileURL)
        },
        (err: HttpErrorResponse) => {
          console.log('err', err)
        }
      )
  }
}
