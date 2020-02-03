import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CartaService } from '@core/services/cartas/carta.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalCartaComponent } from '../modal-carta/modal-carta.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  
  cartaForm: FormGroup;
  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    private _cartaService : CartaService,
    public dialog: MatDialog
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
      procesoDepend: new FormControl('', [
        Validators.required
      ]),
    });
  }

  onSubmitCarta(miForm : NgForm){
    console.log('miForm',miForm.value)
    let data = miForm.value
    console.log('data a enviar',data);
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

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCartaComponent, {
      // width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result',result);
      this.setForm(result);
    });
  }

  setForm(result){
    this.cartaForm.controls['descProcForm'].setValue(result.description);
    this.cartaForm.controls['itemForm'].setValue(result.items);
    let proceso = result.typeProcedure.name + ' N°' + result.number + ' - ' + result.year
    this.cartaForm.controls['procesoForm'].setValue(proceso);
    this.cartaForm.controls['fechaFiscForm'].setValue(result.date);
    this.cartaForm.controls['procesoDepend'].setValue(result._id);
  }

}
