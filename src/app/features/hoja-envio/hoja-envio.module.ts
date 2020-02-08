import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { HojaRoutingModule } from './hoja-envio.routing';
import { HojaEnvioComponent } from './hoja-envio.component';
import { ModalCartaComponent } from '../carta-fiscalizacion/modal-carta/modal-carta.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [HojaEnvioComponent, AddComponent],
  imports: [
    CommonModule,
    SharedModule,
    HojaRoutingModule
  ],
  entryComponents: [ModalCartaComponent]
})
export class HojaEnvioModule { }
