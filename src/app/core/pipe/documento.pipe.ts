import { Pipe, PipeTransform } from '@angular/core';
import { HttpClienteService } from '@core/services/http-cliente.service';
import { MantenimientoService } from '@core/services/mantenimientos/matenimientos.service';
import { take } from 'rxjs/operators';

@Pipe({
  name: 'documento'
})
export class DocumentoPipe implements PipeTransform {
  documentoList: Array<any>;

  constructor(
    private _mantenimientoService: MantenimientoService
    ) { 
      this.cargarTipoDoc();
    }

  transform(value: any): any {
    const tipoDocumento = this.documentoList
    .filter(documento => documento._id === value)
    .map(documento => documento.name);

    return tipoDocumento[0]
  }

  cargarTipoDoc() {
    this._mantenimientoService.getTipoDocumento().pipe(take(1)).subscribe(val=>{
      this.documentoList = val.tipoDoc;
    });
  }

}
