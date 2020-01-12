import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CartaRoutingModule } from './carta-fiscalizacion.routing';
import { CartaFiscalizacionComponent } from './carta-fiscalizacion.component';



@NgModule({
  declarations: [
    CartaFiscalizacionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CartaRoutingModule
  ]
})
export class CartaFiscalizacionModule { }
