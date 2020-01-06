import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/****** Shared Module ******/
import { SharedModule } from '@shared/shared.module';
import { ProcesoComponent } from './proceso.component';
import { ProcesoRoutingModule } from './proceso-routing.module';

@NgModule({
  declarations: [ProcesoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProcesoRoutingModule
  ]
})
export class ProcesoModule { }