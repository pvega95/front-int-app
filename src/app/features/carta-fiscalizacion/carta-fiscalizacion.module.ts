import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CartaRoutingModule } from './carta-fiscalizacion.routing';
import { CartaFiscalizacionComponent } from './carta-fiscalizacion.component';
import { ModalCartaComponent } from './modal-carta/modal-carta.component';
import { AddComponent } from './add/add.component';



@NgModule({
  declarations: [
    CartaFiscalizacionComponent,
    // ModalCartaComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CartaRoutingModule
  ],
  entryComponents: [ModalCartaComponent]
})
export class CartaFiscalizacionModule { }
