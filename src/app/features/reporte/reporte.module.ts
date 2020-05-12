import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ReporteRoutingModule } from './reporte-routing.module';
import { ReporteComponent } from './reporte.component';
import { GraficaDonaComponent } from '@shared/grafica-dona/grafica-dona.component';



@NgModule({
  declarations: [ReporteComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReporteRoutingModule
  ]
})
export class ReporteModule { }
