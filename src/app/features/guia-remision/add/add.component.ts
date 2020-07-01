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
  guiaForm : FormGroup
  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
    private _location:Location,
    private _remisionService : GuiaRemisionService,
    private router : Router,
    public dialog: MatDialog,
    private _svgRegisterService:SvgRegisterService,
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
      if (result){
 
        this.setForm(result);
      }
    });
  }

  setForm(result){
    this.guiaForm.controls['descProForm'].setValue(result.procesoForm);
    this.guiaForm.controls['numCartaForm'].setValue(result.cartaForm);
    this.guiaForm.controls['empConsForm'].setValue(result.empresaForm);
    this.guiaForm.controls['descDocForm'].setValue(result.docForm);
    this.guiaForm.controls['personaForm'].setValue(result.personaConsForm);
    this.guiaForm.controls['cargoForm'].setValue(result.cargoForm);
    this.guiaForm.controls['direccionForm'].setValue(result.direccionForm);
    // this.cartaForm.controls['descProcForm'].setValue(result.description);
    // this.cartaForm.controls['itemForm'].setValue(result.items);
    // let proceso = result.typeProcedure.name + ' N°' + result.number + ' - ' + result.year
    // this.cartaForm.controls['procesoForm'].setValue(proceso);
    // this.cartaForm.controls['fechaFiscForm'].setValue(result.date);
    // this.cartaForm.controls['procesoDepend'].setValue(result._id);
  }

  onSubmitGuia(miForm ){
    
    let data = {
      'process' : miForm.value.descProForm,
      'numCarta':miForm.value.numCartaForm,
      'toConsult':miForm.value.empConsForm,
      'description':miForm.value.descDocForm,
      'person': miForm.value.personaForm,
      'position': miForm.value.cargoForm,
      'adress': miForm.value.direccionForm,
    }
   
    this._remisionService.setGuiaRemision(data).pipe(take(1))
      .subscribe(
        val=>{
         
          this.router.navigate(['/main/guia-remision'])
        },
        (err:HttpErrorResponse)=>{
         
        }
      )
  }

  goback(){
    this._location.back();
  }

}
