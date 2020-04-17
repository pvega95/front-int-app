import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData, DatePipe } from '@angular/common';
import { ProcesoModalComponent } from 'src/app/features/proceso/proceso-modal/proceso-modal.component';
import { SharedModule } from '@shared/shared.module';

const MODULES = [
  CommonModule,
  SharedModule
];

const COMPONENTS = [
  ProcesoModalComponent
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS],
  providers: [ ],
  declarations: [...COMPONENTS],
  entryComponents: [ProcesoModalComponent]
})
export class ModalsModule {}
