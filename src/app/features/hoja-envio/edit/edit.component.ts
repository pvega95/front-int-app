import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HojaEnvioService } from '@core/services/hoja-envio/hoja-envio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalCartaComponent } from '../../carta-fiscalizacion/modal-carta/modal-carta.component';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SvgRegisterService } from '@core/material/svg-register.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  hojaEnvioForm: FormGroup;
  idProcess: string;
  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _hojaEnvioService: HojaEnvioService,
    private _location: Location,
    private route: ActivatedRoute,
    private _svgRegisterService:SvgRegisterService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { 
    this._svgRegisterService.init();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      
      if (params) {
        this.idProcess = params.id;
        this.getHojaEnvio(this.idProcess);
      }
    });

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
      if (result) {
       
        this.setFormModal(result);
      }
    });
  }

  setFormModal(result) {
    this.hojaEnvioForm.controls['numRegForm'].setValue(result._id);
    let proceso = result.typeProcedure.name + 'N°' + result.number + result.year
    this.hojaEnvioForm.controls['procesoForm'].setValue(proceso);
  }

  goback() {
    this._location.back();
  }

  getHojaEnvio(id: string) {
    this._hojaEnvioService.getByID(id).pipe(take(1)).subscribe(
      val => {
        
        this.setForm(val);
      },
      (err: HttpErrorResponse) => {
       
      }
    )
  }

  setForm(data) {
    this.hojaEnvioForm.controls['numRegForm'].setValue(data.NumRegister);
    this.hojaEnvioForm.controls['procesoForm'].setValue(data.Process);
    this.hojaEnvioForm.controls['fechaForm'].setValue(data.DateRemision);
    this.hojaEnvioForm.controls['numHojaForm'].setValue(data.ShipNumber);
    this.hojaEnvioForm.controls['docRemForm'].setValue(data.DocToRemit);
    this.hojaEnvioForm.controls['tipDocForm'].setValue(data.TypeDocument);
  }

  onSubmitHoja(miForm) {
 
    let data = {
      _id: this.idProcess,
      NumRegister: miForm.value.numRegForm,
      Process: miForm.value.procesoForm,
      DateRemision: miForm.value.fechaForm,
      ShipNumber: miForm.value.numHojaForm,
      DocToRemit: miForm.value.docRemForm,
      TypeDocument: miForm.value.tipDocForm,
    }
  
    this._hojaEnvioService.setUpdateHoja(data,this.idProcess).pipe(take(1)).subscribe(
      val=>{
      
        this.openSnackBar('Se actualizo correctamente', 'Ok')
        this.router.navigate(['/main/hoja-envio']);
      },(err:HttpErrorResponse)=>{
       
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
