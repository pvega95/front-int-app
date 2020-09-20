import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { TypeDocument } from '@core/services/models/type-document/type-document';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Image } from '@core/interfaces/image-interface';
import { ProcesosService } from '@core/services/procesos/procesos.service';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MantenimientoService } from '@core/services/mantenimientos/matenimientos.service';

@Component({
  selector: 'app-create-process',
  templateUrl: './create-process.component.html',
  styleUrls: ['./create-process.component.scss']
})
export class CreateProcessComponent implements OnInit {
  procedureList : any;
  tipoContratistaList : any;
  registerPersonForm: FormGroup;
  public minLength: object = (new TypeDocument).documents;
  selectMinLength = 1;


public uploader: FileUploader;

  constructor(
    public _dashboardService: DashboardService,
    private router: Router,
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    private _svgRegisterService:SvgRegisterService,
    private _processService : ProcesosService,
    private _mantenimientoService: MantenimientoService
  ) {
    this._svgRegisterService.init();
   }

  ngOnInit() {
    
    this.cargarlistas();
    this.cargarTipoContratista();

    this.registerPersonForm = this.formB.group({
      contratistaForm: new FormControl('', [
        Validators.required
      ]),
      tipoContratistaForm: new FormControl('', [
        Validators.required
      ]),
      tipoProcedimientoForm: new FormControl('', [
        Validators.required
      ]),
      numProcedimientoForm: new FormControl('', [
        Validators.required
      ]),
      añoProcesoForm: new FormControl('', [
        Validators.required
      ]),
      descripcionForm: new FormControl('', [
        Validators.required
      ]),
      fechaRecepcionForm: new FormControl(new Date()),
      itemsForm: new FormControl('', [
        Validators.required
      ]),

    });

  }

  onPdocFormChange(e) {
    this.selectMinLength = e.value;
    // actualiza los validadores del campo numero de documento
    this.registerPersonForm.controls['pnumberForm'].setValidators([
      Validators.required,
      Validators.minLength(this.minLength[this.selectMinLength].length),
      Validators.maxLength(this.minLength[this.selectMinLength].length)
    ]);
    // vuelve a cargar la validacion del campo del formulario
    this.registerPersonForm.controls['pnumberForm'].updateValueAndValidity();
  }

  onSubmitPerson(miForm ){
    // miForm = this.registerPersonForm.value
    if (!miForm.valid) {
      this.snackBar.open('Verificar formulario', 'error', {
        duration: 2000,
      });
    }else {
      let data = {
        contract: miForm.value.contratistaForm,
        type_contract: miForm.value.tipoContratistaForm,
        typeProcedure: miForm.value.tipoProcedimientoForm,
        number: miForm.value.numProcedimientoForm,
        year: miForm.value.añoProcesoForm,
        description: miForm.value.descripcionForm,
        date: miForm.value.fechaRecepcionForm,
        items: miForm.value.itemsForm
    }
  
      this._processService.setProcess(data).pipe(take(1))
        .subscribe(res=>{
          this.snackBar.open('Registro existoso', 'ok', {
            duration: 2000,
          });
          // this.router.navigate(['/main/proceso']);
        },(err : HttpErrorResponse)=>{
          this.snackBar.open('ha ocurrido un error', 'error', {
            duration: 2000,
          });
        });
    }
    
  }

  cargarTipoContratista(){
    this._mantenimientoService.getTipoContratista().pipe(take(1))
      .subscribe(
        val=>{
          this.tipoContratistaList = val.tipoConstratistas;
        },
        (err:HttpErrorResponse)=>{
      
        }
      )
  }



  cargarlistas(){
    this._processService.getTypeProcedure().pipe(take(1))
      .subscribe(
        val=>{
          this.procedureList = val;
         
        },
        (err:HttpErrorResponse)=>{
      
        }
      )
  }

}
