import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-hoja-envio',
  templateUrl: './hoja-envio.component.html',
  styleUrls: ['./hoja-envio.component.scss']
})
export class HojaEnvioComponent implements OnInit {
  hojaEnvioForm: FormGroup;
  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.hojaEnvioForm = this.formB.group({
      pnameForm: new FormControl('', [
        Validators.required
      ]),
    });
  }

}
