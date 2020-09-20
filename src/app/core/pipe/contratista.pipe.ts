import { Pipe, PipeTransform } from '@angular/core';
import { MantenimientoService } from '@core/services/mantenimientos/matenimientos.service';
import { take } from 'rxjs/operators';


@Pipe({
    name: 'contratista'
  })
  export class ConstratistaPipe implements PipeTransform {
    tipoContratistaList: Array<any>;
  
    constructor(
      private _mantenimientoService: MantenimientoService
      ) { 
        this.cargarTipoContratista();
      }
  
    transform(value: string): any {
      const tipoContratista = this.tipoContratistaList
      .filter(contratista => contratista._id === value)
      .map(contratista => contratista.name);
  
      return tipoContratista[0]
    }
  
    cargarTipoContratista() {
      this._mantenimientoService.getTipoContratista().pipe(take(1)).subscribe(val=>{
        this.tipoContratistaList = val.tipoDoc;
      });
    }
  
  }