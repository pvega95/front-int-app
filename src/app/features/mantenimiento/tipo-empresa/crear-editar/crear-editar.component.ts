import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SvgRegisterService } from '@core/material/svg-register.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MantenimientoService } from '@core/services/mantenimientos/matenimientos.service';
import { map, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.scss']
})
export class CrearEmpresaComponent implements OnInit {
  myForm: FormGroup;
  idProcess: string;
  constructor(
    public formB: FormBuilder,
    private _svgRegisterService: SvgRegisterService,
    private _location: Location,
    private route: ActivatedRoute,
    private _mntService: MantenimientoService,
    private _snackBar: MatSnackBar,
  ) {
    this._svgRegisterService.init();
  }

  ngOnInit() {
    this.route.queryParams
    .subscribe(({id}) => {
      if (id) {
        this.idProcess = id;
        this.getEmpresa(this.idProcess);
      }
    });

    this.myForm = this.formB.group({
      nameForm: new FormControl('', [
        Validators.required
      ])
    });
  }

  goback() {
    this._location.back();
  }

  getEmpresa(id: string) {
    this._mntService.getTipoEmpresaById(id)
      .pipe(
        map(x => x.tipoEmpresa)
      )
      .subscribe((x) => {
        this.loadForm(x.name);
      })
  }

  loadForm(value: string) {
    this.myForm.get('nameForm').setValue(value)
  }

  onSubmit() {
    if (this.idProcess) {

      let data = {
        _id: this.idProcess,
        name: this.myForm.get('nameForm').value,
      }

      this._mntService.actualizarTipoEmpresa(data, this.idProcess).pipe(take(1)).subscribe(
        val => {
          console.log(val);
          this.openSnackBar('Se actualizo correctamente', 'Ok')
          this.goback();
        }, (err: HttpErrorResponse) => {

        }
      );

    } else {

      let data = {
        name: this.myForm.get('nameForm').value,
      }

      this._mntService.crearTipoEmpresa(data).pipe(take(1)).subscribe(
        val => {
          if(val) {
            this.openSnackBar('Entidad creada correctamente', 'Ok');
            this.goback();
          }
        }
      )
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
