import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartaService } from '@core/services/cartas/carta.service';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-model-one',
  templateUrl: './model-one.component.html',
  styleUrls: ['./model-one.component.scss']
})

export class ModelOneComponent implements OnInit {
  message: {};
  idRecieved: string;
  messageService: Subscription;
  modelOneForm: FormGroup;
  public nombreEmpresa : string;
  // interfaz
  activeloadingfull = false;
  constructor(
    private route: ActivatedRoute,
    private _cartaService: CartaService,
    public formB: FormBuilder,
    private _location: Location,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params) {
        this.idRecieved = params.id;
        this.getCartaFis(this.idRecieved);
      }
    });


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
      fechaActualForm: new FormControl('', [
        Validators.required
      ]),
      descProcTwoForm: new FormControl('', [
        Validators.required
      ]),
      descProcThreeForm: new FormControl(''),
      nombEmpForm: new FormControl(''),
      pronomForm: new FormControl(''),
      optionalOneForm: new FormControl(''),
      // descProcForm : new FormControl('', [
      //   Validators.required
      // ])
    });

  }

  getCartaFis(id: string) {
    this._cartaService.getByID(id).pipe(take(1)).subscribe(
      val => {
        this.setForm(val);
      },
      (err: HttpErrorResponse) => {
      }
    )
  }

  setForm(data) {
    this.nombreEmpresa = data.procesoDepend.contract;
    this.modelOneForm.controls['nombEmpForm'].setValue(data.procesoDepend.contract);
    this.modelOneForm.controls['personaConsForm'].setValue(data.personaConsForm);
    this.modelOneForm.controls['cartaForm'].setValue(data.cartaForm);
    this.modelOneForm.controls['cargoForm'].setValue(data.cargoForm);
    this.modelOneForm.controls['empresaForm'].setValue(data.empresaForm);
    this.modelOneForm.controls['direccionForm'].setValue(data.direccionForm);
    this.modelOneForm.controls['tipoForm'].setValue(data.tipoForm);
    this.modelOneForm.controls['docForm'].setValue(data.docForm);
    this.modelOneForm.controls['pronomForm'].setValue('Al respecto, la empresa ' + this.nombreEmpresa +
                                                      ' ha presentado copia del documento señalado en el cuadro precedente en el procedimiento de selección ');
    this.modelOneForm.controls['fechaActualForm'].setValue(this.datePipe.transform(new Date(), 'fullDate').replace(",", ""));
    this.modelOneForm.controls['procesoForm'].setValue(data.procesoForm);
    this.modelOneForm.controls['descProcTwoForm'].setValue('Sobre el particular, de conformidad con lo dispuesto en el artículo 33° de la Ley N° 27444 de Procedimiento' +
                                                            ' Administrativo General y, en concordancia con el numeral 64.6 del artículo 64° del Reglamento de la Ley de ' +
                                                            'Contrataciones del Estado, normas aplicables al presente caso; se realiza la acción de fiscalización posterior, ' +
                                                            'agradeciéndole nos indique expresamente la veracidad de los documentos señalados en el cuadro precedente presentada por el contratista ' +
                                                            this.nombreEmpresa + ' ' +
                                                            'en mención. Adjuntandose las respectivas copias.');
    this.modelOneForm.controls['descProcThreeForm'].setValue('Por lo expuesto, apreciaré su pronunciamiento dentro del plazo de cinco (5) días hábiles' +
                                                              ' de recibida la presente comunicación.');

    this.modelOneForm.controls['descProcForm'].setValue(data.procesoForm + ' ' + data.descProcForm);
  }

  goback() {
    this._location.back();
  }

  generate() {

    let data = this.modelOneForm.value
    this._cartaService.setCartTwo(data).pipe(take(1))
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

    this._cartaService.getPDF(id).pipe(take(1))
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
