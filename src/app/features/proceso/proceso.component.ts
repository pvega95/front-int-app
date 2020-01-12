import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { TypeDocument } from '@core/services/models/type-document/type-document';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss']
})
export class ProcesoComponent implements OnInit {

  registerPersonForm: FormGroup;
// campo numberForm de los formularios registerPersonForm y registerCompanyForm
public minLength: object = (new TypeDocument).documents;
selectMinLength = 1;

// pais select
country: any;
listCountry = [];

  constructor(
    public _dashboardService: DashboardService,
    private router: Router,
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    private _svgRegisterService:SvgRegisterService,
  ) { 
    this._dashboardService.setDashboardStatus(true);
  }

  ngOnInit() {

    this.registerPersonForm = this.formB.group({
      pdocForm: new FormControl(1, [
        Validators.required
      ]),
      pnumberForm: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minLength[this.selectMinLength].length),
        Validators.maxLength(this.minLength[this.selectMinLength].length)
      ]),
      pemailForm: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)
      ]),
      pnameForm: new FormControl('', [
        Validators.required
      ]),
      psurnameForm: new FormControl('', [
        Validators.required
      ]),
      plastnameForm: new FormControl('', [
        Validators.required
      ]),
      ppassForm: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      pcountryForm: new FormControl('pe', [
        Validators.required
      ]),
      pphoneForm: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ]),
      pcodeForm: new FormControl('12345', [
        Validators.required
      ]),
      // ptermForm: new FormControl(true, [
      //   Validators.requiredTrue
      // ])
    });

    // Inicializamos el valor del pais selecionado
    this.country = {
      abbreviation: "pe",
      codePhone: "+51",
      name: "peru"
    }

  }

  onPdocFormChange(e) {
    this.selectMinLength = e.value;
    // actualiza los validadores del campo numero de documento
    this.registerPersonForm.controls['pnumberForm'].setValidators([
      Validators.required,
      Validators.minLength(this.minLength[this.selectMinLength].length),
      Validators.maxLength(this.minLength[this.selectMinLength].length)
    ]);
    // vuelve a cargar la validacion del campo del formulario
    this.registerPersonForm.controls['pnumberForm'].updateValueAndValidity();
  }

  onSubmitPerson(miForm : NgForm){
    miForm = this.registerPersonForm.value
    console.log('miForm',miForm)
  }

}
