import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GuiaRemisionService } from '@core/services/guia-remision/guia-remision.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ModalGuiaComponent } from '../modal-guia/modal-guia.component';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SvgRegisterService } from '@core/material/svg-register.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  guiaForm: FormGroup;
  idProcess: string;
  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    private _location: Location,
    private _remisionService: GuiaRemisionService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
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
        this.getGuiaRemision(this.idProcess);
      }
    });

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
        
        this.setFormModal(result);
      }
    });
  }

  setFormModal(result) {
    this.guiaForm.controls['descProForm'].setValue(result.procesoForm);
    this.guiaForm.controls['numCartaForm'].setValue(result.cartaForm);
    this.guiaForm.controls['empConsForm'].setValue(result.empresaForm);
    this.guiaForm.controls['descDocForm'].setValue(result.docForm);
    this.guiaForm.controls['personaForm'].setValue(result.personaConsForm);
    this.guiaForm.controls['cargoForm'].setValue(result.cargoForm);
    this.guiaForm.controls['direccionForm'].setValue(result.direccionForm);
  }

  goback() {
    this._location.back();
  }

  getGuiaRemision(id: string) {
    this._remisionService.getByID(id).pipe(take(1)).subscribe(
      val => {
   
        this.setForm(val);
      },
      (err: HttpErrorResponse) => {
      
      }
    )
  }

  setForm(data) {
    this.guiaForm.controls['descProForm'].setValue(data.process);
    this.guiaForm.controls['numCartaForm'].setValue(data.numCarta);
    this.guiaForm.controls['empConsForm'].setValue(data.toConsult);
    this.guiaForm.controls['descDocForm'].setValue(data.description);
    this.guiaForm.controls['personaForm'].setValue(data.person);
    this.guiaForm.controls['cargoForm'].setValue(data.position);
    this.guiaForm.controls['direccionForm'].setValue(data.adress);
  }

  onSubmitGuia(miForm) {
  
    let data = {
      _id: this.idProcess,
      process: miForm.value.descProForm,
      numCarta: miForm.value.numCartaForm,
      toConsult: miForm.value.empConsForm,
      description: miForm.value.descDocForm,
      person: miForm.value.personaForm,
      position: miForm.value.cargoForm,
      adress: miForm.value.direccionForm
    }
   
    this._remisionService.setUpdateGuia(data,this.idProcess).pipe(take(1)).subscribe(
      val=>{
      
        this.openSnackBar('Se actualizo correctamente', 'Ok')
        this.router.navigate(['/main/guia-remision']);
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
