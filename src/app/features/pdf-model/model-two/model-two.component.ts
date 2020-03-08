import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-model-two',
  templateUrl: './model-two.component.html',
  styleUrls: ['./model-two.component.scss']
})
export class ModelTwoComponent implements OnInit {
  modelOneForm : FormGroup;
  constructor(
    public formB: FormBuilder,
    private _location:Location,
  ) { }

  ngOnInit() {
    this.modelOneForm = this.formB.group({
      // descProcForm: new FormControl('', [
      //   Validators.required
      // ]),
      // itemForm: new FormControl('', [
      //   Validators.required
      // ]),
      // procesoForm: new FormControl('', [
      //   Validators.required
      // ]),
      // fechaFiscForm: new FormControl(new Date(), [
      //   Validators.required
      // ]),
      // analistaForm: new FormControl('', [
      //   Validators.required
      // ]),
      // cartaForm: new FormControl('', [
      //   Validators.required
      // ]),
      // empresaForm: new FormControl('', [
      //   Validators.required
      // ]),
      // direccionForm: new FormControl('', [
      //   Validators.required
      // ]),


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
      referenciaForm: new FormControl('',[
        Validators.required
      ]),
      check1: new FormControl(true,[
        Validators.required
      ]),
      check2: new FormControl(true,[
        Validators.required
      ]),
      check3: new FormControl(true,[
        Validators.required
      ]),
      check4: new FormControl(true,[
        Validators.required
      ]),
      check5: new FormControl(true,[
        Validators.required
      ]),
      check6: new FormControl(true,[
        Validators.required
      ]),
      check7: new FormControl(true,[
        Validators.required
      ]),
      check8: new FormControl(true,[
        Validators.required
      ]),


      // docForm: new FormControl('', [
      //   Validators.required
      // ]),
      // tipoForm: new FormControl('', [
      //   Validators.required
      // ]),
      // observacionesForm: new FormControl('', [
      //   Validators.required
      // ]),
      // docResForm: new FormControl('', [
      //   Validators.required
      // ]),
      // fechaResForm: new FormControl('', [
      //   Validators.required
      // ]),
      // docRemisionForm: new FormControl('', [
      //   Validators.required
      // ]),
      // conclusionForm: new FormControl('', [
      //   Validators.required
      // ]),
      // diasPasadosForm: new FormControl('', [
      //   Validators.required
      // ]),
      // procesoDepend: new FormControl('', [
      //   Validators.required
      // ]),
      // descriptionForm : new FormControl('', [
      //   Validators.required
      // ])
    });
  }

  setForm(data){
    console.log('data',data)
    this.modelOneForm.controls['personaConsForm'].setValue(data.personaConsForm);
    this.modelOneForm.controls['personaConsForm2'].setValue(data.cargoForm);
    this.modelOneForm.controls['cargoForm'].setValue(data.empresaForm);
    this.modelOneForm.controls['cargoForm2'].setValue(data.direccionForm);
    this.modelOneForm.controls['referenciaForm'].setValue(data.tipoForm);
    this.modelOneForm.controls['check1'].setValue(data.docForm);
    this.modelOneForm.controls['check2'].setValue(data.procesoDepend.description);  
    this.modelOneForm.controls['check3'].setValue(data.cargoForm);
    this.modelOneForm.controls['check4'].setValue(data.empresaForm);
    this.modelOneForm.controls['check5'].setValue(data.direccionForm);
    this.modelOneForm.controls['check6'].setValue(data.tipoForm);
    this.modelOneForm.controls['check7'].setValue(data.docForm);
    this.modelOneForm.controls['check8'].setValue(data.procesoDepend.description);  
  }

  goback(){
    this._location.back();
  }

}
