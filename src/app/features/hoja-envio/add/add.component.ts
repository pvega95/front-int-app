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

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {
  
  hojaEnvioForm: FormGroup;
  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _hojaEnvioService : HojaEnvioService,
    private _location: Location,
    private router : Router,
    private _svgRegisterService:SvgRegisterService,
  ) { 
    this._svgRegisterService.init();
  }

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
       
        this.setForm(result);
      }
    });
  }

  setForm(result) {
    this.hojaEnvioForm.controls['numRegForm'].setValue(result._id);
    let proceso = result.typeProcedure.name + ' N° ' + result.number + ' - ' + result.year
    this.hojaEnvioForm.controls['procesoForm'].setValue(proceso);
  }

  onSubmitHoja(miForm ) {
    
    let data = {
      NumRegister : miForm.value.numRegForm,
      Process : miForm.value.procesoForm,
      DateRemision : miForm.value.fechaForm,
      ShipNumber : miForm.value.numHojaForm,
      DocToRemit : miForm.value.docRemForm,
      TypeDocument : miForm.value.tipDocForm
    }
   

    this._hojaEnvioService.setHojaEnvio(data).pipe(take(1))
      .subscribe(
        val=>{
        
          this.router.navigate(['/main/hoja-envio']) 
        },
        (err:HttpErrorResponse)=>{
         
        }
      )
  }

  goback(){
    this._location.back();
  }
}
