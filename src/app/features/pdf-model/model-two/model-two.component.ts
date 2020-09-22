import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartaService } from '@core/services/cartas/carta.service';
import { HojaEnvioService } from '@core/services/hoja-envio/hoja-envio.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-model-two',
  templateUrl: './model-two.component.html',
  styleUrls: ['./model-two.component.scss']
})
export class ModelTwoComponent implements OnInit {
  message: {};
  modelOneForm: FormGroup;
  idRecieved: string;
  // interfaz
  activeloadingfull = false;

  constructor(
    public formB: FormBuilder,
    private _location: Location,
    private _hojaEnvioService: HojaEnvioService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params) {
        this.idRecieved = params.id;
        this.getHojaEnvio(this.idRecieved);
      }
    });

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

  }

  getHojaEnvio(id: string) {
    this._hojaEnvioService.getByID(id).pipe(take(1)).subscribe(
      val => {
        
        this.setForm(val);
      },
      (err: HttpErrorResponse) => {
       
      }
    )
  }

  setForm(data) {
    this.modelOneForm.controls['personaConsForm'].setValue(data.numRegister.personaConsForm);
    this.modelOneForm.controls['cargoForm'].setValue(data.numRegister.cargoForm);
    this.modelOneForm.controls['personaConsForm2'].setValue('MARCO ANTONIO LEÓN ARANGUREN');
    this.modelOneForm.controls['cargoForm2'].setValue('JEFE DE SEC. PROGRAMACIÓN Y EVALUACIÓN');
    this.modelOneForm.controls['referenciaForm'].setValue(data.process);
    this.modelOneForm.controls['observacionForm'].setValue('Remito a su despacho original de la referencia, en respuesta de la carta N°' + data.numRegister.cartaForm + ', para su archivo en el expediente y seguimiento de  fiscalización posterior realizada al proceso ' + data.process);
  }

  goback() {
    this._location.back();
  }

  generate() {
   
    let data = this.modelOneForm.value
  
    this._hojaEnvioService.setHojaEnvioTwo(data).pipe(take(1))
      .subscribe(
        val => {
     
          this.generatePDF(val.postId)
        },
        (err: HttpErrorResponse) => {
        
        }
      )
  }

  generatePDF(id) {
    
    this.activeloadingfull = true;

    this._hojaEnvioService.getPDF(id).pipe(take(1))
      .subscribe(
        val => {
          this.activeloadingfull = false;
        
          var fileURL = URL.createObjectURL(val);
          window.open(fileURL)
        },
        (err: HttpErrorResponse) => {
       
        }
      )
  }
}
