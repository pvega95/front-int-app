import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HojaEnvioComponent } from './hoja-envio.component';


const routes: Routes = [{ path: '', component: HojaEnvioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HojaRoutingModule { }
