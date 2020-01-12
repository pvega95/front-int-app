import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-carta-fiscalizacion',
  templateUrl: './carta-fiscalizacion.component.html',
  styleUrls: ['./carta-fiscalizacion.component.scss']
})
export class CartaFiscalizacionComponent implements OnInit {
  cartaForm: FormGroup;
  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.cartaForm = this.formB.group({
      pnameForm: new FormControl('', [
        Validators.required
      ]),
    });
  }

  onSubmitCarta(miForm : NgForm){
    console.log('miForm',miForm)
  }
}
