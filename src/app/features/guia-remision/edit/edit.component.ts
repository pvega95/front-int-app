import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GuiaRemisionService } from '@core/services/guia-remision/guia-remision.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalGuiaComponent } from '../modal-guia/modal-guia.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  guiaForm : FormGroup
  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    private _location:Location,
    private _remisionService : GuiaRemisionService,
    private router : Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

    this.guiaForm = this.formB.group({
      descProForm: new FormControl('', [
        Validators.required
      ]),
      numCartaForm: new FormControl('', [
        Validators.required
      ]),
      empConsForm: new FormControl('', [
        Validators.required
      ]),
      descDocForm: new FormControl('', [
        Validators.required
      ]),
      personaForm: new FormControl('', [
        Validators.required
      ]),
      cargoForm: new FormControl('', [
        Validators.required
      ]),
      direccionForm: new FormControl('', [
        Validators.required
      ])
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalGuiaComponent, {
      // width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        console.log('result',result);
        this.setForm(result);
      }
    });
  }

  setForm(result){
    this.guiaForm.controls['descProForm'].setValue(result.descProcForm);
    this.guiaForm.controls['numCartaForm'].setValue(result.cartaForm);
    this.guiaForm.controls['empConsForm'].setValue(result.empresaForm);
    this.guiaForm.controls['descDocForm'].setValue(result.docForm);
    this.guiaForm.controls['personaForm'].setValue(result.personaConsForm);
    this.guiaForm.controls['cargoForm'].setValue(result.cargoForm);
    this.guiaForm.controls['direccionForm'].setValue(result.direccionForm);
  }

  goback(){
    this._location.back();
  }

}
