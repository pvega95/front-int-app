import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MantenimientoRoutingModule } from './mantenimiento.routing';
import { TipoEmpresaComponent } from './tipo-empresa/tipo-empresa.component';
import { CrearEmpresaComponent } from './tipo-empresa/crear-editar/crear-editar.component';
import { ListarComponent } from './tipo-empresa/listar/listar.component';


@NgModule({
  declarations: [TipoEmpresaComponent, CrearEmpresaComponent, ListarComponent],
  imports: [
    CommonModule,
    SharedModule,
    MantenimientoRoutingModule
  ]
})
export class MantenimientoModule { }
