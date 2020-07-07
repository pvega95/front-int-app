import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { GuiaRemisionService } from '@core/services/guia-remision/guia-remision.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModalGuiaComponent } from '../modal-guia/modal-guia.component';
import { SvgRegisterService } from '@core/material/svg-register.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  guiaForm: FormGroup
  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    private _location: Location,
    private _remisionService: GuiaRemisionService,
    private router: Router,
    public dialog: MatDialog,
    private _svgRegisterService: SvgRegisterService,
  ) {
    this._svgRegisterService.init();
  }

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
      if (result) {

        this.setForm(result);
      }
    });
  }

  setForm(result) {
    this.guiaForm.controls['descProForm'].setValue(result.procesoForm);
    this.guiaForm.controls['numCartaForm'].setValue(result.cartaForm);
    this.guiaForm.controls['empConsForm'].setValue(result.empresaForm);
    this.guiaForm.controls['descDocForm'].setValue(result.docForm);
    this.guiaForm.controls['personaForm'].setValue(result.personaConsForm);
    this.guiaForm.controls['cargoForm'].setValue(result.cargoForm);
    this.guiaForm.controls['direccionForm'].setValue(result.direccionForm);
  }

  onSubmitGuia(miForm) {
    if (!miForm.valid) {
      this.snackBar.open('Verificar formulario', 'error', {
        duration: 2000,
      });
    } else {
      let data = {
        'process': miForm.value.descProForm,
        'numCarta': miForm.value.numCartaForm,
        'toConsult': miForm.value.empConsForm,
        'description': miForm.value.descDocForm,
        'person': miForm.value.personaForm,
        'position': miForm.value.cargoForm,
        'adress': miForm.value.direccionForm,
      }

      this._remisionService.setGuiaRemision(data).pipe(take(1))
        .subscribe(
          val => {
            this.snackBar.open('Registro existoso', 'ok', {
              duration: 2000,
            });
            this.router.navigate(['/main/guia-remision'])
          },
          (err: HttpErrorResponse) => {
            this.snackBar.open('ha ocurrido un error', 'error', {
              duration: 2000,
            });
          }
        );
    }

  }

  goback() {
    this._location.back();
  }

}
