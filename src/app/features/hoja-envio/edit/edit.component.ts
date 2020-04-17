import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HojaEnvioService } from '@core/services/hoja-envio/hoja-envio.service';
import { Router } from '@angular/router';
import { ModalCartaComponent } from '../../carta-fiscalizacion/modal-carta/modal-carta.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  hojaEnvioForm: FormGroup;
  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _hojaEnvioService : HojaEnvioService,
    private _location: Location,
    private router : Router
  ) { }

  ngOnInit() {
    this.hojaEnvioForm = this.formB.group({
      numRegForm: new FormControl('', [
        Validators.required
      ]),
      procesoForm: new FormControl('', [
        Validators.required
      ]),
      fechaForm: new FormControl('', [
        Validators.required
      ]),
      numHojaForm: new FormControl('', [
        Validators.required
      ]),
      docRemForm: new FormControl('', [
        Validators.required
      ]),
      tipDocForm: new FormControl('', [
        Validators.required
      ]),
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCartaComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        console.log('result',result);
        this.setForm(result);
      }
    });
  }

  setForm(result) {
    this.hojaEnvioForm.controls['numRegForm'].setValue(result._id);
    let proceso = result.typeProcedure.name + 'N°' + result.number + result.year
    this.hojaEnvioForm.controls['procesoForm'].setValue(proceso);
  }

  goback(){
    this._location.back();
  }

}
