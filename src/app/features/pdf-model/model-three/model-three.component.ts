import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-model-three',
  templateUrl: './model-three.component.html',
  styleUrls: ['./model-three.component.scss']
})
export class ModelThreeComponent implements OnInit {
  modelOneForm : FormGroup;
  constructor(
    public formB: FormBuilder,
    private _location:Location
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
      ])
    });
  }

  goback(){
    this._location.back();
  }

}
