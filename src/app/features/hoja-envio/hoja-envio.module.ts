import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { HojaRoutingModule } from './hoja-envio.routing';
import { HojaEnvioComponent } from './hoja-envio.component';



@NgModule({
  declarations: [HojaEnvioComponent],
  imports: [
    CommonModule,
    SharedModule,
    HojaRoutingModule
  ]
})
export class HojaEnvioModule { }
