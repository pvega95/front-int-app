import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CartaRoutingModule } from './carta-fiscalizacion.routing';
import { CartaFiscalizacionComponent } from './carta-fiscalizacion.component';
import { ModalCartaComponent } from './modal-carta/modal-carta.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ProcesoModalComponent } from '../proceso/proceso-modal/proceso-modal.component';
import { AnalistaPipe } from '@core/pipe/analista.pipe';



@NgModule({
  declarations: [
    CartaFiscalizacionComponent,
    // ModalCartaComponent,
    AddComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CartaRoutingModule
  ],
  providers: [
    AnalistaPipe
  ],
  entryComponents: [ModalCartaComponent]
})
export class CartaFiscalizacionModule { }
