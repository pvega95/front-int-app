import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ModalCartaComponent } from '../modal-carta/modal-carta.component';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { CartaService } from '@core/services/cartas/carta.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  idProcess: string;
  cartaForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    public formB: FormBuilder,
    public dialog: MatDialog,
    private _location: Location,
    private _cartaService : CartaService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params) {
        this.idProcess = params.id;
        this.getCartaFis(this.idProcess);
      }
    });

    this.cartaForm = this.formB.group({
      descProcForm: new FormControl('', [
        Validators.required
      ]),
      itemForm: new FormControl('', [
        Validators.required
      ]),
      procesoForm: new FormControl('', [
        Validators.required
      ]),
      fechaFiscForm: new FormControl(new Date(), [
        Validators.required
      ]),
      analistaForm: new FormControl('', [
        Validators.required
      ]),
      cartaForm: new FormControl('', [
        Validators.required
      ]),
      empresaForm: new FormControl('', [
        Validators.required
      ]),
      direccionForm: new FormControl('', [
        Validators.required
      ]),
      personaConsForm: new FormControl('', [
        Validators.required
      ]),
      cargoForm: new FormControl('', [
        Validators.required
      ]),
      docForm: new FormControl('', [
        Validators.required
      ]),
      tipoForm: new FormControl('', [
        Validators.required
      ]),
      observacionesForm: new FormControl('', [
        Validators.required
      ]),
      docResForm: new FormControl('', [
        Validators.required
      ]),
      fechaResForm: new FormControl('', [
        Validators.required
      ]),
      docRemisionForm: new FormControl('', [
        Validators.required
      ]),
      conclusionForm: new FormControl('', [
        Validators.required
      ]),
      diasPasadosForm: new FormControl('', [
        Validators.required
      ]),
      procesoDepend: new FormControl('', [
        Validators.required
      ]),
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCartaComponent, {
      // width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        console.log('result',result);
        this.setFormModal(result);
      }

    });
  }

  setFormModal(result){
    this.cartaForm.controls['descProcForm'].setValue(result.description);
    this.cartaForm.controls['itemForm'].setValue(result.items);
    let proceso = result.typeProcedure.name + ' N°' + result.number + ' - ' + result.year
    this.cartaForm.controls['procesoForm'].setValue(proceso);
    this.cartaForm.controls['fechaFiscForm'].setValue(result.date);
    this.cartaForm.controls['procesoDepend'].setValue(result._id);
  }

  goback(){
    this._location.back();
  }

  getCartaFis(id: string) {
    this._cartaService.getByID(id).pipe(take(1)).subscribe(
      val => {
        console.log('val', val)
        this.setForm(val);
      },
      (err: HttpErrorResponse) => {
        console.log('err', err)
      }
    )
  }

  setForm(data){
    this.cartaForm.controls['descProcForm'].setValue(data.descProcForm);
    this.cartaForm.controls['itemForm'].setValue(data.itemForm);
    this.cartaForm.controls['procesoForm'].setValue(data.procesoForm);
    this.cartaForm.controls['fechaFiscForm'].setValue(data.fechaFiscForm);
    this.cartaForm.controls['procesoDepend'].setValue(data.procesoDepend);
    this.cartaForm.controls['analistaForm'].setValue(data.analistaForm);   
    this.cartaForm.controls['cartaForm'].setValue(data.cartaForm);
    this.cartaForm.controls['empresaForm'].setValue(data.empresaForm);
    this.cartaForm.controls['direccionForm'].setValue(data.direccionForm);
    this.cartaForm.controls['personaConsForm'].setValue(data.personaConsForm);
    this.cartaForm.controls['cargoForm'].setValue(data.cargoForm);
    this.cartaForm.controls['docForm'].setValue(data.docForm);
    this.cartaForm.controls['tipoForm'].setValue(data.tipoForm);
    this.cartaForm.controls['observacionesForm'].setValue(data.observacionesForm);
    this.cartaForm.controls['docResForm'].setValue(data.docResForm);
    this.cartaForm.controls['fechaResForm'].setValue(data.fechaResForm);
    this.cartaForm.controls['docRemisionForm'].setValue(data.docRemisionForm);
    this.cartaForm.controls['conclusionForm'].setValue(data.conclusionForm);
    this.cartaForm.controls['diasPasadosForm'].setValue(data.diasPasadosForm);
  }

  onSubmitCarta(miForm: NgForm) {
    // console.log('miForm', miForm.value)
    let data = {
      _id: this.idProcess,
      descProcForm: miForm.value.descProcForm,
      itemForm: miForm.value.itemForm,
      procesoForm: miForm.value.procesoForm,
      fechaFiscForm: miForm.value.fechaFiscForm,
      analistaForm: miForm.value.analistaForm,
      cartaForm: miForm.value.cartaForm,
      empresaForm: miForm.value.empresaForm,
      direccionForm: miForm.value.direccionForm,
      personaConsForm: miForm.value.personaConsForm,
      cargoForm: miForm.value.cargoForm,
      docForm: miForm.value.docForm,
      tipoForm: miForm.value.tipoForm,
      observacionesForm: miForm.value.observacionesForm,
      docResForm: miForm.value.docResForm,
      fechaResForm: miForm.value.fechaResForm,
      docRemisionForm: miForm.value.docRemisionForm,
      conclusionForm: miForm.value.conclusionForm,
      diasPasadosForm: miForm.value.diasPasadosForm,
    }
    console.log('data a enviar',data);
    this._cartaService.setUpdateCarta(data,this.idProcess).pipe(take(1)).subscribe(
      val=>{
        console.log('val',val)
      },(err:HttpErrorResponse)=>{
        console.log('err',err)
      }
    )
  }
}
