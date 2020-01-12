import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { GuiaRemisionComponent } from './guia-remision.component';
import { GuiaRoutingModule } from './guia-remision.routing';



@NgModule({
  declarations: [GuiaRemisionComponent],
  imports: [
    CommonModule,
    SharedModule,
    GuiaRoutingModule
  ]
})
export class GuiaRemisionModule { }
