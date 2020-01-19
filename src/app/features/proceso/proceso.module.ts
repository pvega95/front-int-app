import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/****** Shared Module ******/
import { SharedModule } from '@shared/shared.module';
import { ProcesoComponent } from './proceso.component';
import { ProcesoRoutingModule } from './proceso-routing.module';
import { CreateProcessComponent } from './create/create-process/create-process.component';

@NgModule({
  declarations: [ProcesoComponent, CreateProcessComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProcesoRoutingModule
  ]
})
export class ProcesoModule { }