import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { HojaRoutingModule } from './hoja-envio.routing';
import { HojaEnvioComponent } from './hoja-envio.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ModalHojaComponent } from './modal-hoja/modal-hoja.component';

@NgModule({
  declarations: [HojaEnvioComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    SharedModule,
    HojaRoutingModule
  ],
  entryComponents: [ModalHojaComponent]
})

export class HojaEnvioModule { }
