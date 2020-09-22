import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HojaEnvioService } from '@core/services/hoja-envio/hoja-envio.service';
import { ModalCartaComponent } from '../../carta-fiscalizacion/modal-carta/modal-carta.component';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { MantenimientoService } from '@core/services/mantenimientos/matenimientos.service';
import { ModalHojaComponent } from '../modal-hoja/modal-hoja.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {
  
  hojaEnvioForm: FormGroup;
  documentoList: any;
  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _hojaEnvioService : HojaEnvioService,
    private _location: Location,
    private router : Router,
    private _svgRegisterService:SvgRegisterService,
    private _mantenimientoService: MantenimientoService
  ) { 
    this._svgRegisterService.init();
  }

  ngOnInit() {
    this.cargarTipoDoc();
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
    const dialogRef = this.dialog.open(ModalHojaComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
       
        this.setForm(result);
      }
    });
  }

  setForm(result) {
    console.log(result)
    this.hojaEnvioForm.controls['procesoForm'].setValue(result.procesoForm);
    this.hojaEnvioForm.controls['numRegForm'].setValue(result._id);
  }

  onSubmitHoja(miForm ) {
    if (!miForm.valid) {
      this.snackBar.open('Verificar formulario', 'error', {
        duration: 2000,
      });
    } else {
      let data = {
        numRegister : miForm.value.numRegForm,
        process : miForm.value.procesoForm,
        dateRemision : miForm.value.fechaForm,
        shipNumber : miForm.value.numHojaForm,
        docToRemit : miForm.value.docRemForm,
        typeDocument : miForm.value.tipDocForm
      };
     
      this._hojaEnvioService.setHojaEnvio(data).pipe(take(1))
        .subscribe(
          val=>{
            this.snackBar.open('Registro existoso', 'ok', {
              duration: 2000,
            });
            this.router.navigate(['/main/hoja-envio']) 
          },
          (err:HttpErrorResponse)=>{
            this.snackBar.open('ha ocurrido un error', 'error', {
              duration: 2000,
            });
          }
        );
    }
    
  }

  goback(){
    this._location.back();
  }

  cargarTipoDoc() {
    this._mantenimientoService.getTipoDocumento().subscribe(val=>{
      this.documentoList = val.tipoDoc;
    });
  }
}
