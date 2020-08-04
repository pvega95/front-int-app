import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { TypeDocument } from '@core/services/models/type-document/type-document';
import { ProcesosService } from '@core/services/procesos/procesos.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-process',
  templateUrl: './edit-process.component.html',
  styleUrls: ['./edit-process.component.scss']
})
export class EditProcessComponent implements OnInit {
  registerPersonForm: FormGroup;
  idProcess: string;
  procedureList: any;
  // campo numberForm de los formularios registerPersonForm y registerCompanyForm
  public minLength: object = (new TypeDocument).documents;
  selectMinLength = 1;

  constructor(
    private route: ActivatedRoute,
    public formB: FormBuilder,
    private _processService: ProcesosService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      
      if (params) {
        this.idProcess = params.id;
        this.getProcess(this.idProcess)
      }
    });


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

    this.cargarlistas();
  }

  onSubmitPerson(miForm) {
   
    let data = {
      _id: this.idProcess,
      contract: miForm.value.contratistaForm,
      type_contract: miForm.value.tipoContratistaForm,
      typeProcedure: miForm.value.tipoProcedimientoForm,
      number: miForm.value.numProcedimientoForm,
      year: miForm.value.añoProcesoForm,
      description: miForm.value.descripcionForm,
      date: miForm.value.fechaRecepcionForm,
      items: miForm.value.itemsForm,
      // cod_seg: miForm.value.cod_seg,
    }
    console.log(data);
    this._processService.setUpdateProcess(data,this.idProcess).pipe(take(1)).subscribe(
      val=>{
        
        this.openSnackBar('Se actualizo correctamente', 'Ok')
        this.router.navigate(['/main/proceso']);
      },(err:HttpErrorResponse)=>{
        
      }
    )
  }

  getProcess(id: string) {
    this._processService.getByID(id).pipe(take(1)).subscribe(
      val => {
     
        this.setForm(val);
      },
      (err: HttpErrorResponse) => {
       
      }
    )
  }

  cargarlistas() {
    this._processService.getTypeProcedure().pipe(take(1))
      .subscribe(
        val => {
          this.procedureList = val;
          
        },
        (err: HttpErrorResponse) => {
         
        }
      )
  }

  setForm(data) {
    this.registerPersonForm.controls['contratistaForm'].setValue(data.contract)
    this.registerPersonForm.controls['tipoContratistaForm'].setValue(data.type_contract)
    this.registerPersonForm.controls['tipoProcedimientoForm'].setValue(data.typeProcedure._id)
    this.registerPersonForm.controls['numProcedimientoForm'].setValue(data.number)
    this.registerPersonForm.controls['añoProcesoForm'].setValue(data.year)
    this.registerPersonForm.controls['descripcionForm'].setValue(data.description)
    this.registerPersonForm.controls['fechaRecepcionForm'].setValue(data.date)
    this.registerPersonForm.controls['itemsForm'].setValue(data.items)
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
