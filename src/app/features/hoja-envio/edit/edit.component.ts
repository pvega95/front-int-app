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
import { MantenimientoService } from '@core/services/mantenimientos/matenimientos.service';
import { ModalHojaComponent } from '../modal-hoja/modal-hoja.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  hojaEnvioForm: FormGroup;
  idProcess: string;
  documentoList: any;
  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _hojaEnvioService: HojaEnvioService,
    private _location: Location,
    private route: ActivatedRoute,
    private _svgRegisterService:SvgRegisterService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _mantenimientoService: MantenimientoService
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
      if (result) {
       
        this.setFormModal(result);
      }
    });
  }

  setFormModal(result) {
    console.log(result)
    this.hojaEnvioForm.controls['procesoForm'].setValue(result.procesoForm);
    this.hojaEnvioForm.controls['numRegForm'].setValue(result._id);
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
    this.hojaEnvioForm.controls['numRegForm'].setValue(data.numRegister);
    this.hojaEnvioForm.controls['procesoForm'].setValue(data.process);
    this.hojaEnvioForm.controls['fechaForm'].setValue(data.dateRemision);
    this.hojaEnvioForm.controls['numHojaForm'].setValue(data.shipNumber);
    this.hojaEnvioForm.controls['docRemForm'].setValue(data.docToRemit);
    this.hojaEnvioForm.controls['tipDocForm'].setValue(data.typeDocument);
  }

  onSubmitHoja(miForm) {
 
    let data = {
      _id: this.idProcess,
      numRegister: miForm.value.numRegForm,
      process: miForm.value.procesoForm,
      dateRemision: miForm.value.fechaForm,
      shipNumber: miForm.value.numHojaForm,
      docToRemit: miForm.value.docRemForm,
      typeDocument: miForm.value.tipDocForm,
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

  cargarTipoDoc() {
    this._mantenimientoService.getTipoDocumento().subscribe(val=>{
      this.documentoList = val.tipoDoc;
    });
  }
}
