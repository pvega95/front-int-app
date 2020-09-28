import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.scss']
})
export class CrearEmpresaComponent implements OnInit {
  myForm: FormGroup
  constructor(
    public formB: FormBuilder,
    private _svgRegisterService: SvgRegisterService,
    private _location: Location,
  ) { 
    this._svgRegisterService.init();
  }

  ngOnInit() {
    this.myForm = this.formB.group({
      nameForm: new FormControl('', [
        Validators.required
      ])
    });
  }

  goback() {
    this._location.back();
  }

  onSubmit(){
    return
  }

}
