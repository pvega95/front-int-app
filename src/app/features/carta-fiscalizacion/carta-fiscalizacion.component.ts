import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CartaService } from '@core/services/cartas/carta.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

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
    private _cartaService : CartaService
  ) { }

  ngOnInit() {
    this.cartaForm = this.formB.group({
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
      procesoDepend: new FormControl('5e2485201238f72bf8c0e140', [
        Validators.required
      ]),
    });
  }

  onSubmitCarta(miForm : NgForm){
    console.log('miForm',miForm.value)
    let data = miForm.value
    console.log('data a enviar')
    this._cartaService.setCart(data).pipe(take(1))
      .subscribe(
        val=>{
          console.log('val',val)
        },
        (err : HttpErrorResponse)=>{
          console.log('err',err)
        }
      )
    
  }
}
