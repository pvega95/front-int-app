import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/****** Shared Module ******/
import { SharedModule } from '@shared/shared.module';
import { ProcesoComponent } from './proceso.component';
import { ProcesoRoutingModule } from './proceso-routing.module';
import { CreateProcessComponent } from './create/create-process/create-process.component';
import { EditProcessComponent } from './create/edit-process/edit-process.component';
import { ProcesoModalComponent } from './proceso-modal/proceso-modal.component';
import { ModalsModule } from '@shared/modals/modals.module';
import { GaleryComponent } from './create/galery/galery.component';

@NgModule({
  declarations: [ProcesoComponent, CreateProcessComponent, EditProcessComponent, GaleryComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProcesoRoutingModule
  ],
  // entryComponents: [ProcesoModalComponent]
})
export class ProcesoModule { }