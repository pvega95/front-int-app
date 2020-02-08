import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HojaEnvioComponent } from './hoja-envio.component';
import { AddComponent } from './add/add.component';


const routes: Routes = [
  { path: '', component: HojaEnvioComponent },
  { path: 'hoja-envio-nuevo', component: AddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HojaRoutingModule { }
